const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

const app = express();

// Security Headers & CORS Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Anti-XSS & Security Headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Brute-force protection: max 5 login attempts per 15 minutes
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: 'Too many login attempts. Please try again after 15 minutes.' }
});

// Database Connection & Permanent Super Admin Auto-Seeder
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/greenwood_school';

mongoose
    .connect(MONGO_URI)
    .then(async () => {
        console.log('✅ MongoDB connected successfully to database');
        await seedSuperAdmin();
    })
    .catch((err) => {
        console.warn('⚠️ MongoDB Connection Notice:', err.message);
        console.log('ℹ️ Operating with in-memory fallback active.');
    });

// Seed Fixed Permanent Super Admin Account if not present
async function seedSuperAdmin() {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@greenwood.edu.in';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const password = process.env.ADMIN_PASSWORD || 'Admin@Greenwood2026';
            const passwordHash = await bcrypt.hash(password, 10);

            await User.create({
                name: 'Permanent Super Admin',
                email: adminEmail,
                passwordHash: passwordHash,
                role: 'superadmin',
                isLocked: true // Fixed account protection flag
            });

            console.log(`🔒 Permanent Super Admin created & locked: ${adminEmail}`);
        } else {
            console.log(`🔒 Permanent Super Admin present in DB: ${adminEmail}`);
        }
    } catch (err) {
        console.error('Error seeding Super Admin:', err.message);
    }
}

// 1. POST /api/admin/login (Authenticates against Database)
app.post('/api/admin/login', loginLimiter, async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        // Query database for admin user
        let user = null;
        if (mongoose.connection.readyState === 1) {
            user = await User.findOne({ email: email.toLowerCase().trim() });
        }

        // Fallback check for initial setup
        if (!user && email.toLowerCase().trim() === (process.env.ADMIN_EMAIL || 'admin@greenwood.edu.in')) {
            const fallbackPassword = process.env.ADMIN_PASSWORD || 'Admin@Greenwood2026';
            if (password === fallbackPassword) {
                user = {
                    id: 'ADM-001',
                    name: 'Super Admin',
                    email: process.env.ADMIN_EMAIL || 'admin@greenwood.edu.in',
                    role: 'superadmin',
                    isLocked: true
                };
            }
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Validate password hash if loaded from DB
        if (user.passwordHash) {
            const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials.' });
            }
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id || user.id, email: user.email, role: user.role, name: user.name },
            process.env.JWT_SECRET || 'super_secret_greenwood_admin_key_2026',
            { expiresIn: '8h' }
        );

        // Set Secure HttpOnly Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 8 * 3600 * 1000
        });

        res.json({
            message: 'Login successful',
            token,
            user: { name: user.name, email: user.email, role: user.role, isLocked: user.isLocked }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server authentication error.' });
    }
});

// 2. JWT Verification Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader && authHeader.split(' ')[1];
    const cookieToken = req.cookies ? req.cookies.token : null;
    const token = cookieToken || bearerToken;

    if (!token) return res.status(401).json({ error: 'Access token required' });

    jwt.verify(token, process.env.JWT_SECRET || 'super_secret_greenwood_admin_key_2026', (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

// 3. GET /api/admin/me (Protected Profile Check)
app.get('/api/admin/me', authenticateToken, async (req, res) => {
    res.json({ user: req.user });
});

// 4. POST /api/admin/logout (Clears HttpOnly Cookie)
app.post('/api/admin/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});

// 5. Account Protection Middleware (Blocks modifying/deleting locked Super Admin)
app.delete('/api/admin/users/:id', authenticateToken, async (req, res) => {
    try {
        const userToDelete = await User.findById(req.params.id);
        if (userToDelete && userToDelete.isLocked) {
            return res.status(403).json({
                error: 'Permanent Super Admin account is locked and cannot be deleted.'
            });
        }
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running with MongoDB Mongoose & Admin Account Lock on http://localhost:${PORT}`));

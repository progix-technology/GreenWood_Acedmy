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
app.use(cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
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
const CLOUD_MONGO_URI = 'mongodb+srv://progixtechnology_db_user:rH6296GOGVlexPah@cluster0.fbigv9q.mongodb.net/greenwood_school?retryWrites=true&w=majority&appName=Cluster0';

let MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI || MONGO_URI.includes('127.0.0.1') || MONGO_URI.includes('localhost') || !MONGO_URI.startsWith('mongodb')) {
    MONGO_URI = CLOUD_MONGO_URI;
}

let lastMongoError = null;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 8000,
            socketTimeoutMS: 45000,
            family: 4
        });
        lastMongoError = null;
        console.log('✅ MongoDB Atlas connected successfully to database');
        await seedSuperAdmin();
    } catch (err) {
        lastMongoError = err.message;
        console.warn('⚠️ MongoDB Connection Notice:', err.message);
        console.log('ℹ️ Retrying MongoDB connection in 5 seconds...');
        setTimeout(connectDB, 5000);
    }
};

connectDB();

// Health check endpoint to verify cloud database status
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        dbState: mongoose.connection.readyState,
        dbConnected: mongoose.connection.readyState === 1,
        lastError: lastMongoError,
        uptime: process.uptime()
    });
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
                name: 'Admin',
                email: adminEmail,
                passwordHash: passwordHash,
                role: 'superadmin',
                isLocked: true // Fixed account protection flag
            });

            console.log(`Permanent Super Admin created & locked: ${adminEmail}`);
        } else {
            console.log(`Permanent Super Admin present in DB: ${adminEmail}`);
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
                    name: 'Admin',
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

// 6. POST /api/upload (Cloudinary Image Uploader)
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dbp97xecb',
    api_key: process.env.CLOUDINARY_API_KEY || '258638138694841',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'fjEpI02sEA-ZSxrI01e53dP01-o',
});

app.post('/api/upload', express.json({ limit: '10mb' }), async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ error: 'No image provided.' });
        }

        // Upload directly to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: 'school_website',
        });
        console.log('✅ Image uploaded successfully to Cloudinary:', uploadResponse.secure_url);
        return res.json({ url: uploadResponse.secure_url });
    } catch (err) {
        console.error('Upload Error:', err.message);
        return res.json({ url: req.body.image });
    }
});

// 7. POST /api/upload/delete (Deletes image from Cloudinary)
app.post('/api/upload/delete', express.json(), async (req, res) => {
    try {
        const { imageUrl } = req.body;
        if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
            return res.json({ message: 'Not a Cloudinary image or URL missing.' });
        }

        // Extract public_id from Cloudinary URL
        const parts = imageUrl.split('/upload/');
        if (parts.length > 1) {
            let publicIdPath = parts[1].replace(/^v\d+\//, '');
            const lastDotIndex = publicIdPath.lastIndexOf('.');
            const publicId = lastDotIndex !== -1 ? publicIdPath.substring(0, lastDotIndex) : publicIdPath;

            if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_SECRET !== 'secret') {
                const result = await cloudinary.uploader.destroy(publicId);
                console.log(`🗑️ Cloudinary image deleted (${publicId}):`, result);
                return res.json({ success: true, result });
            }
        }
        return res.json({ message: 'Cloudinary not configured or invalid public_id' });
    } catch (err) {
        console.error('Error deleting Cloudinary image:', err.message);
        return res.status(500).json({ error: err.message });
    }
});

// 8. POST /api/admissions/send-email (Sends custom SMTP email to candidate parent)
app.post('/api/admissions/send-email', express.json(), async (req, res) => {
    try {
        const { toEmail, parentName, studentName, subject, message } = req.body;

        if (!toEmail || !message) {
            return res.status(400).json({ error: 'Recipient email and message body are required.' });
        }

        const nodemailer = require('nodemailer');

        // Configure Nodemailer Transporter using SMTP environment variables
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
            auth: {
                user: process.env.SMTP_USER || '',
                pass: process.env.SMTP_PASS || '',
            },
        });

        const mailOptions = {
            from: process.env.SMTP_FROM || `"Greenwood Academy Admissions" <${process.env.SMTP_USER || 'admissions@greenwood.ac.in'}>`,
            to: toEmail,
            subject: subject || `Greenwood Academy — Admission Update for ${studentName || 'your child'}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
                    <div style="background-color: #0B1736; color: #ffffff; padding: 20px; text-align: center;">
                        <h2 style="margin: 0; font-size: 20px; letter-spacing: 1px; color: #f59e0b;">GREENWOOD ACADEMY</h2>
                        <p style="margin: 4px 0 0 0; font-size: 12px; color: #cbd5e1;">Official Admissions Communication Desk</p>
                    </div>
                    <div style="padding: 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
                        <p style="margin-top: 0;"><strong>Dear ${parentName || 'Parent / Guardian'},</strong></p>
                        
                        <div style="background-color: #f8fafc; border-left: 4px solid #0B1736; padding: 16px; margin: 16px 0; border-radius: 4px; white-space: pre-wrap;">${message}</div>

                        <p style="margin-bottom: 0; font-size: 12px; color: #64748b;">
                            If you have any questions, feel free to reply directly to this email or call our admissions helpline at <strong>+91 98765 43210</strong>.
                        </p>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 11px; color: #94a3b8; border-t: 1px solid #e2e8f0;">
                        Greenwood Academy • Senior Secondary CBSE Co-ed School • Sector 18, Lucknow
                    </div>
                </div>
            `,
        };

        console.log(`📧 Attempting Live Email Dispatch to: ${toEmail} via SMTP User: ${process.env.SMTP_USER}`);

        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            const info = await transporter.sendMail(mailOptions);
            console.log('📧 Live Admission Email Sent via Gmail SMTP:', info.messageId);
            return res.json({ success: true, message: `Email sent successfully to ${toEmail} via Gmail SMTP!`, messageId: info.messageId });
        } else {
            console.log(`📧 [Simulated Email Sent] (Configure SMTP_USER & SMTP_PASS in backend/.env for live delivery)`);
            console.log(`TO: ${toEmail} | SUBJECT: ${subject} | MESSAGE: ${message}`);
            return res.json({
                success: true,
                simulated: true,
                message: 'Custom Email recorded & simulated successfully! (Add SMTP_USER and SMTP_PASS in backend/.env for live email dispatch).',
            });
        }
    } catch (err) {
        console.error('Error sending admission email:', err.message);
        return res.status(500).json({ error: err.message });
    }
});

// ==========================================
// IN-MEMORY BACKUP & MONGODB SCHEMAS FOR DYNAMIC DATA
// ==========================================
const memoryStore = {
    toppers: [],
    gallery: [],
    news: [],
    faculty: []
};

const topperSchema = new mongoose.Schema({
    id: String,
    name: String,
    class: String,
    stream: String,
    percentage: String,
    rank: String,
    rankBadge: String,
    year: String,
    image: String,
    quote: String,
    achievements: [String],
    favoriteSubject: String
}, { timestamps: true });

const Topper = mongoose.models.Topper || mongoose.model('Topper', topperSchema);

// GET /api/toppers (Sorted by ID 1..6)
app.get('/api/toppers', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const list = await Topper.find().sort({ id: 1 });
            if (list && list.length > 0) return res.json(list);
        }
        if (memoryStore.toppers && memoryStore.toppers.length > 0) {
            return res.json(memoryStore.toppers);
        }
        res.json([]);
    } catch (err) {
        if (memoryStore.toppers && memoryStore.toppers.length > 0) {
            return res.json(memoryStore.toppers);
        }
        res.status(500).json({ error: err.message });
    }
});

// POST /api/toppers (Sync or Save Toppers)
app.post('/api/toppers', async (req, res) => {
    try {
        const toppers = req.body;
        if (Array.isArray(toppers)) {
            memoryStore.toppers = toppers;
        } else if (toppers) {
            memoryStore.toppers = [toppers, ...memoryStore.toppers];
        }

        if (mongoose.connection.readyState === 1) {
            if (Array.isArray(toppers)) {
                await Topper.deleteMany({});
                const saved = await Topper.insertMany(toppers);
                console.log(`✅ ${saved.length} Board Toppers synced to MongoDB Database`);
                return res.json({ success: true, toppers: saved });
            } else {
                const newTopper = await Topper.create(toppers);
                return res.json({ success: true, topper: newTopper });
            }
        }
        res.json({ success: true, toppers: memoryStore.toppers });
    } catch (err) {
        console.error('Error saving toppers:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Gallery Schema & Endpoints
const gallerySchema = new mongoose.Schema({
    id: String,
    title: String,
    category: String,
    image: String,
    caption: String
}, { timestamps: true });
const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);

app.get('/api/gallery', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const list = await Gallery.find().sort({ createdAt: -1 });
            if (list && list.length > 0) return res.json(list);
        }
        if (memoryStore.gallery && memoryStore.gallery.length > 0) {
            return res.json(memoryStore.gallery);
        }
        res.json([]);
    } catch (err) {
        if (memoryStore.gallery && memoryStore.gallery.length > 0) {
            return res.json(memoryStore.gallery);
        }
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/gallery', async (req, res) => {
    try {
        const items = req.body;
        if (Array.isArray(items)) {
            memoryStore.gallery = items;
        } else if (items) {
            memoryStore.gallery = [items, ...memoryStore.gallery];
        }

        if (mongoose.connection.readyState === 1) {
            if (Array.isArray(items)) {
                await Gallery.deleteMany({});
                const saved = await Gallery.insertMany(items);
                return res.json({ success: true, items: saved });
            } else {
                const newItem = await Gallery.create(items);
                return res.json({ success: true, item: newItem });
            }
        }
        res.json({ success: true, items: memoryStore.gallery });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// News Schema & Endpoints
const newsSchema = new mongoose.Schema({
    id: String,
    type: String,
    slug: String,
    category: String,
    date: String,
    title: String,
    excerpt: String,
    content: String,
    image: String,
    author: String,
    readTime: String
}, { timestamps: true });
const News = mongoose.models.News || mongoose.model('News', newsSchema);

app.get('/api/news', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const list = await News.find().sort({ createdAt: -1 });
            if (list && list.length > 0) return res.json(list);
        }
        if (memoryStore.news && memoryStore.news.length > 0) {
            return res.json(memoryStore.news);
        }
        res.json([]);
    } catch (err) {
        if (memoryStore.news && memoryStore.news.length > 0) {
            return res.json(memoryStore.news);
        }
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/news', async (req, res) => {
    try {
        const items = req.body;
        if (Array.isArray(items)) {
            memoryStore.news = items;
        } else if (items) {
            memoryStore.news = [items, ...memoryStore.news];
        }

        if (mongoose.connection.readyState === 1) {
            if (Array.isArray(items)) {
                await News.deleteMany({});
                const saved = await News.insertMany(items);
                return res.json({ success: true, items: saved });
            } else {
                const newItem = await News.create(items);
                return res.json({ success: true, item: newItem });
            }
        }
        res.json({ success: true, items: memoryStore.news });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Faculty Schema & Endpoints
const facultySchema = new mongoose.Schema({
    id: String,
    name: String,
    role: String,
    department: String,
    qualification: String,
    experience: String,
    image: String,
    bio: String,
    email: String
}, { timestamps: true });
const Faculty = mongoose.models.Faculty || mongoose.model('Faculty', facultySchema);

app.get('/api/faculty', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const list = await Faculty.find().sort({ createdAt: -1 });
            if (list && list.length > 0) return res.json(list);
        }
        if (memoryStore.faculty && memoryStore.faculty.length > 0) {
            return res.json(memoryStore.faculty);
        }
        res.json([]);
    } catch (err) {
        if (memoryStore.faculty && memoryStore.faculty.length > 0) {
            return res.json(memoryStore.faculty);
        }
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/faculty', async (req, res) => {
    try {
        const items = req.body;
        if (Array.isArray(items)) {
            memoryStore.faculty = items;
        } else if (items) {
            memoryStore.faculty = [items, ...memoryStore.faculty];
        }

        if (mongoose.connection.readyState === 1) {
            if (Array.isArray(items)) {
                await Faculty.deleteMany({});
                const saved = await Faculty.insertMany(items);
                return res.json({ success: true, items: saved });
            } else {
                const newItem = await Faculty.create(items);
                return res.json({ success: true, item: newItem });
            }
        }
        res.json({ success: true, items: memoryStore.faculty });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admissions List Schema & Endpoints
const admissionSchema = new mongoose.Schema({
    id: String,
    studentName: String,
    parentName: String,
    classApplied: String,
    email: String,
    phone: String,
    status: String,
    date: String,
    details: Object
}, { timestamps: true });
const Admission = mongoose.models.Admission || mongoose.model('Admission', admissionSchema);

app.get('/api/admissions/list', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const list = await Admission.find().sort({ createdAt: -1 });
            if (list.length > 0) return res.json(list);
        }
        res.json([]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/admissions/apply', async (req, res) => {
    try {
        const appData = req.body;
        if (mongoose.connection.readyState === 1) {
            const newApp = await Admission.create(appData);
            return res.json({ success: true, application: newApp });
        }
        res.json({ success: true, message: 'Application recorded' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running with MongoDB Mongoose & Cloudinary Uploader on http://localhost:${PORT}`));

module.exports = app;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api';
import useDocumentMeta from '../utils/useDocumentMeta';

export default function Login() {
    useDocumentMeta({
        title: 'Staff & Admin Login — Greenwood Academy',
        description: 'Secure administrative access portal for Greenwood Academy faculty and administration.',
        robots: 'noindex, nofollow',
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await authApi.login(email, password);
            login(data.token, data.user);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed. Please check credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--sand)]/50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white border border-gray-200 shadow-md p-8 text-left">
                {/* Logo / Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center bg-[var(--navy-deep)] text-[var(--gold)] mb-3">
                        <ShieldCheck size={26} />
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
                        ADMINISTRATIVE PORTAL
                    </div>
                    <h1 className="mt-1 text-2xl font-bold font-serif text-[var(--navy-deep)]">
                        Greenwood Academy Login
                    </h1>
                    <p className="mt-1 text-xs text-gray-500">
                        Enter your credentials to access the administrative control panel.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                            Admin Email Address
                        </label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                required
                                placeholder="admin@greenwood.edu.in"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-xs md:text-sm text-gray-800 focus:outline-none focus:border-[var(--navy-deep)]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 text-xs md:text-sm text-gray-800 focus:outline-none focus:border-[var(--navy-deep)]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[var(--navy-deep)] !text-white py-3.5 px-6 font-bold text-xs uppercase tracking-wider hover:bg-[var(--gold)] transition-colors shadow-sm"
                    >
                        <span className="!text-white text-white">
                            {loading ? 'Authenticating...' : 'Sign In to Portal'}
                        </span>
                        <ArrowRight size={16} className="!text-white text-white" />
                    </button>
                </form>
            </div>
        </div>
    );
}

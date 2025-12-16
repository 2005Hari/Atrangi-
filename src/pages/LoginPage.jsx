import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import { Loader } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const login = useStore((state) => state.login);
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await api.login({ email, password });
            login(data.user);
            localStorage.setItem('token', data.token);
            addToast(`Welcome back, ${data.user.name || 'User'}!`);
            const adminRoles = ['admin', 'creative_head', 'content_team', 'marketing_em'];
            if (adminRoles.includes(data.user.role)) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center pt-24 pb-20 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 md:p-12 shadow-xl rounded-sm w-full max-w-md"
            >
                <h1 className="text-3xl font-display text-charcoal mb-8 text-center">Welcome Back</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm uppercase tracking-widest text-gray-500 font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-cream/50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-deep-saffron transition-colors"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm uppercase tracking-widest text-gray-500 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-cream/50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-deep-saffron transition-colors"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-charcoal text-white py-3 rounded-sm hover:bg-deep-saffron transition-colors uppercase tracking-widest font-bold flex items-center justify-center"
                    >
                        {loading ? <Loader className="animate-spin" size={20} /> : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 w-full flex justify-center">
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                try {
                                    setLoading(true);
                                    const data = await api.googleLogin(credentialResponse.credential);
                                    login(data.user);
                                    localStorage.setItem('token', data.token);
                                    addToast(`Welcome back, ${data.user.name}!`);
                                    const adminRoles = ['admin', 'creative_head', 'content_team', 'marketing_em'];
                                    if (adminRoles.includes(data.user.role)) {
                                        navigate('/admin');
                                    } else {
                                        navigate('/');
                                    }
                                } catch (error) {
                                    console.error("Google Login failed", error);
                                    alert("Google Login failed. Please try again.");
                                } finally {
                                    setLoading(false);
                                }
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            useOneTap
                        />
                    </div>
                </div>

                <p className="mt-6 text-center text-gray-500 text-sm">
                    Don't have an account? <Link to="/signup" className="text-deep-saffron hover:underline">Sign Up</Link>
                </p>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
                    <p>Admin Demo: admin@atrangi.com / admin123</p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;

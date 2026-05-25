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
            addToast(`Access granted. Welcome, ${data.user.name}!`);
            
            if (data.user.role === 'ADMIN') {
                navigate('/admin');
            } else if (data.user.role === 'ARTIST') {
                navigate('/artist');
            } else {
                navigate('/');
            }
        } catch (error) {
            addToast(error.message || "Invalid credentials. Access Denied.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center pt-24 pb-20 px-6 relative">
            {/* Background Light Spill */}
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#C5A880]/5 rounded-full filter blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#090909] border border-white/5 p-8 md:p-12 shadow-2xl rounded-none w-full max-w-md relative z-10 space-y-8"
            >
                <div className="text-center space-y-2">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A880] font-medium">Bespoke Portal</span>
                    <h1 className="text-2xl font-display font-light tracking-widest text-[#FAF9F6] uppercase">Access Account</h1>
                    <div className="w-8 h-[1px] bg-[#C5A880]/30 mx-auto mt-3" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-[9px] uppercase tracking-[0.2em] text-gray-500 font-semibold">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#121212] border border-white/5 p-3 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 text-[#FAF9F6]"
                            required
                            autoComplete="email"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[9px] uppercase tracking-[0.2em] text-gray-500 font-semibold">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#121212] border border-white/5 p-3 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 text-[#FAF9F6]"
                            required
                            autoComplete="current-password"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#C5A880] text-[#0D0D0D] py-4 hover:bg-[#FAF9F6] transition-colors uppercase tracking-[0.25em] font-bold text-[10px] flex items-center justify-center"
                    >
                        {loading ? <Loader className="animate-spin" size={16} /> : 'Authenticate'}
                    </button>
                </form>

                <div className="space-y-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                            <span className="px-3 bg-[#090909] text-gray-500 font-light">Or Federated</span>
                        </div>
                    </div>

                    <div className="w-full flex justify-center py-2 bg-[#121212]/50 border border-white/5">
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                try {
                                    setLoading(true);
                                    const data = await api.googleLogin(credentialResponse.credential);
                                    login(data.user);
                                    localStorage.setItem('token', data.token);
                                    addToast(`Access granted. Welcome, ${data.user.name}!`);
                                    
                                    if (data.user.role === 'ADMIN') {
                                        navigate('/admin');
                                    } else if (data.user.role === 'ARTIST') {
                                        navigate('/artist');
                                    } else {
                                        navigate('/');
                                    }
                                } catch (error) {
                                    console.error("Google Login failed", error);
                                    addToast("Federated login failed. Please retry.");
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

                <p className="text-center text-gray-500 text-xs font-light tracking-wide">
                    New to the circle? <Link to="/signup" className="text-[#C5A880] hover:underline">Register Brief</Link>
                </p>

                <div className="pt-6 border-t border-white/5 text-center text-[9px] text-gray-600 tracking-[0.15em] leading-relaxed">
                    <p>SYSTEM KEYS (DEMO) <br />
                    Admin: admin@artnestia.com / admin123 <br />
                    Artist: aarav@artnestia.com / artist123</p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;

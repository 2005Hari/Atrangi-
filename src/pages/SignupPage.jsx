import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import { Loader } from 'lucide-react';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER'); // Defaults to USER
    const [loading, setLoading] = useState(false);
    const login = useStore((state) => state.login);
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await api.signup({ name, email, password, role });
            login(data.user);
            localStorage.setItem('token', data.token);
            addToast(`Account created successfully. Welcome to ArtNestia, ${data.user.name}!`);
            
            if (data.user.role === 'ARTIST') {
                navigate('/artist');
            } else {
                navigate('/account');
            }
        } catch (error) {
            addToast(error.message || "Registration failed. Please check credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center pt-24 pb-20 px-6 relative">
            <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#C5A880]/5 rounded-full filter blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#090909] border border-white/5 p-8 md:p-12 shadow-2xl rounded-none w-full max-w-md relative z-10 space-y-8"
            >
                <div className="text-center space-y-2">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A880] font-medium">Bespoke Portal</span>
                    <h1 className="text-2xl font-display font-light tracking-widest text-[#FAF9F6] uppercase">Register Access</h1>
                    <div className="w-8 h-[1px] bg-[#C5A880]/30 mx-auto mt-3" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Role Selector */}
                    <div className="space-y-2">
                        <label className="block text-[9px] uppercase tracking-[0.2em] text-gray-500 font-semibold mb-2">Select Account Role</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setRole('USER')}
                                className={`py-3 text-[10px] tracking-widest uppercase font-bold transition-all ${
                                    role === 'USER'
                                        ? 'bg-[#C5A880] text-[#0D0D0D]'
                                        : 'bg-[#121212] border border-white/5 text-gray-400'
                                }`}
                            >
                                Collector (User)
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('ARTIST')}
                                className={`py-3 text-[10px] tracking-widest uppercase font-bold transition-all ${
                                    role === 'ARTIST'
                                        ? 'bg-[#C5A880] text-[#0D0D0D]'
                                        : 'bg-[#121212] border border-white/5 text-gray-400'
                                }`}
                            >
                                Academy Artist
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[9px] uppercase tracking-[0.2em] text-gray-500 font-semibold">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#121212] border border-white/5 p-3 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 text-[#FAF9F6]"
                            required
                            autoComplete="name"
                            placeholder="John Doe"
                        />
                    </div>

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
                            autoComplete="new-password"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#C5A880] text-[#0D0D0D] py-4 hover:bg-[#FAF9F6] transition-colors uppercase tracking-[0.25em] font-bold text-[10px] flex items-center justify-center"
                    >
                        {loading ? <Loader className="animate-spin" size={16} /> : 'Register'}
                    </button>
                </form>

                <p className="text-center text-gray-500 text-xs font-light tracking-wide pt-4">
                    Already within the circle? <Link to="/login" className="text-[#C5A880] hover:underline">Sign In</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default SignupPage;

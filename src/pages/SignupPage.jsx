import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { api } from '../services/api';
import { Loader } from 'lucide-react';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const login = useStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await api.signup({ name, email, password });
            login(data.user);
            localStorage.setItem('token', data.token);
            navigate('/profile');
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
                <h1 className="text-3xl font-display text-charcoal mb-8 text-center">Create Account</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm uppercase tracking-widest text-gray-500 font-medium mb-2">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-cream/50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-deep-saffron transition-colors"
                            required
                            autoComplete="name"
                        />
                    </div>

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
                            autoComplete="new-password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-charcoal text-white py-3 rounded-sm hover:bg-deep-saffron transition-colors uppercase tracking-widest font-bold flex items-center justify-center"
                    >
                        {loading ? <Loader className="animate-spin" size={20} /> : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-500 text-sm">
                    Already have an account? <Link to="/login" className="text-deep-saffron hover:underline">Sign In</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default SignupPage;

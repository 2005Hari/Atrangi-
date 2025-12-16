import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    return (
        <section className="py-24 bg-cream relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-6">Join Our Community</h2>
                        <p className="text-gray-500 mb-10 text-lg">
                            Be the first to know about new collections, featured artists, and exclusive events.
                        </p>

                        <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    required
                                    className="w-full bg-white border border-gray-200 rounded-sm px-6 py-4 pr-16 focus:outline-none focus:border-gold transition-colors shadow-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading' || status === 'success'}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-charcoal text-white rounded-sm flex items-center justify-center hover:bg-gold transition-colors disabled:bg-gold"
                                >
                                    {status === 'loading' ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : status === 'success' ? (
                                        <Check size={20} />
                                    ) : (
                                        <ArrowRight size={20} />
                                    )}
                                </button>
                            </div>
                            {status === 'success' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute -bottom-8 left-0 right-0 text-green-600 text-sm font-medium"
                                >
                                    Thank you for subscribing!
                                </motion.p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 border border-gold/20 rounded-full" />
                <div className="absolute bottom-10 right-10 w-48 h-48 border border-charcoal/10 rounded-full" />
            </div>
        </section>
    );
};

export default Newsletter;

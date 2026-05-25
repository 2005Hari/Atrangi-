import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from 'lucide-react';

const ContactPage = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormState({ name: '', email: '', subject: '', message: '' });
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#FAF9F6] pt-36 pb-24 px-8">
            <div className="max-w-6xl mx-auto space-y-16">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-medium block">Inquiries</span>
                    <h1 className="text-4xl md:text-6xl font-display font-light text-[#FAF9F6]">Get In Touch</h1>
                    <div className="w-12 h-[1px] bg-[#C5A880]/30 mx-auto mt-4" />
                    <p className="text-gray-500 font-light text-xs tracking-wider leading-relaxed pt-2">
                        Whether commissioning a large-scale oil piece or requesting spatial framing guidelines, our curatorial team is ready to assist.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Visual Gallery Info & Specs */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <h2 className="text-2xl font-display font-light text-[#FAF9F6]">Private Salon</h2>
                            <div className="space-y-8">
                                <div className="flex items-start space-x-6">
                                    <div className="p-4 bg-[#151515] border border-white/5 text-[#C5A880]">
                                        <Mail size={16} strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xs uppercase tracking-widest font-semibold text-[#FAF9F6]">Email Inquiries</h3>
                                        <p className="text-[11px] text-gray-500 tracking-wider">inquiries@artnestia.com</p>
                                        <p className="text-[10px] text-gray-600 tracking-wider">Response within one business day</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6">
                                    <div className="p-4 bg-[#151515] border border-white/5 text-[#C5A880]">
                                        <Phone size={16} strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xs uppercase tracking-widest font-semibold text-[#FAF9F6]">Direct Concierge</h3>
                                        <p className="text-[11px] text-gray-500 tracking-wider">+91 98765 43210</p>
                                        <p className="text-[10px] text-gray-600 tracking-wider">Mon - Fri, 10:00 - 19:00 IST</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6">
                                    <div className="p-4 bg-[#151515] border border-white/5 text-[#C5A880]">
                                        <MapPin size={16} strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xs uppercase tracking-widest font-semibold text-[#FAF9F6]">Gallery HQ</h3>
                                        <p className="text-[11px] text-gray-500 tracking-wider">42, Kala Ghoda, Fort</p>
                                        <p className="text-[10px] text-gray-600 tracking-wider">Mumbai, Maharashtra 400001</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Asymmetric Map Artwork Visualizer */}
                        <div className="relative overflow-hidden aspect-[16/9] bg-[#121212] border border-white/5 group shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1748&auto=format&fit=crop"
                                alt="Gallery Studio Location"
                                className="w-full h-full object-cover opacity-80 grayscale group-hover:scale-105 transition-all duration-1000 select-none"
                            />
                        </div>
                    </motion.div>

                    {/* Luxury Inquiry Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="bg-[#090909] border border-white/5 p-8 md:p-12 shadow-2xl relative"
                    >
                        <h2 className="text-2xl font-display font-light text-[#FAF9F6] mb-8">Send Private Inquiry</h2>

                        {isSubmitted ? (
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-16 space-y-6"
                                >
                                    <CheckCircle size={48} className="text-[#C5A880] mx-auto animate-bounce" strokeWidth={1} />
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-display font-light">Inquiry Registered</h3>
                                        <p className="text-xs text-gray-500 tracking-widest max-w-sm mx-auto leading-relaxed">
                                            Thank you. A curatorial associate will contact you shortly with full documentation.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-[#C5A880] hover:text-[#FAF9F6] border-b border-[#C5A880]/30 hover:border-[#FAF9F6] pb-1 text-xs uppercase tracking-widest font-bold transition-all pt-4"
                                    >
                                        Submit Another Brief
                                    </button>
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-semibold block">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formState.name}
                                            onChange={handleChange}
                                            className="w-full bg-[#121212] border border-white/5 p-3 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 text-[#FAF9F6]"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-semibold block">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formState.email}
                                            onChange={handleChange}
                                            className="w-full bg-[#121212] border border-white/5 p-3 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 text-[#FAF9F6]"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-semibold block">Subject of Inquiry</label>
                                    <select
                                        name="subject"
                                        required
                                        value={formState.subject}
                                        onChange={handleChange}
                                        className="w-full bg-[#121212] border border-white/5 p-3 text-xs tracking-widest outline-none focus:border-[#C5A880]/50 text-[#FAF9F6]"
                                    >
                                        <option value="" disabled>Select inquiry focus</option>
                                        <option value="artwork-acquisition">Acquisition of Artworks</option>
                                        <option value="commission-detail">Custom Framing & Installation</option>
                                        <option value="partnership">Gallery Association & Partnerships</option>
                                        <option value="artist-network">Academy/Artist Registration</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-semibold block">Details of Inquiry</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows="4"
                                        value={formState.message}
                                        onChange={handleChange}
                                        className="w-full bg-[#121212] border border-white/5 p-4 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 text-[#FAF9F6] resize-none leading-relaxed"
                                        placeholder="How can we assist your curation goals?"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-[#C5A880] text-[#0D0D0D] font-bold text-[10px] tracking-[0.25em] uppercase hover:bg-[#FAF9F6] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? 'Registering...' : <>Send Brief <Send size={12} /></>}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;

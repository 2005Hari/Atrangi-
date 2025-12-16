import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

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
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormState({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-cream pt-24 pb-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-serif text-charcoal mb-4">Get in Touch</h1>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        We'd love to hear from you. Whether you have a question about a piece, interested in a partnership, or just want to say hello.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-12"
                    >
                        <div>
                            <h2 className="text-2xl font-serif text-charcoal mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-white shadow-sm rounded-full text-gold">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-charcoal">Email Us</h3>
                                        <p className="text-gray-500">atrangithefineartsclub@gmail.com</p>
                                        <p className="text-gray-500">We reply within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-white shadow-sm rounded-full text-gold">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-charcoal">Call Us</h3>
                                        <p className="text-gray-500">+91 98765 43210</p>
                                        <p className="text-gray-500">Mon-Fri, 10am - 7pm IST</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-white shadow-sm rounded-full text-gold">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-charcoal">Visit Our Gallery</h3>
                                        <p className="text-gray-500">42, Kala Ghoda, Fort</p>
                                        <p className="text-gray-500">Mumbai, Maharashtra 400001</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="h-64 bg-gray-200 rounded-sm overflow-hidden relative group">
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1748&auto=format&fit=crop"
                                alt="Map location"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                <div className="bg-white px-4 py-2 rounded-sm shadow-lg text-xs font-bold tracking-widest uppercase">
                                    View on Map
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white p-8 md:p-10 shadow-xl rounded-sm border border-gray-100"
                    >
                        <h2 className="text-2xl font-serif text-charcoal mb-8">Send a Message</h2>

                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle size={32} />
                                </div>
                                <h3 className="text-xl font-serif text-charcoal mb-2">Message Sent!</h3>
                                <p className="text-gray-500">Thank you for reaching out. We'll get back to you shortly.</p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-6 text-gold hover:underline text-sm font-medium"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-xs uppercase tracking-wider text-gray-500 font-medium">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formState.name}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-xs uppercase tracking-wider text-gray-500 font-medium">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formState.email}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-xs uppercase tracking-wider text-gray-500 font-medium">Subject</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formState.subject}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent"
                                    >
                                        <option value="" disabled>Select a subject</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Order Support">Order Support</option>
                                        <option value="Partnership">Partnership</option>
                                        <option value="Artist Application">Artist Application</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-xs uppercase tracking-wider text-gray-500 font-medium">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows="4"
                                        value={formState.message}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-charcoal text-white font-medium tracking-widest hover:bg-gold transition-colors duration-300 flex items-center justify-center shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                                >
                                    {isSubmitting ? (
                                        <span className="animate-pulse">SENDING...</span>
                                    ) : (
                                        <>
                                            SEND MESSAGE <Send size={16} className="ml-2" />
                                        </>
                                    )}
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

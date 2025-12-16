import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { Loader, CheckCircle } from 'lucide-react';

const CommissionPage = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        artistId: '',
        style: '',
        size: '',
        budget: '',
        description: ''
    });

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const data = await api.getArtists();
                setArtists(data);
            } catch (error) {
                console.error("Failed to fetch artists", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArtists();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.submitCommission(formData);
            setSuccess(true);
        } catch (error) {
            console.error("Failed to submit commission", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <Loader className="animate-spin text-deep-saffron" size={48} />
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center pt-24 pb-20">
                <div className="text-center max-w-lg px-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle className="text-green-600" size={40} />
                    </motion.div>
                    <h2 className="text-4xl font-display text-charcoal mb-4">Request Received!</h2>
                    <p className="text-gray-500 mb-8">
                        Thank you for commissioning a piece with Atrangi. The artist will review your request and we will get back to you within 48 hours with a quote and timeline.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="bg-charcoal text-white px-8 py-3 rounded-sm hover:bg-deep-saffron transition-colors uppercase tracking-widest text-sm font-medium"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream pt-24 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-display text-charcoal mb-6">Commission an Artist</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
                        Collaborate with our talented student artists to create a one-of-a-kind masterpiece tailored to your vision.
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="bg-white p-8 md:p-12 shadow-xl rounded-sm space-y-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm uppercase tracking-widest text-gray-500 font-medium">Preferred Artist</label>
                            <select
                                name="artistId"
                                value={formData.artistId}
                                onChange={handleChange}
                                className="w-full bg-cream/50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-deep-saffron transition-colors"
                            >
                                <option value="">Any Artist</option>
                                {artists.map(artist => (
                                    <option key={artist.id} value={artist.id}>{artist.name} ({artist.expertise})</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm uppercase tracking-widest text-gray-500 font-medium">Art Category</label>
                            <select
                                name="style"
                                value={formData.style}
                                onChange={handleChange}
                                className="w-full bg-cream/50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-deep-saffron transition-colors"
                                required
                            >
                                <option value="">Select a Category</option>
                                <option value="Oil Painting">Oil Painting</option>
                                <option value="Acrylic Painting">Acrylic Painting</option>
                                <option value="Watercolor">Watercolor</option>
                                <option value="Sketch / Charcoal">Sketch / Charcoal</option>
                                <option value="Digital Art">Digital Art</option>
                                <option value="Sculpture">Sculpture</option>
                                <option value="Mixed Media">Mixed Media</option>
                                <option value="Portrait">Portrait</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm uppercase tracking-widest text-gray-500 font-medium">Dimensions / Size</label>
                            <input
                                type="text"
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                placeholder="e.g. 24x36 inches"
                                className="w-full bg-cream/50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-deep-saffron transition-colors"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm uppercase tracking-widest text-gray-500 font-medium">Budget Range (₹)</label>
                            <input
                                type="text"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                placeholder="e.g. 5000 - 10000"
                                className="w-full bg-cream/50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-deep-saffron transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm uppercase tracking-widest text-gray-500 font-medium">Description of your vision</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="6"
                            placeholder="Describe the colors, mood, subject matter, and any specific elements you'd like to include..."
                            className="w-full bg-cream/50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-deep-saffron transition-colors"
                            required
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-charcoal text-white py-4 rounded-sm hover:bg-deep-saffron transition-colors uppercase tracking-widest font-bold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {submitting ? (
                                <>
                                    <Loader className="animate-spin" size={20} />
                                    <span>Submitting Request...</span>
                                </>
                            ) : (
                                <span>Submit Commission Request</span>
                            )}
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default CommissionPage;

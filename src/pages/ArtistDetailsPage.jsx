import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { motion } from 'framer-motion';
import { Loader, ArrowLeft, Palette, GraduationCap, Mail } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';

const ArtistDetailsPage = () => {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [artistProducts, setArtistProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            window.scrollTo(0, 0);
            try {
                const artistData = await api.getArtistById(id);
                setArtist(artistData);
                if (artistData) {
                    const products = await api.getProductsByArtist(artistData.name);
                    setArtistProducts(products);
                }
            } catch (error) {
                console.error("Failed to fetch artist details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <Loader className="animate-spin text-deep-saffron" size={48} />
            </div>
        );
    }

    if (!artist) {
        return (
            <div className="min-h-screen bg-cream flex flex-col items-center justify-center pt-24">
                <h2 className="text-2xl font-display text-charcoal mb-4">Artist Not Found</h2>
                <Link to="/artists" className="text-deep-saffron hover:underline">Back to Artists</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream pt-24 pb-20">
            <div className="container mx-auto px-6">
                <Link to="/artists" className="inline-flex items-center text-gray-500 hover:text-deep-saffron transition-colors mb-8">
                    <ArrowLeft size={16} className="mr-2" /> Back to Artists
                </Link>

                {/* Artist Profile Header */}
                <div className="bg-white rounded-sm shadow-xl overflow-hidden mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="md:col-span-1 h-96 md:h-auto relative">
                            <img
                                src={artist.image}
                                alt={artist.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                        </div>
                        <div className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-4xl md:text-5xl font-display text-charcoal mb-4">{artist.name}</h1>

                                <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <Palette size={18} className="text-deep-saffron" />
                                        <span className="uppercase tracking-wider font-medium">{artist.expertise}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <GraduationCap size={18} className="text-deep-saffron" />
                                        <span>{artist.university}</span>
                                    </div>
                                </div>

                                <p className="text-gray-500 leading-relaxed mb-8 text-lg font-light">
                                    {artist.bio}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        to="/commission"
                                        className="bg-charcoal text-white px-8 py-3 rounded-sm hover:bg-deep-saffron transition-colors text-center uppercase tracking-widest font-medium flex items-center justify-center space-x-2"
                                    >
                                        <Mail size={18} />
                                        <span>Commission Me</span>
                                    </Link>
                                    <Link
                                        to="/messages"
                                        className="border border-charcoal text-charcoal px-8 py-3 rounded-sm hover:bg-gray-50 transition-colors text-center uppercase tracking-widest font-medium"
                                    >
                                        Send Message
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Artist Portfolio */}
                <div className="mb-12">
                    <h2 className="text-3xl font-display text-charcoal mb-8 border-b border-gray-200 pb-4">Portfolio</h2>
                    {artistProducts.length > 0 ? (
                        <ProductGrid products={artistProducts} />
                    ) : (
                        <p className="text-gray-500 italic">No artworks currently available for sale.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArtistDetailsPage;

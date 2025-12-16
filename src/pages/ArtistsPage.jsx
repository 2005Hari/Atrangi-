import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { Loader } from 'lucide-react';

const ArtistsPage = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <Loader className="animate-spin text-gold" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream pt-24 pb-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-7xl font-display text-charcoal mb-6">Our Artists</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
                        Meet the visionary students behind the masterpieces. Each artist brings a unique perspective and expertise to the Atrangi collection.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {artists.map((artist, index) => (
                        <motion.div
                            key={artist.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <Link to={`/artists/${artist.id}`} className="block relative overflow-hidden aspect-[3/4] mb-6 shadow-xl rounded-sm cursor-pointer">
                                <img
                                    src={artist.image}
                                    alt={artist.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-white font-serif italic">{artist.university}</p>
                                    <p className="text-white/80 text-xs mt-2 uppercase tracking-widest">View Profile</p>
                                </div>
                            </Link>

                            <div className="text-center">
                                <h2 className="text-2xl font-display text-charcoal mb-2 group-hover:text-deep-saffron transition-colors">{artist.name}</h2>
                                <p className="text-deep-saffron font-serif font-medium mb-3 uppercase tracking-widest text-xs">{artist.expertise}</p>
                                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                                    {artist.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArtistsPage;

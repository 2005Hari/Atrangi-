import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const artists = [
    {
        id: 1,
        name: "Sarah Martinez",
        university: "Rhode Island School of Design",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
        specialty: "Resin Art",
    },
    {
        id: 2,
        name: "James Chen",
        university: "Parsons School of Design",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
        specialty: "Sculpture",
    },
    {
        id: 3,
        name: "Elena Rossi",
        university: "Royal College of Art",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        specialty: "Oil Painting",
    },
    {
        id: 4,
        name: "David Kim",
        university: "School of the Art Institute of Chicago",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
        specialty: "Digital Art",
    },
];

const ArtistShowcase = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">Meet Our Talented Artists</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Supporting the next generation of creative visionaries from top institutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {artists.map((artist, index) => (
                        <motion.div
                            key={artist.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group text-center"
                        >
                            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                                <img
                                    src={artist.image}
                                    alt={artist.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-serif text-charcoal mb-1 group-hover:text-gold transition-colors">
                                {artist.name}
                            </h3>
                            <p className="text-sm text-gold font-medium mb-1 uppercase tracking-wider">{artist.specialty}</p>
                            <p className="text-xs text-gray-400">{artist.university}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Link
                        to="/artists"
                        className="inline-block px-8 py-4 border border-charcoal text-charcoal font-medium tracking-widest hover:bg-charcoal hover:text-white transition-all duration-300"
                    >
                        VIEW ALL ARTISTS
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ArtistShowcase;

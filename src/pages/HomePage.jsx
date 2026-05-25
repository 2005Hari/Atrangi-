import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Shield, Award } from 'lucide-react';
import { api } from '../services/api';

const HomePage = () => {
    const [featuredWorks, setFeaturedWorks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const data = await api.getFeaturedProducts();
                setFeaturedWorks(data.slice(0, 3)); // Display top 3
            } catch (error) {
                console.error("Failed to load featured works:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    const revealVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div className="bg-[#0D0D0D] text-[#FAF9F6] overflow-hidden min-h-screen">
            {/* Cinematic Parallax Hero Header */}
            <section className="relative h-screen w-full flex items-center justify-center px-8">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#0D0D0D]/70 to-[#0D0D0D] z-10" />
                    <motion.img
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1.02 }}
                        transition={{ duration: 12, ease: 'easeOut' }}
                        src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop"
                        alt="Immersive Masterpiece"
                        className="w-full h-full object-cover select-none pointer-events-none opacity-60"
                    />
                </div>

                <div className="relative z-20 text-center max-w-5xl mx-auto space-y-8 px-4">
                    <motion.p
                        initial={{ opacity: 0, letterSpacing: '0.1em' }}
                        animate={{ opacity: 0.7, letterSpacing: '0.4em' }}
                        transition={{ duration: 1.8, ease: 'easeOut' }}
                        className="text-[10px] md:text-xs uppercase text-[#C5A880] tracking-[0.4em] font-medium"
                    >
                        Private Exhibition & Immersive Commerce
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-8xl lg:text-9xl font-display font-light text-[#FAF9F6] tracking-tight leading-none"
                    >
                        Redefine <br />
                        <span className="italic font-serif text-[#C5A880]">Your Sanctuary</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                        className="w-20 h-[1px] bg-[#C5A880]/40 mx-auto my-6"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.8, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.6 }}
                        className="text-xs md:text-sm text-gray-400 font-light tracking-[0.15em] max-w-xl mx-auto leading-relaxed"
                    >
                        Explore highly exclusive, meticulously curated masterpieces, commissioned from the world’s elite emerging student artists.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 1 }}
                        className="pt-6"
                    >
                        <Link
                            to="/gallery"
                            className="inline-flex items-center px-12 py-4 bg-[#C5A880] text-[#0D0D0D] text-[10px] uppercase font-bold tracking-[0.25em] hover:bg-[#FAF9F6] hover:-translate-y-0.5 shadow-2xl transition-all duration-500 rounded-none"
                        >
                            Enter Gallery <ArrowRight size={14} className="ml-3" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Curated Editorial Introduction Block */}
            <section className="py-32 px-8 border-t border-white/5 bg-[#090909]">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={revealVariants}
                        className="space-y-6"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">The Philosophy</span>
                        <h2 className="text-4xl md:text-5xl font-display font-light text-[#FAF9F6] leading-[1.15]">
                            Where <span className="italic font-serif text-[#C5A880]">Emergent Genius</span> Meets Architectural Space.
                        </h2>
                        <p className="text-gray-500 font-light text-xs tracking-widest leading-relaxed">
                            ArtNestia handpicks the finest talent across global academy networks to bring museum-grade original art direct to your private collections. Every canvas represents a narrative of bold experimentalism.
                        </p>
                        <div className="pt-4">
                            <Link to="/about" className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] border-b border-[#C5A880]/30 pb-1 hover:text-[#FAF9F6] hover:border-[#FAF9F6] transition-all">
                                Discover Our Origin Story
                            </Link>
                        </div>
                    </motion.div>

                    <div className="relative overflow-hidden aspect-[4/3] bg-[#121212] border border-white/5">
                        <img 
                            src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2070&auto=format&fit=crop" 
                            alt="Luxury Workspace Exhibit" 
                            className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-1000 grayscale select-none"
                        />
                    </div>
                </div>
            </section>

            {/* Curated Masterpieces Slider Section */}
            <section className="py-36 px-8 bg-[#0D0D0D]">
                <div className="max-w-7xl mx-auto space-y-24">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={revealVariants}
                        className="text-center space-y-4"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">Private Selection</span>
                        <h2 className="text-3xl md:text-6xl font-display font-light text-[#FAF9F6]">
                            Featured <span className="italic font-serif text-[#C5A880]">Showcase</span>
                        </h2>
                        <div className="w-16 h-[1px] bg-[#C5A880]/40 mx-auto mt-6" />
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-2 border-t-transparent border-[#C5A880] rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            {featuredWorks.map((work, index) => (
                                <motion.div
                                    key={work.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className="group space-y-6"
                                >
                                    <div className="aspect-[3/4] w-full overflow-hidden bg-[#151515] border border-white/5 shadow-2xl relative">
                                        <Link to={`/artwork/${work.id}`}>
                                            <img
                                                src={work.image}
                                                alt={work.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:opacity-90 select-none grayscale group-hover:grayscale-0"
                                            />
                                        </Link>
                                    </div>
                                    <div className="text-left space-y-2">
                                        <h3 className="text-lg font-display text-[#FAF9F6] tracking-[0.1em] group-hover:text-[#C5A880] transition-colors">
                                            {work.title}
                                        </h3>
                                        <p className="text-[10px] text-gray-500 font-serif italic tracking-wider">
                                            by {work.artist} — {work.university}
                                        </p>
                                        <p className="text-sm font-light text-[#C5A880] tracking-[0.15em] pt-1">
                                            ₹{work.price.toLocaleString()}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Services & Value Proposition */}
            <section className="py-28 px-8 bg-[#090909] border-t border-b border-white/5">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                    <div className="space-y-4 flex flex-col items-center">
                        <Compass size={28} className="text-[#C5A880] mb-2" strokeWidth={1} />
                        <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FAF9F6]">Virtual Spatial Simulation</h3>
                        <p className="text-[11px] text-gray-500 tracking-wider font-light leading-relaxed max-w-xs">
                            Verify wall layout scales instantly inside your environment via our bespoke AR visualizers.
                        </p>
                    </div>
                    <div className="space-y-4 flex flex-col items-center">
                        <Shield size={28} className="text-[#C5A880] mb-2" strokeWidth={1} />
                        <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FAF9F6]">Insured Global Transit</h3>
                        <p className="text-[11px] text-gray-500 tracking-wider font-light leading-relaxed max-w-xs">
                            Original master canvases custom packed and fully insured with secure dynamic transport.
                        </p>
                    </div>
                    <div className="space-y-4 flex flex-col items-center">
                        <Award size={28} className="text-[#C5A880] mb-2" strokeWidth={1} />
                        <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FAF9F6]">Provenance & Authentication</h3>
                        <p className="text-[11px] text-gray-500 tracking-wider font-light leading-relaxed max-w-xs">
                            All works include a signed hand-sealed Certificate of Provenance confirming origin and author.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;

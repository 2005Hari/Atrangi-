import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe } from 'lucide-react';

const AboutPage = () => {
    const stats = [
        { label: "Elite Artisans", value: "300+", icon: Users },
        { label: "Academies", value: "18", icon: Globe },
        { label: "Gilt Awards", value: "8", icon: Award },
    ];

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#FAF9F6] pt-36 pb-24 px-8 overflow-hidden">
            {/* Hero Section */}
            <section className="container mx-auto max-w-5xl mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center space-y-6"
                >
                    <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-medium block">Our Heritage</span>
                    <h1 className="text-4xl md:text-7xl font-display font-light text-[#FAF9F6] leading-[1.1]">
                        Bespoke <span className="text-[#C5A880] italic font-serif">Aesthetics</span> & Provenance
                    </h1>
                    <div className="w-12 h-[1px] bg-[#C5A880]/30 mx-auto my-6" />
                    <p className="text-xs md:text-sm text-gray-400 font-light tracking-[0.15em] leading-relaxed max-w-3xl mx-auto">
                        ArtNestia is an exclusive digital salon bridging the gap between museum-grade academy painters and distinguished private collectors. We believe true luxury lies in the creative impulse behind the original canvas.
                    </p>
                </motion.div>
            </section>

            {/* Immersive Image & Story Grid */}
            <section className="container mx-auto max-w-6xl mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="relative overflow-hidden aspect-[4/5] bg-[#121212] border border-white/5 shadow-2xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1459908676235-d5f02a50184b?q=80&w=2070&auto=format&fit=crop"
                            alt="The Craftsmanship"
                            className="w-full h-full object-cover opacity-80 grayscale select-none"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="space-y-8"
                    >
                        <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880]">The Vision</span>
                        <h2 className="text-3xl md:text-4xl font-display font-light text-[#FAF9F6]">Museum Quality. Zero Compromise.</h2>
                        <p className="text-gray-500 font-light text-xs tracking-widest leading-relaxed">
                            Every item cataloged on our site is custom-approved through direct studio networks. We strip away commercial galleries’ noise to bring collectors authentic masterpieces carrying full certificates of origin.
                        </p>
                        <p className="text-gray-500 font-light text-xs tracking-widest leading-relaxed">
                            By commissioning or acquiring via ArtNestia, you are directly funding graduate arts research and preserving the high tradition of fine oil canvas work.
                        </p>

                        <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5 text-center">
                            {stats.map((stat, index) => (
                                <div key={index} className="space-y-2">
                                    <stat.icon size={20} className="mx-auto text-[#C5A880] mb-2" strokeWidth={1} />
                                    <div className="text-xl font-display text-[#FAF9F6] font-bold">{stat.value}</div>
                                    <div className="text-[9px] text-gray-500 uppercase tracking-widest leading-none">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Core Gallery Pillars */}
            <section className="bg-[#090909] border-t border-b border-white/5 py-24 -mx-8 px-8">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880]">Our Code</span>
                        <h2 className="text-2xl md:text-3xl font-display font-light text-[#FAF9F6]">Three Pillars</h2>
                        <div className="w-12 h-[1px] bg-[#C5A880]/30 mx-auto mt-4" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "Provenance Verified", desc: "Every original item carries hand-sealed security tags and academic certification." },
                            { title: "Aesthetic Excellence", desc: "Rigorous hand-curation ensuring museum-grade composition and canvas mastery." },
                            { title: "Bespoke Packaging", desc: "Premium custom wooden crate packaging with temperature-regulated dispatch." }
                        ].map((pillar, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15, duration: 0.8 }}
                                className="text-center p-8 border border-white/5 bg-[#0D0D0D]/40 space-y-4"
                            >
                                <h3 className="text-sm font-display uppercase tracking-widest text-[#C5A880]">{pillar.title}</h3>
                                <p className="text-gray-500 font-light text-xs tracking-widest leading-relaxed">{pillar.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;

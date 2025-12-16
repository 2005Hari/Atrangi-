import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const stats = [
    { label: "Artworks", value: "500+" },
    { label: "Artists", value: "100+" },
    { label: "Happy Customers", value: "1000+" },
];

const AboutSection = () => {
    return (
        <section className="py-24 bg-cream overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-6">
                            Empowering the Next Generation of Artists
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Artisan Collective is more than just a marketplace; it's a movement. We bridge the gap between talented student artists and art lovers who appreciate unique, handcrafted pieces.
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Every purchase directly supports a student's education and artistic journey, allowing them to continue creating and innovating. Discover art that tells a story and makes a difference.
                        </p>

                        <div className="grid grid-cols-3 gap-8 mb-10">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center md:text-left">
                                    <p className="text-3xl font-serif text-gold font-bold mb-1">{stat.value}</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/about"
                            className="inline-block px-8 py-4 bg-charcoal text-white font-medium tracking-widest hover:bg-gold transition-colors duration-300"
                        >
                            OUR STORY
                        </Link>
                    </motion.div>

                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2 relative"
                    >
                        <div className="relative z-10">
                            <img
                                src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2080&auto=format&fit=crop"
                                alt="Artist working"
                                className="w-full h-auto rounded-sm shadow-2xl"
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-0" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-charcoal/5 rounded-full blur-3xl -z-0" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;

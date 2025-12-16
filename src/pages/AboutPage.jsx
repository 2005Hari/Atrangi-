import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe, ArrowRight } from 'lucide-react';

const AboutPage = () => {
    const stats = [
        { label: "Artisans", value: "500+", icon: Users },
        { label: "Countries", value: "25", icon: Globe },
        { label: "Awards", value: "12", icon: Award },
    ];

    return (
        <div className="min-h-screen bg-cream pt-24 pb-20">
            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-6">
                        Crafting the <span className="text-gold italic">Future</span> of Art
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        Artisan Collective is more than a marketplace; it's a movement. We bridge the gap between exceptional student artisans and connoisseurs of fine craftsmanship, curating a collection that defines the next generation of luxury.
                    </p>
                </motion.div>
            </section>

            {/* Image & Story Section */}
            <section className="container mx-auto px-6 mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] overflow-hidden rounded-sm">
                            <img
                                src="https://images.unsplash.com/photo-1459908676235-d5f02a50184b?q=80&w=2070&auto=format&fit=crop"
                                alt="Artisan working"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gold/10 backdrop-blur-md -z-10 rounded-full" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif text-charcoal">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We believe that true luxury lies in the story behind the object. Every piece in our collection is hand-selected from top art institutes across India, representing hours of dedication, skill, and creative vision.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            By supporting Artisan Collective, you are not just acquiring a beautiful object; you are investing in the career of a promising young artist and preserving the tradition of fine craftsmanship.
                        </p>

                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <stat.icon size={24} className="mx-auto text-gold mb-2" />
                                    <div className="text-2xl font-serif text-charcoal font-bold">{stat.value}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-4">Core Values</h2>
                        <div className="w-24 h-1 bg-gold mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "Authenticity", desc: "Every piece is verified original and handmade by the artist." },
                            { title: "Excellence", desc: "We curate only the highest quality works that demonstrate exceptional skill." },
                            { title: "Sustainability", desc: "Promoting ethical practices and sustainable materials in art creation." }
                        ].map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2, duration: 0.6 }}
                                className="text-center p-8 border border-gray-100 hover:border-gold/30 transition-colors duration-300 rounded-sm"
                            >
                                <h3 className="text-xl font-serif text-charcoal mb-4">{value.title}</h3>
                                <p className="text-gray-600">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;

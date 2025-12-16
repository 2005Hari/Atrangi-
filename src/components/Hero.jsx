import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-end pb-20 md:pb-32 px-6 md:px-12">
            {/* Background with Parallax Effect */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                    src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop"
                    alt="Artistic Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content - Asymmetrical Bottom Left */}
            <div className="relative z-20 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="border-l-4 border-deep-saffron pl-6 md:pl-10 mb-8"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-display text-cream leading-none tracking-tighter mb-4">
                        ATRANGI
                    </h1>
                    <p className="text-2xl md:text-4xl font-serif italic text-gold">
                        The Fine Arts Club
                    </p>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl font-light tracking-wide leading-relaxed"
                >
                    Where creativity meets chaos. Discover unique masterpieces crafted by the next generation of artistic visionaries.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6"
                >
                    <Link
                        to="/collections"
                        className="px-10 py-4 bg-deep-saffron text-white font-display font-bold tracking-widest hover:bg-white hover:text-charcoal transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                    >
                        EXPLORE COLLECTION
                    </Link>
                    <Link
                        to="/about"
                        className="px-10 py-4 border border-white/30 backdrop-blur-sm text-white font-display font-bold tracking-widest hover:bg-white hover:text-charcoal transition-all duration-300 transform hover:-translate-y-1 flex items-center"
                    >
                        OUR STORY <ChevronRight size={16} className="ml-2" />
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator - Moved to right */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, delay: 1.5, repeat: Infinity }}
                className="absolute bottom-10 right-10 z-20 text-white/50 cursor-pointer hidden md:block"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <div className="flex flex-col items-center gap-4">
                    <span className="writing-vertical text-xs tracking-widest uppercase">Scroll</span>
                    <ArrowDown size={24} strokeWidth={1} />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;

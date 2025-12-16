import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Emily Thompson",
        role: "Interior Designer",
        text: "The quality of the art pieces I purchased for my client's home is outstanding. The fact that I'm supporting emerging talent makes it even more special.",
        rating: 5,
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Art Collector",
        text: "Artisan Collective has an eye for talent. I've discovered some truly remarkable artists here before they became big names. A seamless buying experience.",
        rating: 5,
    },
    {
        id: 3,
        name: "Sophia Rodriguez",
        role: "Homeowner",
        text: "I was looking for something unique for my living room and found the perfect resin piece. It arrived beautifully packaged and looks even better in person.",
        rating: 5,
    },
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 bg-charcoal text-cream relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Client Stories</h2>
                    <div className="w-24 h-1 bg-gold mx-auto" />
                </div>

                <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <Quote size={48} className="text-gold/30 mx-auto mb-8" />

                            <p className="text-xl md:text-2xl font-light italic mb-8 leading-relaxed">
                                "{testimonials[currentIndex].text}"
                            </p>

                            <div className="flex justify-center space-x-1 mb-6">
                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                    <Star key={i} size={20} className="text-gold fill-current" />
                                ))}
                            </div>

                            <div>
                                <h4 className="text-lg font-serif text-white">{testimonials[currentIndex].name}</h4>
                                <p className="text-sm text-gray-400">{testimonials[currentIndex].role}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-center space-x-3 mt-12">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-gold w-8' : 'bg-white/20 hover:bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-[100px]" />
            </div>
        </section>
    );
};

export default Testimonials;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import { useStore } from '../store/useStore';

import { api } from '../services/api';
import { Link } from 'react-router-dom';

const FeaturedSection = () => {
    const { addToCart } = useStore();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const data = await api.getFeaturedProducts();
                setFeaturedProducts(data);
            } catch (error) {
                console.error("Failed to fetch featured products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    if (loading) return null;

    return (
        <section className="py-24 bg-cream relative overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-soft-grey/20 -skew-x-12 transform translate-x-20 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-20 flex flex-col md:flex-row items-end justify-between border-b border-charcoal/10 pb-8"
                >
                    <div className="max-w-xl">
                        <h2 className="text-5xl md:text-7xl font-display text-charcoal mb-4 leading-none">
                            Featured <span className="text-deep-saffron italic font-serif">Works</span>
                        </h2>
                        <p className="text-gray-500 font-light tracking-wide text-lg">
                            Hand-picked selections from our most promising student artists.
                        </p>
                    </div>
                    <Link to="/collections" className="hidden md:flex items-center text-charcoal font-medium hover:text-deep-saffron transition-colors tracking-widest uppercase text-sm">
                        View All Collections <Eye size={16} className="ml-2" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className={`group relative ${index === 1 ? 'md:translate-y-16' : ''}`}
                        >
                            <div className="relative overflow-hidden aspect-[3/4] mb-6 shadow-xl">
                                <Link to={`/product/${product.id}`}>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />
                                </Link>
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-4">
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="px-8 py-3 bg-white text-charcoal font-display font-bold tracking-widest hover:bg-deep-saffron hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 flex items-center"
                                    >
                                        <ShoppingBag size={18} className="mr-2" /> ADD TO CART
                                    </button>
                                </div>
                            </div>

                            <div className="text-left">
                                <h3 className="text-2xl font-display text-charcoal mb-1 group-hover:text-deep-saffron transition-colors">{product.title}</h3>
                                <p className="text-sm text-gray-500 mb-2 font-serif italic">by {product.artist}</p>
                                <p className="text-xl font-medium text-charcoal">₹{product.price.toLocaleString()}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center md:hidden">
                    <Link to="/collections" className="inline-flex items-center text-charcoal font-medium hover:text-deep-saffron transition-colors tracking-widest uppercase text-sm border-b border-charcoal pb-1">
                        View All Collections <Eye size={16} className="ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;

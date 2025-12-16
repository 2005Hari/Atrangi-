import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const SearchOverlay = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [products, setProducts] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await api.getProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.artist.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
    }, [query, products]);

    const handleClose = () => {
        setQuery('');
        setResults([]);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex flex-col"
                >
                    <div className="container mx-auto px-6 pt-8">
                        <div className="flex justify-end mb-8">
                            <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
                                <X size={32} />
                            </button>
                        </div>

                        <div className="relative max-w-3xl mx-auto w-full mb-16">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search for art, artists, or collections..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-gray-700 text-3xl md:text-5xl font-display text-cream placeholder-gray-600 focus:outline-none focus:border-deep-saffron py-4 transition-colors"
                            />
                            <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600" size={32} />
                        </div>

                        <div className="max-w-5xl mx-auto w-full overflow-y-auto max-h-[60vh] custom-scrollbar">
                            {results.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {results.map(product => (
                                        <Link
                                            key={product.id}
                                            to={`/product/${product.id}`}
                                            onClick={handleClose}
                                            className="flex items-center space-x-6 group p-4 rounded-lg hover:bg-white/5 transition-colors"
                                        >
                                            <div className="w-24 h-24 overflow-hidden rounded-sm flex-shrink-0">
                                                <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-display text-cream group-hover:text-deep-saffron transition-colors">{product.title}</h3>
                                                <p className="text-gray-400 font-serif italic text-sm mb-1">{product.artist}</p>
                                                <p className="text-deep-saffron font-medium">₹{product.price.toLocaleString()}</p>
                                            </div>
                                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                                                <ArrowRight className="text-deep-saffron" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : query.trim() !== '' ? (
                                <div className="text-center text-gray-500 mt-12">
                                    <p className="text-xl">No results found for "{query}"</p>
                                </div>
                            ) : (
                                <div className="text-center text-gray-600 mt-12">
                                    <p className="text-sm uppercase tracking-widest mb-4">Popular Searches</p>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        {['Abstract', 'Oil Painting', 'Digital', 'Sculpture', 'Aarav Patel'].map(term => (
                                            <button
                                                key={term}
                                                onClick={() => setQuery(term)}
                                                className="px-4 py-2 border border-gray-700 rounded-full hover:border-deep-saffron hover:text-deep-saffron transition-colors text-sm"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchOverlay;

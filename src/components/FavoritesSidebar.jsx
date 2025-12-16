import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';

const FavoritesSidebar = ({ isOpen, onClose }) => {
    const { favorites, toggleFavorite, addToCart } = useStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-[100] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-2xl font-serif text-charcoal">Your Favorites ({favorites.length})</h2>
                            <button onClick={onClose} className="hover:text-gold transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {favorites.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <Heart size={48} className="text-gray-300" />
                                    <p className="text-gray-500">No favorites yet.</p>
                                    <button onClick={onClose} className="text-gold hover:underline">
                                        Explore Collections
                                    </button>
                                </div>
                            ) : (
                                favorites.map((item) => (
                                    <div key={item.id} className="flex space-x-4">
                                        <div className="w-24 h-32 flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-serif text-lg text-charcoal">{item.title}</h3>
                                                <p className="text-sm text-gray-500">by {item.artist}</p>
                                                <p className="font-medium text-gold mt-1">₹{item.price.toLocaleString()}</p>
                                            </div>
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="flex-1 py-2 bg-charcoal text-white text-xs uppercase tracking-wider hover:bg-gold transition-colors flex items-center justify-center"
                                                >
                                                    <ShoppingBag size={14} className="mr-2" /> Add to Cart
                                                </button>
                                                <button
                                                    onClick={() => toggleFavorite(item)}
                                                    className="p-2 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default FavoritesSidebar;

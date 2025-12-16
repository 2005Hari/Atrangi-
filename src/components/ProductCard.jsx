import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const ProductCard = React.forwardRef(({ product }, ref) => {
    const { addToCart, toggleFavorite, favorites } = useStore();
    const isFavorite = favorites.some((item) => item.id === product.id);

    return (
        <motion.div
            ref={ref}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="group relative bg-white rounded-sm overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <Link to={`/product/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                {/* Favorite Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(product);
                    }}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
                >
                    <Heart
                        size={18}
                        className={clsx(
                            "transition-colors duration-300",
                            isFavorite ? "fill-red-500 text-red-500" : "text-charcoal hover:text-red-500"
                        )}
                    />
                </button>

                {/* Sold Out Overlay */}
                {!product.inStock && (
                    <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center">
                        <span className="bg-charcoal text-white px-4 py-2 font-bold tracking-widest text-sm uppercase">Sold Out</span>
                    </div>
                )}

                {/* Overlay Actions */}
                <div className={`absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-8 ${!product.inStock ? 'pointer-events-none' : ''}`}>
                    <div className="flex space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {product.inStock && (
                            <button
                                onClick={() => addToCart(product)}
                                className="px-4 py-3 bg-white text-charcoal font-medium text-sm tracking-wider hover:bg-gold hover:text-white transition-colors flex items-center shadow-lg"
                            >
                                <ShoppingBag size={16} className="mr-2" /> ADD
                            </button>
                        )}
                        <Link to={`/product/${product.id}`} className="px-4 py-3 bg-charcoal text-white font-medium text-sm tracking-wider hover:bg-gold transition-colors flex items-center shadow-lg pointer-events-auto">
                            <Eye size={16} className="mr-2" /> VIEW
                        </Link>
                    </div>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4 text-center">
                <h3 className="text-lg font-serif text-charcoal mb-1 truncate">{product.title}</h3>
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">by {product.artist}</p>
                <p className="text-md font-medium text-gold">₹{product.price.toLocaleString()}</p>
            </div>
        </motion.div>
    );
});

export default ProductCard;

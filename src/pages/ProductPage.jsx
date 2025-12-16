import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useStore } from '../store/useStore';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, ArrowLeft, Minus, Plus, Loader, Eye } from 'lucide-react';
import clsx from 'clsx';
import ProductGrid from '../components/ProductGrid';
import ReviewSection from '../components/ReviewSection';
import ARView from '../components/ARView';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToast } = useToast();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart, toggleFavorite, favorites } = useStore();
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [showAR, setShowAR] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            window.scrollTo(0, 0);
            try {
                const data = await api.getProductById(id);
                setProduct(data);
                if (data) {
                    const related = await api.getRelatedProducts(id, data.category);
                    setRelatedProducts(related);
                }
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 flex justify-center">
                <Loader className="animate-spin text-gold" size={40} />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen pt-32 text-center">
                <h2 className="text-2xl font-serif">Product not found</h2>
                <Link to="/collections" className="text-gold hover:underline mt-4 inline-block">
                    Back to Collections
                </Link>
            </div>
        );
    }

    const isFavorite = favorites.some((item) => item.id === product.id);

    return (
        <div className="min-h-screen pt-24 pb-20 bg-cream">
            {showAR && <ARView productImage={product.image} onClose={() => setShowAR(false)} />}

            <div className="container mx-auto px-6">
                {/* Breadcrumb / Back */}
                <Link to="/collections" className="inline-flex items-center text-gray-500 hover:text-gold transition-colors mb-8">
                    <ArrowLeft size={16} className="mr-2" /> Back to Collections
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="aspect-[4/5] overflow-hidden rounded-sm shadow-lg relative group"
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => setShowAR(true)}
                                className="absolute bottom-4 right-4 bg-white/90 text-charcoal px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 hover:bg-deep-saffron hover:text-white transition-all transform hover:scale-105"
                            >
                                <Eye size={16} />
                                <span className="text-sm font-bold">View in Room</span>
                            </button>
                        </motion.div>
                        {/* Single Main Image Display - Thumbnails removed as we only have one image per product in DB */}
                    </div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-2">{product.title}</h1>
                        <div className="flex items-center space-x-2 mb-6">
                            <span className="text-gray-500">by</span>
                            <Link to="/artists" className="text-charcoal font-medium hover:text-gold transition-colors border-b border-gold/30">
                                {product.artist}
                            </Link>
                        </div>

                        <p className="text-2xl font-medium text-gold mb-8">₹{product.price.toLocaleString()}</p>

                        <div className="prose prose-sm text-gray-600 mb-8">
                            <p>{product.description}</p>
                        </div>

                        <div className="space-y-4 mb-8 border-t border-b border-gray-200 py-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Dimensions</span>
                                <span className="text-charcoal font-medium">{product.dimensions}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Materials</span>
                                <span className="text-charcoal font-medium">{product.materials}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">University</span>
                                <span className="text-charcoal font-medium">{product.university}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border border-gray-300 rounded-sm">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 hover:bg-gray-100 transition-colors"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="px-4 font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-3 hover:bg-gray-100 transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => {
                                        addToCart(product, quantity);
                                        addToast(`Added ${product.title} to cart`);
                                    }}
                                    disabled={!product.inStock}
                                    className={`flex-1 py-3 text-white font-medium tracking-widest transition-colors duration-300 flex items-center justify-center shadow-lg ${product.inStock
                                        ? "bg-charcoal hover:bg-gold"
                                        : "bg-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    {product.inStock ? (
                                        <>
                                            <ShoppingBag size={18} className="mr-2" /> ADD TO CART
                                        </>
                                    ) : (
                                        <span>SOLD OUT</span>
                                    )}
                                </button>
                                <div className="relative group">
                                    <button
                                        className={clsx(
                                            "p-3 border border-gray-300 rounded-sm transition-colors",
                                            isFavorite ? "text-red-500 border-red-500 bg-red-50" : "text-gray-400 hover:text-charcoal hover:border-charcoal"
                                        )}
                                    >
                                        <Heart size={20} className={isFavorite ? "fill-current" : ""} />
                                    </button>
                                    {/* Collections Dropdown */}
                                    <div className="absolute right-0 bottom-full mb-2 w-48 bg-white shadow-xl rounded-sm border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                                        <div className="p-2 border-b border-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Save to Collection
                                        </div>
                                        {useStore.getState().collections.map(c => (
                                            <button
                                                key={c.name}
                                                onClick={() => {
                                                    const isIn = c.items.some(i => i.id === product.id);
                                                    if (isIn) {
                                                        useStore.getState().removeFromCollection(c.name, product.id);
                                                    } else {
                                                        useStore.getState().addToCollection(c.name, product);
                                                    }
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-gray-50 flex justify-between items-center"
                                            >
                                                <span>{c.name}</span>
                                                {c.items.some(i => i.id === product.id) && <Heart size={12} className="fill-red-500 text-red-500" />}
                                            </button>
                                        ))}
                                        <Link to="/my-collections" className="block text-center py-2 text-xs text-deep-saffron hover:underline border-t border-gray-50">
                                            Manage Collections
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Reviews */}
                <ReviewSection productId={product.id} />

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="border-t border-gray-200 pt-16 mt-16">
                        <h3 className="text-2xl font-serif text-charcoal mb-8 text-center">You May Also Like</h3>
                        <ProductGrid products={relatedProducts} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;

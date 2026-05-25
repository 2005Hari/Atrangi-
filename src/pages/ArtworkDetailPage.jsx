import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye, ArrowLeft, Loader, Info, Check } from 'lucide-react';
import { api } from '../services/api';
import { useStore } from '../store/useStore';
import { useToast } from '../context/ToastContext';
import ARView from '../components/ARView';

const ArtworkDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const { addToCart, user } = useStore();

    const [artwork, setArtwork] = useState(null);
    const [relatedWorks, setRelatedWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAR, setShowAR] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);

    // Luxury Framing Selection
    const [selectedFrame, setSelectedFrame] = useState('unframed');
    const framingOptions = [
        { id: 'unframed', name: 'Premium Unframed Stretched Canvas', priceDiff: 0 },
        { id: 'obsidian', name: 'Hand-Milled Obsidian Matte Wood Frame', priceDiff: 6500 },
        { id: 'gold', name: 'Refined 24k Gold Gilt Wooden Gallery Frame', priceDiff: 9500 },
        { id: 'natural', name: 'Organic Natural White Oak Timber Frame', priceDiff: 4500 }
    ];

    useEffect(() => {
        const loadArtworkData = async () => {
            setLoading(true);
            window.scrollTo(0, 0);
            try {
                const data = await api.getProductById(id);
                setArtwork(data);
                if (data) {
                    const related = await api.getRelatedProducts(data.category, id);
                    setRelatedWorks(related.slice(0, 3));
                }
            } catch (error) {
                console.error("Failed to load artwork detail page:", error);
            } finally {
                setLoading(false);
            }
        };
        loadArtworkData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0D0D0D] pt-40 flex justify-center items-center">
                <div className="w-8 h-8 border-2 border-t-transparent border-[#C5A880] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!artwork) {
        return (
            <div className="min-h-screen bg-[#0D0D0D] text-[#FAF9F6] pt-40 text-center space-y-6">
                <h2 className="text-xl font-display font-light">Artwork not found in archives</h2>
                <Link to="/gallery" className="text-xs uppercase tracking-[0.2em] text-[#C5A880] border-b border-[#C5A880]/30 pb-1">
                    Return to Gallery
                </Link>
            </div>
        );
    }

    const currentFrameInfo = framingOptions.find(o => o.id === selectedFrame);
    const totalPrice = artwork.price + currentFrameInfo.priceDiff;

    const handleAddToCart = () => {
        const formattedProduct = {
            ...artwork,
            // Include framing option in title or custom property to render beautifully in cart
            title: selectedFrame === 'unframed' ? artwork.title : `${artwork.title} (${currentFrameInfo.name})`,
            price: totalPrice,
            selectedFrame: currentFrameInfo.name
        };
        addToCart(formattedProduct, 1);
        addToast(`Added ${artwork.title} (${currentFrameInfo.name}) to cart.`);
    };

    return (
        <div className="bg-[#0D0D0D] text-[#FAF9F6] min-h-screen pt-32 pb-24 px-8 relative">
            {/* Virtual AR Preview Modal */}
            {showAR && <ARView productImage={artwork.image} onClose={() => setShowAR(false)} />}

            {/* Fullscreen Viewer Overlay */}
            <AnimatePresence>
                {fullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[#0D0D0D] flex items-center justify-center p-4"
                        onClick={() => setFullscreen(false)}
                    >
                        <button className="absolute top-6 right-8 text-xs uppercase tracking-[0.2em] text-[#FAF9F6] hover:text-[#C5A880] transition-colors font-medium">
                            Close Fullscreen
                        </button>
                        <motion.img
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            src={artwork.image}
                            alt={artwork.title}
                            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl border border-white/10"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto space-y-24">
                {/* Back to Gallery */}
                <Link 
                    to="/gallery" 
                    className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-[#C5A880] transition-colors"
                >
                    <ArrowLeft size={12} className="mr-2" /> Back to Gallery
                </Link>

                {/* Editorial Presentation Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Immersive Fine-Art Image Panel */}
                    <div className="space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="aspect-[4/5] overflow-hidden bg-[#151515] border border-white/5 shadow-2xl relative group cursor-zoom-in"
                            onClick={() => setFullscreen(true)}
                        >
                            <img
                                src={artwork.image}
                                alt={artwork.title}
                                className="w-full h-full object-cover select-none hover:opacity-95 transition-opacity"
                            />
                            
                            {/* Hover Indicators */}
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-[9px] uppercase tracking-[0.2em] px-4 py-2 border border-white/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Click to zoom
                            </div>
                        </motion.div>

                        {/* Interactive View Tools */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowAR(true)}
                                className="flex-1 py-4 border border-white/10 hover:border-[#C5A880] bg-[#121212]/50 hover:bg-[#FAF9F6] text-xs uppercase tracking-[0.2em] font-semibold text-[#FAF9F6] hover:text-[#0D0D0D] transition-all flex items-center justify-center gap-2"
                            >
                                <Eye size={14} /> View In Room (AR)
                            </button>
                        </div>
                    </div>

                    {/* Editorial Details & Purchasing Panel */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.15 }}
                        className="space-y-10"
                    >
                        {/* Title block */}
                        <div className="space-y-3">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">{artwork.category}</span>
                            <h1 className="text-4xl md:text-5xl font-display font-light tracking-tight text-[#FAF9F6] leading-none">
                                {artwork.title}
                            </h1>
                            <p className="text-xs text-gray-500 font-serif italic tracking-widest pt-1">
                                by {artwork.artist} — {artwork.university}
                            </p>
                        </div>

                        {/* Price Details */}
                        <div className="border-t border-b border-white/5 py-6 flex justify-between items-center">
                            <div className="space-y-1">
                                <span className="text-[9px] text-gray-500 uppercase tracking-widest block">Valuation</span>
                                <span className="text-2xl font-light text-[#C5A880] tracking-widest">
                                    ₹{totalPrice.toLocaleString()}
                                </span>
                            </div>
                            <span className="text-[10px] text-green-500 tracking-widest uppercase flex items-center">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span> Available for dispatch
                            </span>
                        </div>

                        {/* Story / Curation notes */}
                        <div className="space-y-3">
                            <h4 className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold flex items-center gap-2">
                                <Info size={12} className="text-[#C5A880]" /> The Narrative / Curation Notes
                            </h4>
                            <p className="text-gray-400 text-xs font-light tracking-widest leading-relaxed">
                                {artwork.description || "A pristine experimental piece curated exclusively for ArtNestia's premium catalog. Hand-stretched and verified by local academic review boards."}
                            </p>
                        </div>

                        {/* Custom Framing Options */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                                Select Bespoke Frame
                            </h4>
                            <div className="grid grid-cols-1 gap-3">
                                {framingOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => setSelectedFrame(option.id)}
                                        className={`p-4 border text-left flex justify-between items-center transition-all ${
                                            selectedFrame === option.id
                                                ? 'border-[#C5A880] bg-[#C5A880]/5'
                                                : 'border-white/5 bg-[#121212]/30 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="space-y-1 pr-4">
                                            <span className="text-xs font-medium text-[#FAF9F6] block tracking-wide">
                                                {option.name}
                                            </span>
                                        </div>
                                        <div className="text-right flex items-center space-x-3 shrink-0">
                                            <span className="text-xs font-light text-[#C5A880] tracking-wider">
                                                {option.priceDiff === 0 ? 'Included' : `+ ₹${option.priceDiff.toLocaleString()}`}
                                            </span>
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                                selectedFrame === option.id 
                                                    ? 'border-[#C5A880] bg-[#C5A880] text-[#0D0D0D]' 
                                                    : 'border-white/20'
                                            }`}>
                                                {selectedFrame === option.id && <Check size={10} strokeWidth={3} />}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Physical Specifications */}
                        <div className="bg-[#121212]/40 border border-white/5 p-6 space-y-4 text-xs font-light tracking-widest">
                            <div className="flex justify-between border-b border-white/5 pb-3 text-gray-500">
                                <span>Dimensions</span>
                                <span className="text-[#FAF9F6] font-medium">{artwork.dimensions}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-3 text-gray-500">
                                <span>Materials Used</span>
                                <span className="text-[#FAF9F6] font-medium">{artwork.materials}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Provenance Certified</span>
                                <span className="text-[#C5A880] font-bold">Yes (Certified Origin)</span>
                            </div>
                        </div>

                        {/* Primary Add to Cart CTA */}
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-5 bg-[#C5A880] text-[#0D0D0D] font-bold text-[10px] tracking-[0.25em] uppercase hover:bg-[#FAF9F6] transition-all shadow-2xl rounded-none flex items-center justify-center gap-3"
                        >
                            <ShoppingBag size={14} /> Add To Private Collection
                        </button>
                    </motion.div>
                </div>

                {/* Related Masterpieces Showcase */}
                {relatedWorks.length > 0 && (
                    <div className="border-t border-white/5 pt-20 mt-20 space-y-16">
                        <div className="text-center space-y-2">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">Matching Curations</span>
                            <h3 className="text-2xl md:text-3xl font-display font-light text-[#FAF9F6]">You May Also Value</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            {relatedWorks.map((work) => (
                                <div key={work.id} className="group space-y-6">
                                    <div className="aspect-[3/4] w-full overflow-hidden bg-[#151515] border border-white/5 shadow-xl relative">
                                        <Link to={`/artwork/${work.id}`}>
                                            <img
                                                src={work.image}
                                                alt={work.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 select-none grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                                            />
                                        </Link>
                                    </div>
                                    <div className="text-left space-y-2">
                                        <h4 className="text-md font-display text-[#FAF9F6] tracking-[0.1em] group-hover:text-[#C5A880] transition-colors">
                                            <Link to={`/artwork/${work.id}`}>{work.title}</Link>
                                        </h4>
                                        <p className="text-[10px] text-gray-500 font-serif italic tracking-wider">
                                            by {work.artist} — {work.university}
                                        </p>
                                        <p className="text-xs font-light text-[#C5A880] tracking-widest pt-1">
                                            ₹{work.price.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtworkDetailPage;

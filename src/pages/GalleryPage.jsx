import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Grid, X, Eye } from 'lucide-react';
import { api } from '../services/api';

const GalleryPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    
    // Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedStyle, setSelectedStyle] = useState('All');
    const [priceRange, setPriceRange] = useState('All');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                // Fetch all products
                const data = await api.getProducts({ limit: 100 });
                setProducts(data.products || data);
            } catch (error) {
                console.error("Failed to load artworks:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    // Local filter and sorting application to ensure absolute speed and smooth experience
    const filteredProducts = useMemo(() => {
        let items = [...products];

        // Search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            items = items.filter(
                (p) => 
                    p.title?.toLowerCase().includes(query) || 
                    p.artist?.toLowerCase().includes(query) || 
                    p.description?.toLowerCase().includes(query)
            );
        }

        // Category
        if (selectedCategory !== 'All') {
            items = items.filter((p) => p.category === selectedCategory);
        }

        // Style (Mocked filter utilizing description keywords or category attributes)
        if (selectedStyle !== 'All') {
            const styleWord = selectedStyle.toLowerCase();
            items = items.filter((p) => 
                p.description?.toLowerCase().includes(styleWord) || 
                p.materials?.toLowerCase().includes(styleWord)
            );
        }

        // Price range
        if (priceRange !== 'All') {
            if (priceRange === 'under-50k') {
                items = items.filter((p) => p.price < 50000);
            } else if (priceRange === '50k-100k') {
                items = items.filter((p) => p.price >= 50000 && p.price <= 100000);
            } else if (priceRange === 'over-100k') {
                items = items.filter((p) => p.price > 100000);
            }
        }

        // Sorting
        if (sortBy === 'price-asc') {
            items.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            items.sort((a, b) => b.price - a.price);
        } else {
            // Newest (Default)
            items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return items;
    }, [products, searchQuery, selectedCategory, selectedStyle, priceRange, sortBy]);

    const categories = ['All', 'Painting', 'Photography', 'Sculpture', 'Mixed Media'];
    const styles = ['All', 'Minimalist', 'Abstract', 'Realism', 'Textured'];

    return (
        <div className="bg-[#0D0D0D] text-[#FAF9F6] min-h-screen pt-32 pb-24 px-8">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Editorial Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-medium">The Catalog</span>
                    <h1 className="text-4xl md:text-6xl font-display font-light text-[#FAF9F6]">The Gallery</h1>
                    <div className="w-12 h-[1px] bg-[#C5A880]/30 mx-auto mt-4" />
                    <p className="text-gray-500 font-light text-xs tracking-wider leading-relaxed pt-2">
                        Explore an elite collection of physical oil canvases, sculptures, and conceptual photographs.
                    </p>
                </div>

                {/* Filter and Control Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between border-t border-b border-white/5 py-6 gap-6">
                    <div className="flex items-center space-x-6 w-full md:w-auto">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="inline-flex items-center text-xs tracking-widest uppercase hover:text-[#C5A880] transition-colors gap-2"
                        >
                            <SlidersHorizontal size={14} className="text-[#C5A880]" />
                            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
                        </button>

                        <div className="relative flex-grow md:flex-grow-0 max-w-md">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <Search size={14} />
                            </span>
                            <input
                                type="text"
                                placeholder="Search works, styles, artists..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-[#151515] border border-white/5 pl-10 pr-6 py-2 text-xs tracking-widest text-[#FAF9F6] outline-none focus:border-[#C5A880]/50 w-full md:w-72"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 w-full md:w-auto justify-end">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest hidden lg:inline">Sort By</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-[#151515] border border-white/5 text-xs tracking-widest text-[#FAF9F6] p-2 outline-none focus:border-[#C5A880]/50"
                        >
                            <option value="newest">Acquisition (Newest)</option>
                            <option value="price-asc">Price (Low to High)</option>
                            <option value="price-desc">Price (High to Low)</option>
                        </select>
                    </div>
                </div>

                {/* Expandable Filter Grid */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden bg-[#090909] border border-white/5 p-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                {/* Categories Filter */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">Medium</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`px-4 py-1.5 text-[10px] tracking-widest uppercase transition-all duration-300 ${
                                                    selectedCategory === cat
                                                        ? 'bg-[#C5A880] text-[#0D0D0D] font-bold'
                                                        : 'bg-[#151515] border border-white/5 hover:border-[#C5A880]/40 text-gray-400'
                                                }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Style Filter */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">Style</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {styles.map((style) => (
                                            <button
                                                key={style}
                                                onClick={() => setSelectedStyle(style)}
                                                className={`px-4 py-1.5 text-[10px] tracking-widest uppercase transition-all duration-300 ${
                                                    selectedStyle === style
                                                        ? 'bg-[#C5A880] text-[#0D0D0D] font-bold'
                                                        : 'bg-[#151515] border border-white/5 hover:border-[#C5A880]/40 text-gray-400'
                                                }`}
                                            >
                                                {style}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Filter */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">Price Segment</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { label: 'All Values', value: 'All' },
                                            { label: 'Under ₹50,000', value: 'under-50k' },
                                            { label: '₹50,000 - ₹1,00,000', value: '50k-100k' },
                                            { label: 'Over ₹1,00,000', value: 'over-100k' }
                                        ].map((price) => (
                                            <button
                                                key={price.value}
                                                onClick={() => setPriceRange(price.value)}
                                                className={`px-4 py-1.5 text-[10px] tracking-widest uppercase transition-all duration-300 ${
                                                    priceRange === price.value
                                                        ? 'bg-[#C5A880] text-[#0D0D0D] font-bold'
                                                        : 'bg-[#151515] border border-white/5 hover:border-[#C5A880]/40 text-gray-400'
                                                }`}
                                            >
                                                {price.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Art Grid Section */}
                {loading ? (
                    <div className="flex justify-center py-40">
                        <div className="w-8 h-8 border-2 border-t-transparent border-[#C5A880] rounded-full animate-spin"></div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-32 border border-white/5 bg-[#090909]">
                        <SlidersHorizontal size={36} className="text-gray-600 mx-auto mb-4" strokeWidth={1} />
                        <p className="text-gray-400 text-xs tracking-widest">No matching artwork cataloged under these filters.</p>
                    </div>
                ) : (
                    /* masonry-like or premium asymmetric luxury grid columns */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {filteredProducts.map((artwork, index) => (
                            <motion.div
                                key={artwork.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: (index % 3) * 0.15 }}
                                viewport={{ once: true }}
                                className="group relative space-y-6"
                            >
                                {/* Immersive Hover Zoom Container */}
                                <div className="aspect-[3/4] w-full overflow-hidden bg-[#151515] border border-white/5 shadow-2xl relative">
                                    <Link to={`/artwork/${artwork.id}`}>
                                        <img
                                            src={artwork.image}
                                            alt={artwork.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:opacity-85 select-none grayscale group-hover:grayscale-0"
                                            loading="lazy"
                                        />
                                    </Link>
                                    
                                    {/* Action Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                                        <span className="bg-[#FAF9F6] text-[#0D0D0D] px-6 py-2.5 text-[9px] font-bold tracking-[0.25em] uppercase transition-transform transform translate-y-4 group-hover:translate-y-0 duration-500 inline-flex items-center gap-2">
                                            <Eye size={12} /> View Masterpiece
                                        </span>
                                    </div>
                                </div>

                                <div className="text-left space-y-2">
                                    <div className="flex justify-between items-start gap-4">
                                        <h3 className="text-md font-display text-[#FAF9F6] tracking-[0.1em] group-hover:text-[#C5A880] transition-colors">
                                            <Link to={`/artwork/${artwork.id}`}>{artwork.title}</Link>
                                        </h3>
                                        <span className="text-[9px] bg-[#151515] border border-white/10 text-gray-400 px-3 py-1 font-light tracking-widest uppercase">
                                            {artwork.category}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-serif italic tracking-wider">
                                        by {artwork.artist} — {artwork.university}
                                    </p>
                                    <p className="text-sm font-light text-[#C5A880] tracking-[0.15em] pt-1">
                                        ₹{artwork.price.toLocaleString()}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GalleryPage;

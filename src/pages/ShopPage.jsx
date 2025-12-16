import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import ProductGrid from '../components/ProductGrid';
import { Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Filter States
    const [filters, setFilters] = useState({
        search: '',
        category: 'All',
        minPrice: '',
        maxPrice: '',
        sort: 'newest',
        artist: ''
    });

    const categories = ['All', 'Paintings', 'Sculptures', 'Digital Art', 'Photography', 'Mixed Media'];
    const sortOptions = [
        { value: 'newest', label: 'Newest Arrivals' },
        { value: 'price_asc', label: 'Price: Low to High' },
        { value: 'price_desc', label: 'Price: High to Low' }
    ];

    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await api.getProducts(filters);
                setProducts(data.products);
                setTotalPages(data.pages);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [filters]);

    const handleFilterChange = (key, value) => {
        // Reset to page 1 on filter change
        if (key !== 'page') {
            setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
        } else {
            setFilters(prev => ({ ...prev, [key]: value }));
        }
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            category: 'All',
            minPrice: '',
            maxPrice: '',
            sort: 'newest',
            artist: '',
            page: 1
        });
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-cream">
            {/* ... (Header and Mobile Filters same as before) ... */}
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                    <div>
                        <h1 className="text-4xl font-display font-bold text-charcoal mb-2">Shop All Art</h1>
                        <p className="text-gray-500 font-serif italic">Discover unique pieces for your space.</p>
                    </div>

                    <button
                        onClick={() => setIsMobileFiltersOpen(true)}
                        className="md:hidden flex items-center space-x-2 bg-charcoal text-white px-4 py-2 rounded-sm mt-4"
                    >
                        <Filter size={18} />
                        <span>Filters</span>
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters (Desktop) */}
                    <aside className="hidden md:block w-64 flex-shrink-0 space-y-8">
                        {/* Search */}
                        <div>
                            <h3 className="font-bold text-charcoal mb-3 uppercase text-xs tracking-wider">Search</h3>
                            <input
                                type="text"
                                placeholder="Search art..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="w-full border border-gray-200 p-2 rounded-sm focus:border-deep-saffron outline-none text-sm"
                            />
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="font-bold text-charcoal mb-3 uppercase text-xs tracking-wider">Category</h3>
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <label key={cat} className="flex items-center space-x-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={filters.category === cat}
                                            onChange={() => handleFilterChange('category', cat)}
                                            className="accent-deep-saffron"
                                        />
                                        <span className={`text-sm ${filters.category === cat ? 'text-deep-saffron font-medium' : 'text-gray-600 group-hover:text-charcoal'}`}>
                                            {cat}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h3 className="font-bold text-charcoal mb-3 uppercase text-xs tracking-wider">Price Range</h3>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={filters.minPrice}
                                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                    className="w-full border border-gray-200 p-2 rounded-sm text-sm focus:border-deep-saffron outline-none"
                                />
                                <span className="text-gray-400">-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                    className="w-full border border-gray-200 p-2 rounded-sm text-sm focus:border-deep-saffron outline-none"
                                />
                            </div>
                        </div>

                        {/* Sort */}
                        <div>
                            <h3 className="font-bold text-charcoal mb-3 uppercase text-xs tracking-wider">Sort By</h3>
                            <select
                                value={filters.sort}
                                onChange={(e) => handleFilterChange('sort', e.target.value)}
                                className="w-full border border-gray-200 p-2 rounded-sm text-sm focus:border-deep-saffron outline-none bg-white cursor-pointer"
                            >
                                {sortOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={clearFilters}
                            className="text-sm text-gray-500 hover:text-deep-saffron underline"
                        >
                            Reset Filters
                        </button>
                    </aside>

                    {/* Mobile Filters Drawer */}
                    <AnimatePresence>
                        {isMobileFiltersOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: '100%' }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: '100%' }}
                                className="fixed inset-0 z-50 bg-white p-6 md:hidden overflow-y-auto"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-display font-bold">Filters</h2>
                                    <button onClick={() => setIsMobileFiltersOpen(false)}>
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h3 className="font-bold text-charcoal mb-3 uppercase text-xs tracking-wider">Search</h3>
                                        <input
                                            type="text"
                                            placeholder="Search art..."
                                            value={filters.search}
                                            onChange={(e) => handleFilterChange('search', e.target.value)}
                                            className="w-full border border-gray-200 p-3 rounded-sm focus:border-deep-saffron outline-none"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-charcoal mb-3 uppercase text-xs tracking-wider">Category</h3>
                                        <div className="space-y-3">
                                            {categories.map(cat => (
                                                <label key={cat} className="flex items-center space-x-3">
                                                    <input
                                                        type="radio"
                                                        name="mobile-category"
                                                        checked={filters.category === cat}
                                                        onChange={() => handleFilterChange('category', cat)}
                                                        className="w-5 h-5 accent-deep-saffron"
                                                    />
                                                    <span className="text-lg text-charcoal">{cat}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-4 flex space-x-4">
                                        <button
                                            onClick={() => { clearFilters(); setIsMobileFiltersOpen(false); }}
                                            className="flex-1 py-3 border border-gray-200 text-charcoal font-bold rounded-sm"
                                        >
                                            Reset
                                        </button>
                                        <button
                                            onClick={() => setIsMobileFiltersOpen(false)}
                                            className="flex-1 py-3 bg-deep-saffron text-white font-bold rounded-sm"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Product Grid & Pagination */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deep-saffron"></div>
                            </div>
                        ) : (
                            <>
                                <ProductGrid products={products} />
                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center mt-12 space-x-2">
                                        <button
                                            disabled={(filters.page || 1) <= 1}
                                            onClick={() => handleFilterChange('page', (filters.page || 1) - 1)}
                                            className="px-4 py-2 border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            Previous
                                        </button>
                                        <span className="px-4 py-2 text-charcoal font-medium">Page {filters.page || 1} of {totalPages}</span>
                                        <button
                                            disabled={(filters.page || 1) >= totalPages}
                                            onClick={() => handleFilterChange('page', (filters.page || 1) + 1)}
                                            className="px-4 py-2 border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;

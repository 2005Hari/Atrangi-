import React, { useState } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterBar = ({ onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        category: 'All',
        priceRange: 'All',
        size: 'All',
        medium: 'All'
    });

    const categories = ['All', 'Resin Art', 'Sculptures', 'Sketches & Drawings', 'Mold Art', 'Home Decor'];
    const priceRanges = ['All', 'Under ₹5,000', '₹5,000 - ₹10,000', '₹10,000 - ₹20,000', 'Above ₹20,000'];
    const sizes = ['All', 'Small', 'Medium', 'Large', 'Extra Large'];
    const mediums = ['All', 'Oil', 'Acrylic', 'Digital', 'Mixed Media', 'Charcoal'];

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const resetFilters = {
            category: 'All',
            priceRange: 'All',
            size: 'All',
            medium: 'All'
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    const activeFilterCount = Object.values(filters).filter(v => v !== 'All').length;

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 text-charcoal font-medium hover:text-gold transition-colors"
                >
                    <Filter size={20} />
                    <span>Filter & Sort</span>
                    {activeFilterCount > 0 && (
                        <span className="bg-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {activeFilterCount}
                        </span>
                    )}
                    <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {activeFilterCount > 0 && (
                    <button
                        onClick={clearFilters}
                        className="text-sm text-gray-500 hover:text-red-500 flex items-center space-x-1"
                    >
                        <X size={14} />
                        <span>Clear All</span>
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Category */}
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Category</label>
                                <div className="space-y-2">
                                    {categories.map(cat => (
                                        <label key={cat} className="flex items-center space-x-2 cursor-pointer group">
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${filters.category === cat ? 'border-gold' : 'border-gray-300 group-hover:border-gold'}`}>
                                                {filters.category === cat && <div className="w-2 h-2 bg-gold rounded-full" />}
                                            </div>
                                            <span className={`text-sm ${filters.category === cat ? 'text-charcoal font-medium' : 'text-gray-600'}`}>{cat}</span>
                                            <input
                                                type="radio"
                                                name="category"
                                                className="hidden"
                                                checked={filters.category === cat}
                                                onChange={() => handleFilterChange('category', cat)}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Price</label>
                                <div className="space-y-2">
                                    {priceRanges.map(range => (
                                        <label key={range} className="flex items-center space-x-2 cursor-pointer group">
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${filters.priceRange === range ? 'border-gold' : 'border-gray-300 group-hover:border-gold'}`}>
                                                {filters.priceRange === range && <div className="w-2 h-2 bg-gold rounded-full" />}
                                            </div>
                                            <span className={`text-sm ${filters.priceRange === range ? 'text-charcoal font-medium' : 'text-gray-600'}`}>{range}</span>
                                            <input
                                                type="radio"
                                                name="priceRange"
                                                className="hidden"
                                                checked={filters.priceRange === range}
                                                onChange={() => handleFilterChange('priceRange', range)}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Size */}
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Size</label>
                                <div className="space-y-2">
                                    {sizes.map(size => (
                                        <label key={size} className="flex items-center space-x-2 cursor-pointer group">
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${filters.size === size ? 'border-gold' : 'border-gray-300 group-hover:border-gold'}`}>
                                                {filters.size === size && <div className="w-2 h-2 bg-gold rounded-full" />}
                                            </div>
                                            <span className={`text-sm ${filters.size === size ? 'text-charcoal font-medium' : 'text-gray-600'}`}>{size}</span>
                                            <input
                                                type="radio"
                                                name="size"
                                                className="hidden"
                                                checked={filters.size === size}
                                                onChange={() => handleFilterChange('size', size)}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Medium */}
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Medium</label>
                                <div className="space-y-2">
                                    {mediums.map(medium => (
                                        <label key={medium} className="flex items-center space-x-2 cursor-pointer group">
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${filters.medium === medium ? 'border-gold' : 'border-gray-300 group-hover:border-gold'}`}>
                                                {filters.medium === medium && <div className="w-2 h-2 bg-gold rounded-full" />}
                                            </div>
                                            <span className={`text-sm ${filters.medium === medium ? 'text-charcoal font-medium' : 'text-gray-600'}`}>{medium}</span>
                                            <input
                                                type="radio"
                                                name="medium"
                                                className="hidden"
                                                checked={filters.medium === medium}
                                                onChange={() => handleFilterChange('medium', medium)}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FilterBar;

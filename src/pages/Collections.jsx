import React, { useState, useMemo, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import ProductGrid from '../components/ProductGrid';
import { api } from '../services/api';
import { Loader } from 'lucide-react';

const Collections = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Newest");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await api.getProductsByCategory(selectedCategory);
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedCategory]);

    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        if (sortBy === "Price: Low to High") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === "Price: High to Low") {
            filtered.sort((a, b) => b.price - a.price);
        }
        // "Newest" is default order for now

        return filtered;
    }, [products, sortBy]);

    return (
        <div className="min-h-screen pt-24 pb-20 bg-cream">
            <div className="container mx-auto px-6 mb-12 text-center">
                <h1 className="text-4xl md:text-6xl font-serif text-charcoal mb-4">Curated Collections</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Explore our exclusive selection of handcrafted art pieces from emerging student talent.
                </p>
            </div>

            <FilterBar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            <div className="container mx-auto px-6 mt-12">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader className="animate-spin text-gold" size={40} />
                    </div>
                ) : (
                    <ProductGrid products={filteredProducts} />
                )}
            </div>
        </div>
    );
};

export default Collections;

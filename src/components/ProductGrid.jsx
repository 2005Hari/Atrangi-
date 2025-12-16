import React from 'react';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

const ProductGrid = ({ products }) => {
    if (products.length === 0) {
        return (
            <div className="py-20 text-center">
                <h3 className="text-xl font-serif text-gray-400">No masterpieces found.</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <AnimatePresence mode='popLayout'>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ProductGrid;

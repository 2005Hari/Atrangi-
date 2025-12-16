import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from '../ProductCard';
import { BrowserRouter } from 'react-router-dom';

// Mock useStore
const mockAddToCart = vi.fn();
const mockToggleFavorite = vi.fn();

vi.mock('../../store/useStore', () => ({
    useStore: () => ({
        addToCart: mockAddToCart,
        toggleFavorite: mockToggleFavorite,
        favorites: []
    })
}));

const mockProduct = {
    id: 1,
    title: "Test Art",
    artist: "Test Artist",
    price: 1000,
    image: "test.jpg"
};

describe('ProductCard', () => {
    it('renders product details correctly', () => {
        render(
            <BrowserRouter>
                <ProductCard product={mockProduct} />
            </BrowserRouter>
        );

        expect(screen.getByText('Test Art')).toBeInTheDocument();
        expect(screen.getByText('by Test Artist')).toBeInTheDocument();
        expect(screen.getByText('₹1,000')).toBeInTheDocument();
    });

    it('calls addToCart when Add button is clicked', () => {
        render(
            <BrowserRouter>
                <ProductCard product={mockProduct} />
            </BrowserRouter>
        );

        const addButton = screen.getByText('ADD');
        fireEvent.click(addButton);
        expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
    });
});

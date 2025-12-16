import { describe, it, expect } from 'vitest';
import { api } from '../api';

describe('API Service', () => {
    it('fetches all products', async () => {
        const products = await api.getProducts();
        expect(products).toBeDefined();
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);
    });

    it('fetches product by id', async () => {
        const product = await api.getProductById(1);
        expect(product).toBeDefined();
        expect(product.id).toBe(1);
    });

    it('fetches featured products', async () => {
        const featured = await api.getFeaturedProducts();
        expect(featured).toBeDefined();
        expect(featured.length).toBeLessThan(4); // Assuming limit is 3
    });
});

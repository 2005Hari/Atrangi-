const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/roleAuth');

// Get all products with filtering
router.get('/', async (req, res) => {
    try {
        const { search, minPrice, maxPrice, category, sort, artist, page = 1, limit = 12 } = req.query;
        let query = {};

        // Search (Title or Description)
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Filters
        if (category && category !== 'All') {
            query.category = category;
        }
        if (artist) {
            query.artist = artist;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Sort
        let sortOption = {};
        if (sort === 'price_asc') sortOption.price = 1;
        if (sort === 'price_desc') sortOption.price = -1;
        if (sort === 'newest') sortOption.createdAt = -1;

        const count = await db.products.countDocuments(query);
        const products = await db.products.find(query)
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json({
            products,
            total: count,
            page: Number(page),
            pages: Math.ceil(count / limit)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await db.products.findOne({ id: parseInt(req.params.id) });
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get related products
router.get('/related/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const { currentId } = req.query;
        const products = await db.products.find({ category });
        const related = products.filter(p => p.id !== parseInt(currentId)).slice(0, 3);
        res.json(related);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get products by artist
router.get('/artist/:name', async (req, res) => {
    try {
        const products = await db.products.find({ artist: req.params.name });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add Product (Protected)
router.post('/', auth, requireRole(['admin', 'creative_head']), async (req, res) => {
    try {
        const product = { ...req.body, id: Date.now() };
        await db.products.create(product);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Product (Protected with Granular Access)
router.put('/:id', auth, requireRole(['admin', 'creative_head', 'content_team', 'marketing_em']), async (req, res) => {
    try {
        const { role } = req.user;
        const updates = req.body;
        const productId = parseInt(req.params.id);

        // Security: Filter allowed fields based on role
        if (role === 'content_team') {
            // Can only edit description, bio, tags (assuming tags in desc or separate), images
            // CANNOT edit price, inStock
            delete updates.price;
            delete updates.inStock;
        } else if (role === 'marketing_em') {
            // Can only edit 'featured' status
            const newUpdates = {};
            if (updates.featured !== undefined) newUpdates.featured = updates.featured;
            // Ignore everything else
            if (Object.keys(newUpdates).length === 0) return res.status(403).json({ error: "Marketing can only update featured status." });
        }

        // Admin & Creative Head have full access (no filtering needed)

        const result = await db.products.updateOne({ id: productId }, { $set: updates });
        if (result.matchedCount === 0) return res.status(404).json({ error: "Product not found" });

        const updatedProduct = await db.products.findOne({ id: productId });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Product (Protected)
router.delete('/:id', auth, requireRole(['admin', 'creative_head']), async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await db.products.findOne({ id: productId });

        if (!product) return res.status(404).json({ error: "Product not found" });

        // Safety: Cannot delete sold items
        if (!product.inStock) {
            return res.status(400).json({ error: "Cannot delete sold items. Please archive instead." });
        }

        await db.products.deleteOne({ id: productId });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

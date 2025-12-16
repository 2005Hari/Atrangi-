const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Get Reviews for a Product
router.get('/:productId', async (req, res) => {
    try {
        const reviews = await db.reviews.find({ productId: Number(req.params.productId) }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add Review
router.post('/', auth, async (req, res) => {
    try {
        const review = {
            ...req.body,
            userId: req.user.email,
            userName: req.user.name,
            createdAt: new Date()
        };
        const result = await db.reviews.create(review);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

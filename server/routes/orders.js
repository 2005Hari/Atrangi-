const express = require('express');
const router = express.Router();
const { sendOrderConfirmation, sendAdminAlert } = require('../services/emailService');
const db = require('../db');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/roleAuth');

// Create Order (Protected)
router.post('/', auth, async (req, res) => {
    try {
        const { items } = req.body;

        // 1. Check Stock
        for (const item of items) {
            const product = await db.products.findOne({ id: item.id });
            if (!product) {
                return res.status(404).json({ error: `Product ${item.title} not found` });
            }
            if (!product.inStock) {
                return res.status(400).json({ error: `Sorry, "${product.title}" is already sold out.` });
            }
        }

        // 2. Decrement Stock (Mark as Sold Out for unique art)
        for (const item of items) {
            await db.products.updateOne({ id: item.id }, { $set: { inStock: false } });
        }

        const order = {
            ...req.body,
            userId: req.user.id,
            createdAt: new Date(),
            status: 'Processing'
        };
        const newOrder = await db.orders.create(order);

        // Send emails asynchronously
        sendOrderConfirmation(newOrder, req.user.email);
        sendAdminAlert(newOrder);

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get My Orders (Protected)
router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await db.orders.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin: Get All Orders
router.get('/', auth, requireRole(['admin']), async (req, res) => {
    try {
        const orders = await db.orders.find({}).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin: Update Order Status
router.patch('/:id', auth, requireRole(['admin']), async (req, res) => {
    try {
        const { status } = req.body; // remove manual role check, middleware handles it
        const result = await db.orders.updateOne({ _id: req.params.id }, { $set: { status } });

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const updatedOrder = await db.orders.findOne({ _id: req.params.id });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

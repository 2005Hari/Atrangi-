const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/roleAuth');

// Create Commission Request
router.post('/', auth, async (req, res) => {
    try {
        const commission = {
            userId: req.user.email, // Using email for reference as per schema
            ...req.body,
            status: 'Pending',
            createdAt: new Date()
        };
        const result = await db.commissions.create(commission);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get My Commissions
router.get('/my-commissions', auth, async (req, res) => {
    try {
        const commissions = await db.commissions.find({ userId: req.user.email }).sort({ createdAt: -1 });
        res.json(commissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin: Get All Commissions (Marketing & Admin)
router.get('/admin', auth, requireRole(['admin', 'marketing_em']), async (req, res) => {
    try {
        const commissions = await db.commissions.find({}).sort({ createdAt: -1 });
        res.json(commissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin: Update Commission Status
router.patch('/:id', auth, requireRole(['admin', 'marketing_em']), async (req, res) => {
    try {
        const { status } = req.body;
        const result = await db.commissions.updateOne({ _id: req.params.id }, { $set: { status } });
        if (result.matchedCount === 0) return res.status(404).json({ error: 'Commission not found' });
        res.json({ message: "Status updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

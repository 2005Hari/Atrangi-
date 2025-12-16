const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/roleAuth');

// Get all users (Admin only)
router.get('/', auth, requireRole(['admin']), async (req, res) => {
    try {
        const users = await db.users.find({}).sort({ createdAt: -1 }).lean();
        // Don't modify the objects directly if they are from NeDB, map them to new objects to strip passwords
        const safeUsers = users.map(u => {
            const { password, ...userWithoutPass } = u;
            return userWithoutPass;
        });
        res.json(safeUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user role (Admin only)
router.patch('/:id/role', auth, requireRole(['admin']), async (req, res) => {
    try {
        const { role } = req.body;
        const validRoles = ['user', 'admin', 'creative_head', 'content_team', 'marketing_em'];

        if (!validRoles.includes(role)) {
            return res.status(400).json({ error: "Invalid role" });
        }

        const result = await db.users.update({ _id: req.params.id }, { $set: { role } });

        if (result === 0) return res.status(404).json({ error: "User not found" });

        res.json({ message: "Role updated successfully", role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

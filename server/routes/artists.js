const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Get all artists
router.get('/', async (req, res) => {
    try {
        const artists = await db.artists.find({});
        res.json(artists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get artist by ID
router.get('/:id', async (req, res) => {
    try {
        const artist = await db.artists.findOne({ id: parseInt(req.params.id) });
        if (!artist) return res.status(404).json({ error: "Artist not found" });
        res.json(artist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const requireRole = require('../middleware/roleAuth');

// Add Artist (Protected)
router.post('/', auth, requireRole(['admin', 'creative_head', 'content_team']), async (req, res) => {
    try {
        const artist = { ...req.body, id: Date.now() };
        await db.artists.create(artist);
        res.status(201).json(artist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Artist (Protected) -> Content Team has full access here per requirement
router.put('/:id', auth, requireRole(['admin', 'creative_head', 'content_team']), async (req, res) => {
    try {
        const artistId = parseInt(req.params.id);
        const updates = req.body;

        const result = await db.artists.updateOne({ id: artistId }, { $set: updates });
        if (result.matchedCount === 0) return res.status(404).json({ error: "Artist not found" });

        const updatedArtist = await db.artists.findOne({ id: artistId });
        res.json(updatedArtist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Artist (Protected)
router.delete('/:id', auth, requireRole(['admin', 'creative_head']), async (req, res) => {
    try {
        const artistId = parseInt(req.params.id);
        await db.artists.deleteOne({ id: artistId });
        res.json({ message: "Artist deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

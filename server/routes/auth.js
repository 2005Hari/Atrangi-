const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const existingUser = await db.users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Create user
        const user = await db.users.create({
            name,
            email,
            password: hashedPassword,
            role: 'user', // Default role
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
        });

        // Generate token
        const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET);

        res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, cart: user.cart, wishlist: user.wishlist }, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Google Auth
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
    try {
        const { credential } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        let user = await db.users.findOne({ email });

        if (!user) {
            user = await db.users.create({
                name,
                email,
                password: await bcrypt.hash(Math.random().toString(36).slice(-8), 8), // Random password for socially logged in users
                role: 'user',
                avatar: picture
            });
        }

        const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET);
        res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, cart: user.cart || [], wishlist: user.wishlist || [] }, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await db.users.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET);

        res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, cart: user.cart || [], wishlist: user.wishlist || [] }, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Current User
const auth = require('../middleware/auth');
router.get('/me', auth, async (req, res) => {
    try {
        const user = await db.users.findOne({ _id: req.user.id });
        if (!user) return res.status(404).send();
        res.json({ id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, cart: user.cart || [], wishlist: user.wishlist || [] });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update Profile
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, avatar, addresses } = req.body;
        const updateData = {};
        if (name) updateData.name = name;
        if (avatar) updateData.avatar = avatar;
        if (addresses) updateData.addresses = addresses;

        await db.users.updateOne({ _id: req.user.id }, { $set: updateData });
        const user = await db.users.findOne({ _id: req.user.id });

        res.json({ id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, cart: user.cart || [], wishlist: user.wishlist || [], addresses: user.addresses || [] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Sync User Data (Cart & Wishlist)
router.put('/sync', auth, async (req, res) => {
    try {
        const { cart, wishlist } = req.body;
        const updateData = {};
        if (cart) updateData.cart = cart;
        if (wishlist) updateData.wishlist = wishlist;

        await db.users.updateOne({ _id: req.user.id }, { $set: updateData });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

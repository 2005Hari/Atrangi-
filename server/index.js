const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
require('dotenv').config();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/artists', require('./routes/artists'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/commissions', require('./routes/commissions'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/users', require('./routes/users'));

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Atrangi API" });
});

// Connect to Database
db.connect();

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

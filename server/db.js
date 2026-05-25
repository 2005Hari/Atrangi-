const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/artnestia';
        const maskedUri = uri.replace(/:([^@]+)@/, ':****@');
        console.log(`Connecting to MongoDB at: ${maskedUri}`);

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        if (error.message.includes('authentication failed')) {
            console.error('CRITICAL: MongoDB authentication failed. Please check your MONGODB_URI in the .env file.');
        }
        console.warn('Proceeding with server startup without database connectivity...');
    }
};

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'USER', enum: ['USER', 'ARTIST', 'ADMIN'] },
    avatar: String,
    cart: { type: Array, default: [] },
    wishlist: { type: Array, default: [] },
    addresses: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
    id: { type: Number, unique: true }, // Custom ID for URL compatibility
    title: { type: String, required: true },
    artist: String,
    artistBio: String,
    university: String,
    price: Number,
    category: String,
    image: String,
    description: String,
    dimensions: String,
    materials: String,
    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const artistSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    expertise: String,
    university: String,
    image: String,
    bio: String,
    createdAt: { type: Date, default: Date.now }
});

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Keeping as String for now to match logic, or ObjectId if referencing
    items: Array,
    total: Number,
    shippingDetails: Object,
    paymentMethod: String,
    status: { type: String, default: 'Processing' },
    timeline: Array,
    createdAt: { type: Date, default: Date.now }
});

const commissionSchema = new mongoose.Schema({
    userId: String,
    style: String,
    budget: Number,
    description: String,
    status: { type: String, default: 'Pending' }
});

const reviewSchema = new mongoose.Schema({
    productId: Number,
    userId: String,
    userName: String,
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
});

const db = {
    connect: connectDB,
    users: mongoose.model('User', userSchema),
    products: mongoose.model('Product', productSchema),
    artists: mongoose.model('Artist', artistSchema),
    orders: mongoose.model('Order', orderSchema),
    commissions: mongoose.model('Commission', commissionSchema),
    reviews: mongoose.model('Review', reviewSchema)
};

module.exports = db;
// Export database module

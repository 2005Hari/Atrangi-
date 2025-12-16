

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
};

export const api = {
    // Auth
    signup: async (userData) => {
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    login: async (credentials) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    googleLogin: async (credential) => {
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential })
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    getCurrentUser: async () => {
        const res = await fetch('/api/auth/me', { headers: getHeaders() });
        if (!res.ok) return null;
        return res.json();
    },

    syncUser: async (data) => {
        const res = await fetch('/api/auth/sync', {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to sync user data');
        return res.json();
    },

    updateProfile: async (data) => {
        const res = await fetch('/api/auth/profile', {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to update profile');
        return res.json();
    },

    // Products
    getProducts: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.category && filters.category !== 'All') params.append('category', filters.category);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.sort) params.append('sort', filters.sort);
        if (filters.artist) params.append('artist', filters.artist);
        if (filters.page) params.append('page', filters.page);

        const res = await fetch(`/api/products?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json(); // Returns { products, total, page, pages }
    },

    getProductById: async (id) => {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        return res.json();
    },

    getFeaturedProducts: async () => {
        const res = await fetch('/api/products?limit=100'); // Fetch enough to filter
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        return data.products.filter(p => p.featured);
    },

    getProductsByCategory: async (category) => {
        const res = await fetch('/api/products?limit=100');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        const products = data.products;
        if (category === "All") return products;
        return products.filter(p => p.category === category);
    },

    getRelatedProducts: async (category, currentId) => {
        const res = await fetch(`/api/products/related/${category}?currentId=${currentId}`);
        if (!res.ok) throw new Error('Failed to fetch related products');
        return res.json();
    },

    getProductsByArtist: async (artistName) => {
        const res = await fetch(`/api/products/artist/${artistName}`);
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    },

    // Artists
    getArtists: async () => {
        const res = await fetch('/api/artists');
        if (!res.ok) throw new Error('Failed to fetch artists');
        return res.json();
    },

    getArtistById: async (id) => {
        const res = await fetch(`/api/artists/${id}`);
        if (!res.ok) throw new Error('Artist not found');
        return res.json();
    },

    // Orders
    createOrder: async (orderData) => {
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(orderData)
        });
        if (!res.ok) throw new Error('Failed to create order');
        return res.json();
    },

    getMyOrders: async () => {
        const res = await fetch('/api/orders/my-orders', { headers: getHeaders() });
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
    },

    // Admin Orders
    getAdminOrders: async () => {
        const res = await fetch('/api/orders', { headers: getHeaders() });
        if (!res.ok) throw new Error('Failed to fetch admin orders');
        return res.json();
    },

    updateOrderStatus: async (id, status) => {
        const res = await fetch(`/api/orders/${id}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify({ status })
        });
        if (!res.ok) throw new Error('Failed to update order status');
        return res.json();
    },

    // User Management
    getUsers: async () => {
        const res = await fetch('/api/users', { headers: getHeaders() });
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
    },

    updateUserRole: async (userId, role) => {
        const res = await fetch(`/api/users/${userId}/role`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify({ role })
        });
        if (!res.ok) throw new Error('Failed to update role');
        return res.json();

    },

    // Commissions
    submitCommission: async (data) => {
        const res = await fetch('/api/commissions', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to submit commission');
        return res.json();
    },

    getMyCommissions: async () => {
        const res = await fetch('/api/commissions/my-commissions', { headers: getHeaders() });
        if (!res.ok) throw new Error('Failed to fetch commissions');
        return res.json();
    },

    // Reviews
    getReviews: async (productId) => {
        const res = await fetch(`/api/reviews/${productId}`);
        if (!res.ok) throw new Error('Failed to fetch reviews');
        return res.json();
    },

    addReview: async (reviewData) => {
        const res = await fetch('/api/reviews', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(reviewData)
        });
        if (!res.ok) throw new Error('Failed to add review');
        return res.json();
    }
};

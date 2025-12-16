import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../services/api';

export const useStore = create(
    persist(
        (set, get) => ({
            // Initial State
            cart: [],
            favorites: [],
            products: [], // Empty initially
            artists: [], // Empty initially
            commissions: [],
            user: null,
            reviews: [],
            collections: [
                { name: 'Favorites', items: [] },
                { name: 'Living Room Ideas', items: [] }
            ],
            messages: [],
            orders: [],

            // Async Actions
            setProducts: (products) => set({ products }),
            setArtists: (artists) => set({ artists }),
            setOrders: (orders) => set({ orders }),

            // User Auth Actions
            login: (userData) => set((state) => {
                // Merge logic: If server has data, use it. If local has data but server empty, keep local (and sync later).
                // Simple approach: Server wins for now, or merge if sophisticated.
                // Let's do a simple merge: if local cart has items, add them to server cart (this might duplicate, so we need careful logic).
                // Actually, best "E-commerce" practice usually:
                // 1. If anonymous cart is empty, load server cart.
                // 2. If anonymous cart has items, ask to merge or auto-merge.
                // We will AUTO-MERGE: Add anonymous items to user cart, then sync to server.

                let finalCart = userData.cart || [];
                if (state.cart.length > 0) {
                    // Basic merge: add local items if not in server cart
                    const serverCartIds = new Set(finalCart.map(i => i.id));
                    state.cart.forEach(localItem => {
                        if (!serverCartIds.has(localItem.id)) {
                            finalCart.push(localItem);
                        } else {
                            // Update quantity if exists? Or keep server?
                            // Let's keep server quantity + local quantity
                            const idx = finalCart.findIndex(i => i.id === localItem.id);
                            finalCart[idx].quantity += localItem.quantity;
                        }
                    });
                    // Sync the merged result back to server immediately
                    api.syncUser({ cart: finalCart });
                }

                let finalWishlist = userData.wishlist || [];
                // Re-construct Favorites collection from wishlist IDs if simple array, or objects
                // Assuming wishlist is array of objects for simplicity in schema match, or IDs.
                // Protocol: Wishlist in DB is just IDs probably? 
                // Wait, in previous steps I didn't define strict schema for wishlist items in DB, just "Array".
                // Let's assume it stores full objects for now to be safe with "collections".
                // Actually, let's sync "Favorites" collection to "wishlist" field.

                const favCollection = state.collections.find(c => c.name === 'Favorites');
                if (favCollection && favCollection.items.length > 0) {
                    // Merge local favorites to server wishlist
                    const serverFavIds = new Set(finalWishlist.map(i => i.id));
                    favCollection.items.forEach(item => {
                        if (!serverFavIds.has(item.id)) {
                            finalWishlist.push(item);
                        }
                    });
                    api.syncUser({ wishlist: finalWishlist });
                }

                // Transform server wishlist back to "Favorites" collection structure
                const newCollections = state.collections.map(c =>
                    c.name === 'Favorites' ? { ...c, items: finalWishlist } : c
                );

                // If favorites doesn't exist, Create it
                if (!newCollections.find(c => c.name === 'Favorites')) {
                    newCollections.push({ name: 'Favorites', items: finalWishlist });
                }

                return {
                    user: userData,
                    cart: finalCart,
                    collections: newCollections,
                    favorites: finalWishlist // Keep backward compat
                };
            }),
            logout: () => set({
                user: null,
                cart: [],
                collections: [{ name: 'Favorites', items: [] }, { name: 'Living Room Ideas', items: [] }],
                favorites: []
            }),
            updateUser: (updatedData) => set((state) => ({ user: { ...state.user, ...updatedData } })),

            // Cart Actions
            addToCart: (product, quantity = 1) =>
                set((state) => {
                    const existingItem = state.cart.find((item) => item.id === product.id);
                    let newCart;
                    if (existingItem) {
                        newCart = state.cart.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        );
                    } else {
                        newCart = [...state.cart, { ...product, quantity }];
                    }

                    if (state.user) {
                        api.syncUser({ cart: newCart });
                    }
                    return { cart: newCart };
                }),
            removeFromCart: (productId) =>
                set((state) => {
                    const newCart = state.cart.filter((item) => item.id !== productId);
                    if (state.user) api.syncUser({ cart: newCart });
                    return { cart: newCart };
                }),
            updateQuantity: (productId, quantity) =>
                set((state) => {
                    const newCart = state.cart.map((item) =>
                        item.id === productId ? { ...item, quantity } : item
                    );
                    if (state.user) api.syncUser({ cart: newCart });
                    return { cart: newCart };
                }),
            clearCart: () => set((state) => {
                if (state.user) api.syncUser({ cart: [] });
                return { cart: [] };
            }),

            // Product Actions (CMS)
            addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
            updateProduct: (updatedProduct) =>
                set((state) => ({
                    products: state.products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
                })),
            deleteProduct: (productId) =>
                set((state) => ({
                    products: state.products.filter((p) => p.id !== productId),
                })),

            // Artist Actions (CMS)
            addArtist: (artist) => set((state) => ({ artists: [...state.artists, artist] })),
            updateArtist: (updatedArtist) =>
                set((state) => ({
                    artists: state.artists.map((a) => (a.id === updatedArtist.id ? updatedArtist : a)),
                })),
            deleteArtist: (artistId) =>
                set((state) => ({
                    artists: state.artists.filter((a) => a.id !== artistId),
                })),

            // Commission Actions
            addCommission: (commission) => set((state) => ({ commissions: [commission, ...state.commissions] })),

            // Review Actions
            addReview: (review) => set((state) => ({ reviews: [review, ...state.reviews] })),

            // Collection Actions
            createCollection: (name) => set((state) => ({
                collections: [...state.collections, { name, items: [] }]
            })),
            addToCollection: (collectionName, product) => set((state) => ({
                collections: state.collections.map(c =>
                    c.name === collectionName
                        ? { ...c, items: c.items.some(i => i.id === product.id) ? c.items : [...c.items, product] }
                        : c
                )
            })),
            removeFromCollection: (collectionName, productId) => set((state) => ({
                collections: state.collections.map(c =>
                    c.name === collectionName
                        ? { ...c, items: c.items.filter(i => i.id !== productId) }
                        : c
                )
            })),
            // Helper for backward compatibility with "Favorites"
            toggleFavorite: (product) => set((state) => {
                const favCollection = state.collections.find(c => c.name === 'Favorites');
                let newCollections;
                let newWishlist;

                // Create Favorites if missing
                if (!favCollection) {
                    newCollections = [...state.collections, { name: 'Favorites', items: [product] }];
                    newWishlist = [product];
                } else {
                    const isFav = favCollection.items.some(i => i.id === product.id);
                    newWishlist = isFav ? favCollection.items.filter(i => i.id !== product.id) : [...favCollection.items, product];

                    newCollections = state.collections.map(c =>
                        c.name === 'Favorites'
                            ? { ...c, items: newWishlist }
                            : c
                    );
                }

                if (state.user) {
                    api.syncUser({ wishlist: newWishlist });
                }

                return {
                    collections: newCollections,
                    favorites: newWishlist
                };
            }),

            // Message Actions
            sendMessage: (text) => set((state) => ({
                messages: [...state.messages, { id: Date.now(), sender: 'User', text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
            })),

            // Order Actions
            addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
        }),
        {
            name: 'atrangi-storage',
            partialize: (state) => ({
                cart: state.cart,
                user: state.user,
                products: state.products,
                artists: state.artists,
                commissions: state.commissions,
                reviews: state.reviews,
                collections: state.collections,
                messages: state.messages,
                orders: state.orders
            }),
        }
    )
);

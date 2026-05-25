import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../services/api';

export const useStore = create(
    persist(
        (set, get) => ({
            // Initial State
            cart: [],
            products: [],
            artists: [],
            commissions: [],
            orders: [],
            user: null,

            // Async / Hydration Setters
            setProducts: (products) => set({ products }),
            setArtists: (artists) => set({ artists }),
            setOrders: (orders) => set({ orders }),

            // User Authentication Actions
            login: (userData) => set((state) => {
                let finalCart = userData.cart || [];
                if (state.cart.length > 0) {
                    // Auto-merge local anonymous cart items to server cart
                    const serverCartIds = new Set(finalCart.map(i => i.id));
                    state.cart.forEach(localItem => {
                        if (!serverCartIds.has(localItem.id)) {
                            finalCart.push(localItem);
                        } else {
                            const idx = finalCart.findIndex(i => i.id === localItem.id);
                            finalCart[idx].quantity += localItem.quantity;
                        }
                    });
                    api.syncUser({ cart: finalCart });
                }

                return {
                    user: userData,
                    cart: finalCart
                };
            }),
            logout: () => {
                localStorage.removeItem('token');
                set({
                    user: null,
                    cart: []
                });
            },
            updateUser: (updatedData) => set((state) => ({ user: { ...state.user, ...updatedData } })),

            // Cart Operations
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

            // Product CMS Setters
            addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
            updateProduct: (updatedProduct) =>
                set((state) => ({
                    products: state.products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
                })),
            deleteProduct: (productId) =>
                set((state) => ({
                    products: state.products.filter((p) => p.id !== productId),
                })),

            // Commission Action
            addCommission: (commission) => set((state) => ({ commissions: [commission, ...state.commissions] })),

            // Order Action
            addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
        }),
        {
            name: 'artnestia-storage',
            partialize: (state) => ({
                cart: state.cart,
                user: state.user,
                products: state.products,
                artists: state.artists,
                commissions: state.commissions,
                orders: state.orders
            }),
        }
    )
);

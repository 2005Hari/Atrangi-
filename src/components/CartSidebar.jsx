import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { useStore } from '../store/useStore';

const CartSidebar = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity } = useStore();

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = 500; // Flat rate in INR
    const total = subtotal + shipping;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-[100] flex flex-col"

                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-2xl font-serif text-charcoal">Your Cart ({cart.length})</h2>
                            <button onClick={onClose} className="hover:text-gold transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <ShoppingBag size={48} className="text-gray-300" />
                                    <p className="text-gray-500">Your cart is empty.</p>
                                    <button onClick={onClose} className="text-gold hover:underline">
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex space-x-4">
                                        <div className="w-24 h-32 flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-serif text-lg text-charcoal">{item.title}</h3>
                                                <p className="text-sm text-gray-500">by {item.artist}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center border border-gray-200 rounded-sm">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                        className="p-1 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="px-2 text-sm font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <p className="font-medium text-charcoal">₹{(item.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors self-start"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-gray-50">
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Shipping</span>
                                        <span>₹{shipping.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-serif font-bold text-charcoal pt-4 border-t border-gray-200">
                                        <span>Total</span>
                                        <span>₹{total.toLocaleString()}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        onClose();
                                        if (useStore.getState().user) {
                                            window.location.href = '/checkout';
                                        } else {
                                            window.location.href = '/login';
                                        }
                                    }}
                                    className="w-full py-4 bg-charcoal text-white font-medium tracking-widest hover:bg-gold transition-colors duration-300 mb-4"
                                >
                                    CHECKOUT
                                </button>
                                <div className="flex items-center justify-center space-x-4 text-gray-400 text-sm">
                                    <span className="text-xs uppercase tracking-wide">We Accept:</span>
                                    <div className="flex items-center space-x-2" title="UPI & Cards">
                                        <CreditCard size={16} />
                                        <span className="font-medium">UPI</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;

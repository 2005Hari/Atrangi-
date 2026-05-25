import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, ClipboardList, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const CheckoutPage = () => {
    const { cart, user, clearCart, addOrder } = useStore();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);

    // Form inputs
    const [shippingDetails, setShippingDetails] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        phone: ''
    });

    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        cardExpiry: '',
        cardCvv: '',
        cardName: ''
    });

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        // Check standard validation
        const fields = Object.values(shippingDetails);
        if (fields.some(f => !f.trim())) {
            addToast("Please fill all dispatch parameters.");
            return;
        }
        setStep(3);
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        const cardFields = Object.values(paymentDetails);
        if (cardFields.some(f => !f.trim())) {
            addToast("Please input all authentication credentials.");
            return;
        }

        setSubmitting(true);
        try {
            // Place order in DB
            const orderData = {
                userId: user?.id || 'anonymous',
                items: cart,
                total: cartTotal,
                shippingDetails,
                paymentMethod: 'Credit/Debit Card'
            };

            const created = await api.createOrder(orderData);
            addOrder(created);
            clearCart();
            setStep(4);
            addToast("Your private acquisition is authorized.");
        } catch (error) {
            console.error("Acquisition check-out failure:", error);
            addToast("Fulfillment rejected. Please review backend connection.");
        } finally {
            setSubmitting(false);
        }
    };

    if (cart.length === 0 && step < 4) {
        return (
            <div className="min-h-screen bg-[#0D0D0D] text-[#FAF9F6] pt-40 flex flex-col items-center justify-center text-center space-y-4">
                <p className="text-gray-500 text-xs tracking-widest uppercase">Your private collection bag is currently empty.</p>
                <a href="/gallery" className="text-xs uppercase tracking-widest text-[#C5A880] border-b border-[#C5A880]/30 pb-1">Browse Gallery</a>
            </div>
        );
    }

    return (
        <div className="bg-[#0D0D0D] text-[#FAF9F6] min-h-screen pt-36 pb-24 px-8 flex items-center justify-center">
            <div className="w-full max-w-4xl bg-[#090909] border border-white/5 grid grid-cols-1 lg:grid-cols-12 shadow-2xl relative">
                
                {/* Steps Controller - Left/Main side (7 cols) */}
                <div className="lg:col-span-7 p-8 md:p-12 space-y-10 border-r border-white/5">
                    {/* Stepper Progress Indicator */}
                    {step < 4 && (
                        <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.2em] text-gray-500 border-b border-white/5 pb-4">
                            <span className={step === 1 ? 'text-[#C5A880] font-bold' : ''}>1. Review</span>
                            <span className={step === 2 ? 'text-[#C5A880] font-bold' : ''}>2. Delivery</span>
                            <span className={step === 3 ? 'text-[#C5A880] font-bold' : ''}>3. Secure Vault</span>
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {/* STEP 1: REVIEW ITEMS */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-display font-light text-[#FAF9F6]">Acquisition Curation</h2>
                                <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between border-b border-white/5 pb-4 gap-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-12 bg-[#121212] border border-white/5 overflow-hidden">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs uppercase tracking-widest text-[#FAF9F6] font-semibold truncate max-w-xs">{item.title}</h4>
                                                    <p className="text-[9px] text-gray-500 font-serif italic">by {item.artist}</p>
                                                    <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-[#C5A880] tracking-wider font-light shrink-0">₹{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6">
                                    <button
                                        onClick={() => setStep(2)}
                                        className="w-full py-4 bg-[#C5A880] text-[#0D0D0D] font-bold text-[10px] tracking-[0.25em] uppercase hover:bg-[#FAF9F6] transition-all flex items-center justify-center gap-2"
                                    >
                                        Proceed to Delivery <ArrowRight size={12} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: SHIPPING ADDRESS */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-display font-light text-[#FAF9F6]">Spatial Dispatch Details</h2>
                                <form onSubmit={handleShippingSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            value={shippingDetails.firstName}
                                            onChange={(e) => setShippingDetails({ ...shippingDetails, firstName: e.target.value })}
                                            className="w-full bg-[#121212] border border-white/5 p-3 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 text-[#FAF9F6]"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            value={shippingDetails.lastName}
                                            onChange={(e) => setShippingDetails({ ...shippingDetails, lastName: e.target.value })}
                                            className="w-full bg-[#121212] border border-white/5 p-3 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 text-[#FAF9F6]"
                                            required
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Full Delivery Address"
                                        value={shippingDetails.address}
                                        onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                                        className="w-full bg-[#121212] border border-white/5 p-3 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 text-[#FAF9F6]"
                                        required
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="City"
                                            value={shippingDetails.city}
                                            onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                                            className="w-full bg-[#121212] border border-white/5 p-3 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 text-[#FAF9F6]"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="State"
                                            value={shippingDetails.state}
                                            onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
                                            className="w-full bg-[#121212] border border-white/5 p-3 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 text-[#FAF9F6]"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Postal ZIP Code"
                                            value={shippingDetails.postalCode}
                                            onChange={(e) => setShippingDetails({ ...shippingDetails, postalCode: e.target.value })}
                                            className="w-full bg-[#121212] border border-white/5 p-3 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 text-[#FAF9F6]"
                                            required
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Secure Telephone"
                                            value={shippingDetails.phone}
                                            onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                                            className="w-full bg-[#121212] border border-white/5 p-3 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 text-[#FAF9F6]"
                                            required
                                        />
                                    </div>

                                    <div className="flex justify-between items-center pt-6">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="text-xs uppercase tracking-widest text-gray-500 hover:text-[#FAF9F6] transition-colors"
                                        >
                                            Curation Items
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-10 py-4 bg-[#C5A880] text-[#0D0D0D] font-bold text-[10px] tracking-[0.25em] uppercase hover:bg-[#FAF9F6] transition-all flex items-center gap-2"
                                        >
                                            Payment Options <ArrowRight size={12} />
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {/* STEP 3: SECURE PAYMENT */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-display font-light text-[#FAF9F6]">Secure Vault Authorization</h2>
                                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Cardholder Name"
                                        value={paymentDetails.cardName}
                                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
                                        className="w-full bg-[#121212] border border-white/5 p-3 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 text-[#FAF9F6]"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Card Credentials Number (16 Digits)"
                                        value={paymentDetails.cardNumber}
                                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16) })}
                                        className="w-full bg-[#121212] border border-white/5 p-3 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 text-[#FAF9F6]"
                                        required
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Expiry MM/YY"
                                            value={paymentDetails.cardExpiry}
                                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardExpiry: e.target.value })}
                                            className="w-full bg-[#121212] border border-white/5 p-3 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 text-[#FAF9F6]"
                                            required
                                        />
                                        <input
                                            type="password"
                                            placeholder="CVV"
                                            value={paymentDetails.cardCvv}
                                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardCvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                                            className="w-full bg-[#121212] border border-white/5 p-3 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 text-[#FAF9F6]"
                                            required
                                        />
                                    </div>

                                    <div className="flex justify-between items-center pt-6">
                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="text-xs uppercase tracking-widest text-gray-500 hover:text-[#FAF9F6] transition-colors"
                                        >
                                            Delivery Location
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="px-12 py-4 bg-[#C5A880] text-[#0D0D0D] font-bold text-[10px] tracking-[0.25em] uppercase hover:bg-[#FAF9F6] transition-all flex items-center gap-2"
                                        >
                                            {submitting ? 'Authorizing Transactions...' : <>Authorize Purchase <CheckCircle size={12} /></>}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {/* STEP 4: SUCCESS */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-8 py-6"
                            >
                                <CheckCircle size={56} className="text-[#C5A880] mx-auto animate-bounce" strokeWidth={1} />
                                <div className="space-y-3">
                                    <h2 className="text-3xl font-display font-light">Acquisition Complete</h2>
                                    <p className="text-xs text-gray-500 tracking-wider max-w-sm mx-auto leading-relaxed">
                                        Your transactions are successfully finalized. A curator is preparing the stretching, framing, and timber packing. Track execution parameters inside your tracking tab.
                                    </p>
                                </div>
                                <div className="pt-4 flex justify-center gap-4">
                                    <button
                                        onClick={() => navigate('/tracking')}
                                        className="px-10 py-4 bg-[#C5A880] text-[#0D0D0D] text-[10px] tracking-[0.25em] font-bold uppercase hover:bg-[#FAF9F6] transition-colors"
                                    >
                                        Track Dispatches
                                    </button>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="px-10 py-4 border border-white/10 text-[#FAF9F6] text-[10px] tracking-[0.25em] font-bold uppercase hover:border-[#C5A880] hover:text-[#C5A880] transition-all"
                                    >
                                        Return Home
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Summary Panel - Right side (5 cols) */}
                <div className="lg:col-span-5 p-8 md:p-12 bg-[#080808] flex flex-col justify-between space-y-8">
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold border-b border-white/5 pb-4 mb-6">Valuation Summary</h3>
                        <div className="space-y-4 text-xs font-light tracking-widest text-gray-500">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="text-[#FAF9F6]">₹{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-4">
                                <span>Transit Insured Delivery</span>
                                <span className="text-green-500">Free/Complimentary</span>
                            </div>
                            <div className="flex justify-between text-sm text-[#FAF9F6] font-semibold pt-4">
                                <span>Total Valuation</span>
                                <span className="text-[#C5A880]">₹{cartTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-[9px] text-gray-600 tracking-wider leading-relaxed border-t border-white/5 pt-6 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#C5A880] rounded-full"></div>
                            <span>Fully Secure SSL Vault Encryption</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#C5A880] rounded-full"></div>
                            <span>Museum-grade Pack Crate Security</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

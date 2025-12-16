import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Truck, ShieldCheck } from 'lucide-react';

const CheckoutPage = () => {
    const { cart, clearCart, user } = useStore();
    const { addToast } = useToast();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
    const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, verifying, processing, confirming, success
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        phone: '',
        paymentMethod: 'card',
        upiId: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        setPaymentStatus('verifying');

        // Simulation
        await new Promise(resolve => setTimeout(resolve, 1500));
        setPaymentStatus('processing');
        await new Promise(resolve => setTimeout(resolve, 2000));
        setPaymentStatus('confirming');
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            const orderData = {
                items: cart,
                total: total,
                shippingDetails: formData,
                paymentMethod: formData.paymentMethod,
                status: 'Processing',
                timeline: [
                    { status: 'Order Placed', date: new Date().toISOString(), completed: true },
                    { status: 'Processing', date: new Date().toISOString(), completed: true }
                ]
            };

            const order = await import('../services/api').then(m => m.api.createOrder(orderData));

            useStore.getState().addOrder(order);
            clearCart();
            addToast('Order placed successfully!');
            setPaymentStatus('success');
            await new Promise(resolve => setTimeout(resolve, 1000)); // Show success briefly
            setLoading(false);
            setStep(4); // Success step
            setPaymentStatus('idle'); // Reset
        } catch (error) {
            console.error("Order failed:", error);
            setLoading(false);
            setPaymentStatus('idle');
            alert("Failed to place order. Please try again.");
        }
    };

    // ... existing render logic ...

    // Add this modal at the end of the return
    return (
        <div className="min-h-screen pt-32 pb-20 bg-cream relative">
            {/* Payment Processing Modal */}
            <AnimatePresence>
                {paymentStatus !== 'idle' && paymentStatus !== 'success' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white p-12 rounded-lg shadow-2xl flex flex-col items-center max-w-sm w-full"
                        >
                            <div className="relative w-24 h-24 mb-6">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="w-full h-full border-4 border-gray-100 border-t-deep-saffron rounded-full"
                                />
                                <div className="absolute inset-0 flex items-center justify-center text-deep-saffron">
                                    <ShieldCheck size={32} />
                                </div>
                            </div>

                            <h3 className="text-xl font-display font-bold text-charcoal mb-2">
                                {paymentStatus === 'verifying' && 'Verifying Details...'}
                                {paymentStatus === 'processing' && 'Processing Payment...'}
                                {paymentStatus === 'confirming' && 'Finalizing Order...'}
                            </h3>
                            <p className="text-gray-500 text-sm text-center">
                                Please do not close this window.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-serif text-charcoal mb-12 text-center">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {/* ... Rest of the checkout UI ... */}
                    {/* Main Form Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Steps Indicator */}
                        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                            {['Shipping', 'Payment', 'Review'].map((label, idx) => (
                                <div key={label} className={`flex items-center ${step === idx + 1 ? 'text-gold' : step > idx + 1 ? 'text-charcoal' : 'text-gray-300'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mr-2 ${step === idx + 1 ? 'border-gold' : step > idx + 1 ? 'border-charcoal bg-charcoal text-white' : 'border-gray-300'}`}>
                                        {step > idx + 1 ? <CheckCircle size={16} /> : idx + 1}
                                    </div>
                                    <span className="font-medium hidden sm:inline">{label}</span>
                                </div>
                            ))}
                        </div>

                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {step === 1 && (
                                <form onSubmit={handleNext} className="bg-white p-8 shadow-sm rounded-sm space-y-6">
                                    <h2 className="text-2xl font-serif text-charcoal mb-6 flex items-center">
                                        <Truck className="mr-3 text-gold" /> Shipping Details
                                    </h2>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-wider text-gray-500">First Name</label>
                                            <input required name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:border-gold outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-wider text-gray-500">Last Name</label>
                                            <input required name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:border-gold outline-none" />
                                        </div>
                                    </div>

                                    {/* Saved Addresses */}
                                    {user?.addresses?.length > 0 && (
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-wider text-gray-500">Saved Addresses</label>
                                            <select
                                                className="w-full border-b border-gray-300 py-2 focus:border-gold outline-none bg-transparent"
                                                onChange={(e) => {
                                                    if (e.target.value) {
                                                        const parts = e.target.value.split(',').map(s => s.trim());
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            address: e.target.value,
                                                        }));
                                                    }
                                                }}
                                            >
                                                <option value="">-- Select a saved address --</option>
                                                {user.addresses.map((addr, i) => (
                                                    <option key={i} value={addr}>{addr}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider text-gray-500">Email</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:border-gold outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider text-gray-500">Address</label>
                                        <input required name="address" value={formData.address} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:border-gold outline-none" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-wider text-gray-500">City</label>
                                            <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:border-gold outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-wider text-gray-500">ZIP Code</label>
                                            <input required name="zip" value={formData.zip} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:border-gold outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider text-gray-500">Phone</label>
                                        <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:border-gold outline-none" />
                                    </div>
                                    <div className="pt-6 flex justify-end">
                                        <button type="submit" className="px-8 py-3 bg-charcoal text-white tracking-widest hover:bg-gold transition-colors">
                                            CONTINUE TO PAYMENT
                                        </button>
                                    </div>
                                </form>
                            )}

                            {step === 2 && (
                                <form onSubmit={handleNext} className="bg-white p-8 shadow-sm rounded-sm space-y-6">
                                    <h2 className="text-2xl font-serif text-charcoal mb-6 flex items-center">
                                        <CreditCard className="mr-3 text-gold" /> Payment Method
                                    </h2>

                                    <div className="flex space-x-4 mb-6">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                                            className={`flex-1 py-4 border ${formData.paymentMethod === 'upi' ? 'border-gold bg-gold/5 text-charcoal' : 'border-gray-200 text-gray-500'} transition-all`}
                                        >
                                            UPI
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                                            className={`flex-1 py-4 border ${formData.paymentMethod === 'card' ? 'border-gold bg-gold/5 text-charcoal' : 'border-gray-200 text-gray-500'} transition-all`}
                                        >
                                            Card
                                        </button>
                                    </div>

                                    {formData.paymentMethod === 'upi' ? (
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-wider text-gray-500">UPI ID</label>
                                                <input required placeholder="username@upi" name="upiId" value={formData.upiId} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:border-gold outline-none" />
                                            </div>
                                            <p className="text-xs text-gray-400">Secure payment via your preferred UPI app.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-wider text-gray-500">Card Number</label>
                                                <input required placeholder="0000 0000 0000 0000" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:border-gold outline-none" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs uppercase tracking-wider text-gray-500">Expiry</label>
                                                    <input required placeholder="MM/YY" name="expiry" value={formData.expiry} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:border-gold outline-none" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs uppercase tracking-wider text-gray-500">CVV</label>
                                                    <input required placeholder="123" name="cvv" value={formData.cvv} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:border-gold outline-none" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-6 flex justify-between">
                                        <button type="button" onClick={() => setStep(1)} className="text-gray-500 hover:text-charcoal">
                                            Back
                                        </button>
                                        <button type="submit" className="px-8 py-3 bg-charcoal text-white tracking-widest hover:bg-gold transition-colors">
                                            REVIEW ORDER
                                        </button>
                                    </div>
                                </form>
                            )}

                            {step === 3 && (
                                <div className="bg-white p-8 shadow-sm rounded-sm space-y-6">
                                    <h2 className="text-2xl font-serif text-charcoal mb-6 flex items-center">
                                        <ShieldCheck className="mr-3 text-gold" /> Review Order
                                    </h2>

                                    <div className="space-y-4 border-b border-gray-100 pb-6">
                                        <h3 className="font-medium text-charcoal">Shipping To:</h3>
                                        <p className="text-gray-600 text-sm">
                                            {formData.firstName} {formData.lastName}<br />
                                            {formData.address}<br />
                                            {formData.city}, {formData.zip}<br />
                                            {formData.phone}
                                        </p>
                                    </div>

                                    <div className="space-y-4 border-b border-gray-100 pb-6">
                                        <h3 className="font-medium text-charcoal">Payment Method:</h3>
                                        <p className="text-gray-600 text-sm capitalize">
                                            {formData.paymentMethod} {formData.paymentMethod === 'card' && `ending in ${formData.cardNumber.slice(-4)}`}
                                        </p>
                                    </div>

                                    <div className="pt-6 flex justify-between items-center">
                                        <button type="button" onClick={() => setStep(2)} className="text-gray-500 hover:text-charcoal">
                                            Back
                                        </button>
                                        <button
                                            onClick={handlePlaceOrder}
                                            disabled={loading}
                                            className="px-8 py-4 bg-charcoal text-white tracking-widest hover:bg-gold transition-colors disabled:opacity-70 flex items-center"
                                        >
                                            {loading ? 'PROCESSING...' : `PAY ₹${total.toLocaleString()}`}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 shadow-sm rounded-sm sticky top-32">
                            <h3 className="text-xl font-serif text-charcoal mb-6">Order Summary</h3>
                            <div className="space-y-4 max-h-64 overflow-y-auto mb-6 pr-2">
                                {cart.map(item => (
                                    <div key={item.id} className="flex space-x-4">
                                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-sm" />
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-charcoal line-clamp-1">{item.title}</h4>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            <p className="text-sm text-gold">₹{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 pt-4 border-t border-gray-100">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;


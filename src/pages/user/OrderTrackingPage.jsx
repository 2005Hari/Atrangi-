import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { api } from '../../services/api';
import { Package, Truck, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderTrackingPage = () => {
    const { user } = useStore();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                try {
                    const data = await api.getMyOrders();
                    setOrders(data);
                } catch (error) {
                    console.error("Failed to fetch tracking orders:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen bg-[#0D0D0D] text-[#FAF9F6] pt-40 flex flex-col items-center justify-center text-center space-y-4">
                <h2 className="text-xl font-display font-light text-gray-500">Sign in to track catalog orders.</h2>
                <Link to="/login" className="text-xs uppercase tracking-widest text-[#C5A880] border-b border-[#C5A880]/30 pb-1">Authenticate Access</Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0D0D0D] pt-40 flex justify-center items-center">
                <div className="w-8 h-8 border-2 border-t-transparent border-[#C5A880] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-[#0D0D0D] text-[#FAF9F6] min-h-screen pt-36 pb-24 px-8">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">Transport & Dispatch</span>
                    <h1 className="text-3xl md:text-5xl font-display font-light text-[#FAF9F6]">Secure Transit Tracking</h1>
                    <div className="w-12 h-[1px] bg-[#C5A880]/30 mt-4" />
                </div>

                {orders.length > 0 ? (
                    <div className="space-y-12">
                        {orders.map((order) => (
                            <div key={order._id || order.id} className="bg-[#090909] border border-white/5 p-8 space-y-8">
                                <div className="flex flex-wrap justify-between items-start border-b border-white/5 pb-6 gap-4">
                                    <div className="space-y-1">
                                        <h2 className="text-sm font-bold text-[#FAF9F6] uppercase tracking-wider font-mono">Invoice Order #{order._id || order.id}</h2>
                                        <p className="text-[10px] text-gray-500 tracking-wider">Acquired on {new Date(order.createdAt || order.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <p className="text-lg font-light text-[#C5A880] tracking-widest">₹{order.total.toLocaleString()}</p>
                                        <p className="text-[9px] text-gray-500 uppercase tracking-widest">{order.items.length} Curated Items</p>
                                    </div>
                                </div>

                                {/* Custom Elegant Progress Milestone Steps */}
                                <div className="relative py-4">
                                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 z-0" />
                                    <div className="relative z-10 flex justify-between text-center">
                                        {[
                                            { label: 'Authorized', active: true, icon: Clock },
                                            { label: 'Crating', active: order.status !== 'Cancelled', icon: Package },
                                            { label: 'Transit', active: order.status === 'Shipped' || order.status === 'Delivered', icon: Truck },
                                            { label: 'Installed', active: order.status === 'Delivered', icon: CheckCircle }
                                        ].map((milestone, idx) => (
                                            <div key={idx} className="flex flex-col items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                                                    milestone.active 
                                                        ? 'bg-[#C5A880] border-[#C5A880] text-[#0D0D0D]' 
                                                        : 'bg-[#121212] border-white/5 text-gray-600'
                                                }`}>
                                                    <milestone.icon size={14} />
                                                </div>
                                                <span className={`text-[9px] uppercase tracking-wider font-medium ${
                                                    milestone.active ? 'text-[#FAF9F6]' : 'text-gray-600'
                                                }`}>
                                                    {milestone.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Items list inside Order */}
                                <div className="bg-[#121212]/40 border border-white/5 p-6">
                                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-4">Contents In Transit</h3>
                                    <div className="space-y-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center space-x-6">
                                                <div className="w-12 h-16 overflow-hidden bg-[#151515] border border-white/5 shrink-0">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale" />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="text-xs uppercase tracking-widest font-semibold text-[#FAF9F6]">{item.title}</h4>
                                                    <p className="text-[10px] text-gray-500 font-serif italic">by {item.artist} {item.selectedFrame ? `— Frame: ${item.selectedFrame}` : ''}</p>
                                                    <p className="text-[10px] text-[#C5A880] tracking-wider">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[#090909] border border-white/5 space-y-6">
                        <Package size={36} className="text-gray-600 mx-auto" strokeWidth={1} />
                        <p className="text-xs text-gray-500 tracking-wider">No catalog orders logged under your account.</p>
                        <Link to="/gallery" className="inline-block bg-[#C5A880] text-[#0D0D0D] px-10 py-4 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-[#FAF9F6] transition-colors">Start Shopping</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderTrackingPage;

import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Package, HelpCircle, User, MapPin, ClipboardList, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const { user, logout } = useStore();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [commissions, setCommissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState('orders');

    useEffect(() => {
        const loadDashboardData = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const [ordersData, commissionsData] = await Promise.all([
                    api.getMyOrders(),
                    api.getMyCommissions()
                ]);
                setOrders(ordersData);
                setCommissions(commissionsData);
            } catch (error) {
                console.error("Failed to load user dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadDashboardData();
    }, [user]);

    const handleLogout = () => {
        logout();
        addToast("Logged out from ArtNestia private circle.");
        navigate('/');
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-[#0D0D0D] text-[#FAF9F6] pt-40 text-center">
                <p className="text-gray-500 text-xs tracking-widest uppercase">Please log in to view account dashboard.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#0D0D0D] text-[#FAF9F6] min-h-screen pt-36 pb-24 px-8">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Executive Profile Welcome Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-10 gap-6">
                    <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-[#121212]">
                            <img src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-display font-light text-[#FAF9F6]">{user.name}</h1>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880]">{user.role} Member</span>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] text-red-400 hover:text-red-500 transition-colors gap-2 border border-red-500/10 hover:border-red-500/30 px-5 py-2"
                    >
                        <LogOut size={12} /> Leave Salon
                    </button>
                </div>

                {/* Dashboard Nav Tabs */}
                <div className="flex space-x-8 border-b border-white/5 pb-1">
                    {[
                        { id: 'orders', name: 'Order History', icon: Package },
                        { id: 'commissions', name: 'Commission Briefs', icon: ClipboardList }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 pb-4 text-xs uppercase tracking-widest transition-all duration-300 relative ${
                                activeTab === tab.id 
                                    ? 'text-[#C5A880] font-bold' 
                                    : 'text-gray-500 hover:text-gray-300'
                            }`}
                        >
                            <tab.icon size={14} />
                            <span>{tab.name}</span>
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A880]" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Contents */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-6 h-6 border-2 border-t-transparent border-[#C5A880] rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="space-y-8 pt-4">
                        {/* Tab 1: Orders */}
                        {activeTab === 'orders' && (
                            orders.length === 0 ? (
                                <div className="text-center py-20 bg-[#090909] border border-white/5 space-y-4">
                                    <p className="text-xs text-gray-500 tracking-wider">You have not acquired any masterpieces yet.</p>
                                    <a href="/gallery" className="inline-block bg-[#C5A880] text-[#0D0D0D] px-6 py-2.5 text-[10px] uppercase font-bold tracking-widest hover:bg-[#FAF9F6] transition-colors">Start Curation</a>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {orders.map((order) => (
                                        <div key={order._id || order.id} className="bg-[#090909] border border-white/5 p-8 space-y-6">
                                            <div className="flex flex-wrap justify-between items-start border-b border-white/5 pb-4 gap-4 text-xs font-light tracking-widest text-gray-400">
                                                <div>
                                                    <span className="text-[10px] text-gray-600 block mb-1">Invoice ID</span>
                                                    <span className="text-[#FAF9F6] font-bold font-mono">#{order._id || order.id}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] text-gray-600 block mb-1">Purchase Date</span>
                                                    <span>{new Date(order.createdAt || order.date).toLocaleDateString()}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] text-gray-600 block mb-1">Dispatched Status</span>
                                                    <span className={`font-bold ${order.status === 'Delivered' ? 'text-green-500' : 'text-[#C5A880]'}`}>{order.status}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] text-gray-600 block mb-1">Valuation</span>
                                                    <span className="text-[#C5A880] font-bold">₹{order.total.toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex items-center space-x-6">
                                                        <div className="w-16 h-20 overflow-hidden bg-[#151515] border border-white/5 shrink-0">
                                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#FAF9F6]">{item.title}</h4>
                                                            <p className="text-[10px] text-gray-500 font-serif italic">by {item.artist} {item.selectedFrame ? `— Frame: ${item.selectedFrame}` : ''}</p>
                                                            <p className="text-[11px] text-[#C5A880] tracking-wider font-light">Qty: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}

                        {/* Tab 2: Commissions */}
                        {activeTab === 'commissions' && (
                            commissions.length === 0 ? (
                                <div className="text-center py-20 bg-[#090909] border border-white/5 space-y-4">
                                    <p className="text-xs text-gray-500 tracking-wider">No active commission briefs cataloged under your account.</p>
                                    <a href="/commission" className="inline-block bg-[#C5A880] text-[#0D0D0D] px-6 py-2.5 text-[10px] uppercase font-bold tracking-widest hover:bg-[#FAF9F6] transition-colors">Submit Brief</a>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {commissions.map((c) => (
                                        <div key={c._id || c.id} className="bg-[#090909] border border-white/5 p-8 space-y-6">
                                            <div className="flex flex-wrap justify-between items-start border-b border-white/5 pb-4 gap-4 text-xs font-light tracking-widest text-gray-400">
                                                <div>
                                                    <span className="text-[10px] text-gray-600 block mb-1">Brief Category</span>
                                                    <span className="text-[#C5A880] font-bold uppercase">{c.style}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] text-gray-600 block mb-1">Canvas Scale</span>
                                                    <span className="text-[#FAF9F6] font-medium">{c.dimensions}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] text-gray-600 block mb-1">Investment Limit</span>
                                                    <span className="text-[#C5A880] font-bold">₹{c.budget.toLocaleString()}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] text-gray-600 block mb-1">Review Status</span>
                                                    <span className="bg-[#C5A880]/10 text-[#C5A880] px-3 py-1 font-bold text-[9px] uppercase tracking-widest">{c.status}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-[10px] text-gray-600 uppercase tracking-widest block">Design Concept Brief</span>
                                                <p className="text-[#FAF9F6] text-xs font-light tracking-widest leading-relaxed">"{c.description}"</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;

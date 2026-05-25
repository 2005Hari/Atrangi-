import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { ChevronDown, ChevronUp, Clock, Truck, CheckCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const OrderManager = () => {
    const { addToast } = useToast();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await api.getAdminOrders();
            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch orders list:", error);
            addToast('error', 'Failed to retrieve platform acquisitions.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const updatedOrder = await api.updateOrderStatus(id, newStatus);
            setOrders(orders.map(o => o._id === id ? updatedOrder : o));
            addToast('success', `Acquisition status marked as ${newStatus}.`);
        } catch (error) {
            console.error("Failed to update status:", error);
            addToast('error', 'Fulfillment status update failed.');
        }
    };

    const toggleExpand = (id) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Processing': return 'border-amber-900/30 text-amber-300 bg-amber-950/20';
            case 'Shipped': return 'border-cyan-900/30 text-cyan-300 bg-cyan-950/20';
            case 'Delivered': return 'border-emerald-900/30 text-emerald-300 bg-emerald-950/20';
            case 'Cancelled': return 'border-red-900/30 text-red-300 bg-red-950/20';
            default: return 'border-white/5 text-gray-400 bg-white/[0.01]';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="w-6 h-6 border-2 border-t-transparent border-[#C5A880] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="border-b border-white/5 pb-8">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">Executive Portal</span>
                <h1 className="text-3xl md:text-5xl font-display font-light text-[#FAF9F6]">Order Acquisitions</h1>
                <p className="text-xs text-gray-500 tracking-wider mt-2">Oversee client purchases, dispatch configurations, and fulfillment tracking milestones.</p>
            </div>

            {orders.length === 0 ? (
                <div className="bg-[#090909] border border-white/5 p-16 text-center text-xs text-gray-500 tracking-wider">
                    No orders have been recorded in the platform registry.
                </div>
            ) : (
                /* Elegant Order Table */
                <div className="border border-white/5 overflow-hidden bg-[#090909]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#080808] border-b border-white/5 text-[9px] uppercase tracking-widest text-gray-400 font-semibold">
                                <th className="py-4 px-6">Acquisition ID</th>
                                <th className="py-4 px-6">Client Name</th>
                                <th className="py-4 px-6">Transaction Date</th>
                                <th className="py-4 px-6">Total Value</th>
                                <th className="py-4 px-6">Milestone</th>
                                <th className="py-4 px-6 text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-light text-gray-300">
                            {orders.map((order) => (
                                <React.Fragment key={order._id}>
                                    <tr 
                                        className="hover:bg-white/[0.01] transition-colors cursor-pointer border-b border-white/5 last:border-0" 
                                        onClick={() => toggleExpand(order._id)}
                                    >
                                        <td className="py-5 px-6 font-mono text-xs text-[#FAF9F6] font-normal">
                                            #{String(order._id).slice(-6).toUpperCase()}
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="font-normal text-[#FAF9F6]">
                                                {order.shippingDetails?.firstName} {order.shippingDetails?.lastName}
                                            </div>
                                            <div className="text-[10px] text-gray-500 tracking-wide select-all mt-0.5">
                                                {order.shippingDetails?.email}
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 text-gray-400">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-5 px-6 text-[#C5A880] font-normal tracking-wide">
                                            ₹{order.total?.toLocaleString()}
                                        </td>
                                        <td className="py-5 px-6">
                                            <span className={`text-[9px] uppercase tracking-widest border px-2.5 py-0.5 font-semibold ${getStatusStyle(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6 text-right">
                                            {expandedOrder === order._id ? (
                                                <ChevronUp size={16} className="text-[#C5A880] inline" />
                                            ) : (
                                                <ChevronDown size={16} className="text-gray-500 inline" />
                                            )}
                                        </td>
                                    </tr>

                                    {/* Expanded Detail Panel */}
                                    {expandedOrder === order._id && (
                                        <tr className="bg-[#0B0B0B] border-b border-white/5">
                                            <td colSpan="6" className="p-8">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                    
                                                    {/* Items List */}
                                                    <div className="space-y-4">
                                                        <h4 className="text-[9px] uppercase tracking-widest text-[#C5A880] font-bold">Acquired Canvases</h4>
                                                        <div className="space-y-3">
                                                            {order.items?.map((item, idx) => (
                                                                <div key={idx} className="flex items-center space-x-3 text-xs font-light">
                                                                    <div className="w-10 h-10 bg-neutral-900 overflow-hidden border border-white/5">
                                                                        <img src={item.image || item.imageUrl} alt={item.title} className="w-full h-full object-cover grayscale" />
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-normal text-[#FAF9F6]">{item.title}</div>
                                                                        <div className="text-[10px] text-gray-500 tracking-wider">
                                                                            Qty: {item.quantity} • ₹{item.price?.toLocaleString()}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Client Logistics */}
                                                    <div className="space-y-4">
                                                        <h4 className="text-[9px] uppercase tracking-widest text-[#C5A880] font-bold">Delivery Logistics</h4>
                                                        <div className="text-[11px] text-gray-400 space-y-1.5 leading-relaxed tracking-wider">
                                                            <p className="text-[#FAF9F6] font-normal">{order.shippingDetails?.firstName} {order.shippingDetails?.lastName}</p>
                                                            <p>{order.shippingDetails?.address}</p>
                                                            <p>{order.shippingDetails?.city}, {order.shippingDetails?.state} {order.shippingDetails?.zip}</p>
                                                            <p>Phone: {order.shippingDetails?.phone}</p>
                                                            <p className="pt-2 text-[10px] text-gray-500 uppercase tracking-widest">
                                                                Gateway: <span className="text-gray-300 font-medium">{order.shippingDetails?.paymentMethod || 'Secure Card'}</span>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Fulfillment Milestones */}
                                                    <div className="space-y-4">
                                                        <h4 className="text-[9px] uppercase tracking-widest text-[#C5A880] font-bold">Fulfillment Status</h4>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                                                                <button
                                                                    key={status}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleStatusUpdate(order._id, status);
                                                                    }}
                                                                    disabled={order.status === status}
                                                                    className={`px-4 py-2.5 text-[9px] uppercase tracking-widest font-semibold border transition-all ${
                                                                        order.status === status
                                                                            ? 'bg-[#C5A880] text-[#0D0D0D] border-[#C5A880]'
                                                                            : 'bg-[#0D0D0D] text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
                                                                    }`}
                                                                >
                                                                    {status}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderManager;

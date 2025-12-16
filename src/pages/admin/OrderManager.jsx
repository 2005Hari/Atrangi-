import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Package, Truck, CheckCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const OrderManager = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await api.getAdminOrders();
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const updatedOrder = await api.updateOrderStatus(id, newStatus);
            setOrders(orders.map(o => o._id === id ? updatedOrder : o));
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const toggleExpand = (id) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Processing': return 'bg-yellow-100 text-yellow-800';
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) return <div className="p-8 text-center">Loading orders...</div>;

    return (
        <div>
            <h1 className="text-3xl font-display font-bold text-charcoal mb-8">Order Management</h1>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 font-medium text-gray-500">Order ID</th>
                                <th className="p-4 font-medium text-gray-500">Customer</th>
                                <th className="p-4 font-medium text-gray-500">Date</th>
                                <th className="p-4 font-medium text-gray-500">Total</th>
                                <th className="p-4 font-medium text-gray-500">Status</th>
                                <th className="p-4 font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <React.Fragment key={order._id}>
                                    <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleExpand(order._id)}>
                                        <td className="p-4 font-mono text-sm text-charcoal">#{order._id.slice(-6).toUpperCase()}</td>
                                        <td className="p-4 text-charcoal">
                                            <div className="font-medium">{order.shippingDetails?.firstName} {order.shippingDetails?.lastName}</div>
                                            <div className="text-xs text-gray-400">{order.shippingDetails?.email}</div>
                                        </td>
                                        <td className="p-4 text-gray-600 text-sm">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 font-medium text-charcoal">₹{order.total.toLocaleString()}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {expandedOrder === order._id ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                                        </td>
                                    </tr>
                                    {expandedOrder === order._id && (
                                        <tr className="bg-gray-50">
                                            <td colSpan="6" className="p-6">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                    <div>
                                                        <h4 className="font-bold text-charcoal mb-3">Items</h4>
                                                        <div className="space-y-3">
                                                            {order.items.map((item, idx) => (
                                                                <div key={idx} className="flex items-center space-x-3">
                                                                    <img src={item.image} alt={item.title} className="w-10 h-10 rounded object-cover" />
                                                                    <div>
                                                                        <div className="text-sm font-medium text-charcoal">{item.title}</div>
                                                                        <div className="text-xs text-gray-500">Qty: {item.quantity} x ₹{item.price}</div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-charcoal mb-3">Shipping Address</h4>
                                                        <div className="text-sm text-gray-600 space-y-1">
                                                            <p>{order.shippingDetails?.address}</p>
                                                            <p>{order.shippingDetails?.city}, {order.shippingDetails?.state} {order.shippingDetails?.zip}</p>
                                                            <p>Phone: {order.shippingDetails?.phone}</p>
                                                        </div>
                                                        <div className="mt-4">
                                                            <h4 className="font-bold text-charcoal mb-2">Payment</h4>
                                                            <p className="text-sm text-gray-600 capitalize">{order.shippingDetails?.paymentMethod}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-charcoal mb-3">Update Status</h4>
                                                        <div className="flex flex-col space-y-2">
                                                            {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                                                                <button
                                                                    key={status}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleStatusUpdate(order._id, status);
                                                                    }}
                                                                    disabled={order.status === status}
                                                                    className={`px-4 py-2 text-sm rounded border ${order.status === status
                                                                        ? 'bg-charcoal text-white border-charcoal'
                                                                        : 'bg-white text-gray-600 border-gray-300 hover:border-charcoal'
                                                                        }`}
                                                                >
                                                                    Mark as {status}
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
                {orders.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        No orders found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderManager;

import React from 'react';
import { useStore } from '../store/useStore';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderTrackingPage = () => {
    const { user } = useStore();
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                try {
                    const data = await import('../services/api').then(m => m.api.getMyOrders());
                    setOrders(data);
                } catch (error) {
                    console.error("Failed to fetch orders:", error);
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
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-cream">
                <h2 className="text-2xl font-serif text-charcoal mb-4">Please log in to view your orders</h2>
                <Link to="/login" className="text-deep-saffron hover:underline">Sign In</Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen pt-32 flex justify-center bg-cream">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deep-saffron"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-cream">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-display font-bold text-charcoal mb-12">Order Tracking</h1>

                {orders.length > 0 ? (
                    <div className="space-y-12">
                        {orders.map((order) => (
                            <div key={order._id || order.id} className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
                                <div className="flex flex-wrap justify-between items-start mb-8 border-b border-gray-100 pb-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-charcoal mb-1">Order #{order._id || order.id}</h2>
                                        <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt || order.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-deep-saffron">₹{order.total.toLocaleString()}</p>
                                        <p className="text-sm text-gray-500">{order.items.length} Items</p>
                                    </div>
                                </div>

                                {/* Timeline (Simplified from mock data since backend doesn't fully support timeline updates yet, using status) */}
                                <div className="mb-8">
                                    <div className="flex items-center space-x-2 text-charcoal font-medium">
                                        <span className="text-gray-500">Status:</span>
                                        <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}>{order.status}</span>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="bg-gray-50 p-6 rounded-sm">
                                    <h3 className="font-bold text-charcoal mb-4">Items in Order</h3>
                                    <div className="space-y-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center space-x-4">
                                                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-sm" />
                                                <div>
                                                    <h4 className="font-medium text-charcoal">{item.title}</h4>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-sm border border-gray-100">
                        <Package size={48} className="text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                        <Link to="/collections" className="bg-charcoal text-white px-8 py-3 rounded-sm hover:bg-deep-saffron transition-colors">
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderTrackingPage;

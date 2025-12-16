import React from 'react';
import { useStore } from '../../store/useStore';
import { Package, Users, Palette, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</h3>
            <div className={`p-2 rounded-full ${color}`}>
                <Icon size={20} className="text-white" />
            </div>
        </div>
        <p className="text-3xl font-display font-bold text-charcoal">{value}</p>
    </div>
);

const AdminDashboard = () => {
    const { products, artists, commissions } = useStore();
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await import('../../services/api').then(m => m.api.getAdminOrders());
                setOrders(Array.isArray(data) ? data : []); // Ensure array
            } catch (error) {
                console.error("Failed to fetch admin orders:", error);
                setOrders([]); // Fallback to empty array
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Safe array access
    const safeProducts = Array.isArray(products) ? products : [];
    const totalProducts = safeProducts.length;
    const totalArtists = Array.isArray(artists) ? artists.length : 0;
    const totalOrders = Array.isArray(orders) ? orders.length : 0;
    const totalRevenue = Array.isArray(orders) ? orders.reduce((sum, o) => sum + (o.total || 0), 0) : 0;

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading dashboard data...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-display font-bold text-charcoal mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={DollarSign} color="bg-green-500" />
                <StatCard title="Total Orders" value={totalOrders} icon={Package} color="bg-blue-500" />
                <StatCard title="Total Products" value={totalProducts} icon={Palette} color="bg-purple-500" />
                <StatCard title="Active Artists" value={totalArtists} icon={Users} color="bg-orange-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders - Only show if orders exist (permission) */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-xl font-display font-bold text-charcoal mb-6">Recent Orders</h2>
                    {Array.isArray(orders) && orders.length > 0 ? (
                        <div className="space-y-4">
                            {orders.slice(0, 5).map((order) => (
                                <div key={order._id || order.id} className="flex justify-between items-center border-b border-gray-50 pb-4 last:border-0">
                                    <div>
                                        <p className="font-medium text-charcoal">Order #{order._id || order.id}</p>
                                        <p className="text-sm text-gray-500">{new Date(order.createdAt || order.date).toLocaleDateString()} • {order.items?.length || 0} items</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                        order.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                                            'bg-blue-100 text-blue-600'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">
                            {orders === null ? 'Access Restricted' : 'No orders yet.'}
                        </p>
                    )}
                </div>

                {/* Low Stock / Featured */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-xl font-display font-bold text-charcoal mb-6">Featured Products</h2>
                    <div className="space-y-4">
                        {safeProducts.filter(p => p.featured).slice(0, 5).map((product) => (
                            <div key={product.id} className="flex items-center space-x-4 border-b border-gray-50 pb-4 last:border-0">
                                <img src={product.image} alt={product.title} className="w-12 h-12 rounded object-cover" />
                                <div>
                                    <p className="font-medium text-charcoal">{product.title}</p>
                                    <p className="text-sm text-gray-500">₹{product.price.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

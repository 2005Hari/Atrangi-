import React from 'react';
import { useStore } from '../../store/useStore';
import { Package, Users, Palette, DollarSign, ArrowUpRight } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon }) => (
    <div className="bg-[#090909] border border-white/5 p-8 flex items-center justify-between group hover:border-[#C5A880]/30 transition-all duration-300">
        <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-widest text-gray-500 font-semibold block">{title}</span>
            <span className="text-3xl font-light text-[#FAF9F6] tracking-widest">{value}</span>
        </div>
        <Icon size={24} className="text-[#C5A880]" strokeWidth={1} />
    </div>
);

const AdminDashboard = () => {
    const { products, artists } = useStore();
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await import('../../services/api').then(m => m.api.getAdminOrders());
                setOrders(Array.isArray(data) ? data : []); 
            } catch (error) {
                console.error("Failed to fetch admin orders:", error);
                setOrders([]); 
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const safeProducts = Array.isArray(products) ? products : [];
    const totalProducts = safeProducts.length;
    const totalArtists = Array.isArray(artists) ? artists.length : 0;
    const totalOrders = Array.isArray(orders) ? orders.length : 0;
    const totalRevenue = Array.isArray(orders) ? orders.reduce((sum, o) => sum + (o.total || 0), 0) : 0;

    if (loading) {
        return (
            <div className="flex justify-center py-20 bg-[#0D0D0D]">
                <div className="w-6 h-6 border-2 border-t-transparent border-[#C5A880] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="border-b border-white/5 pb-8">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">Executive Portal</span>
                <h1 className="text-3xl md:text-5xl font-display font-light text-[#FAF9F6] mt-2">Platform Overview</h1>
                <p className="text-xs text-gray-500 tracking-wider mt-2">Administrative telemetry, curatorial stats, and global order acquisitions.</p>
            </div>

            {/* Analytics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard title="Gross Sales Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={DollarSign} />
                <StatCard title="Global Orders" value={totalOrders} icon={Package} />
                <StatCard title="Active Masterpieces" value={totalProducts} icon={Palette} />
                <StatCard title="Registered Artists" value={totalArtists} icon={Users} />
            </div>

            {/* Sub-boards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
                {/* Recent Acquisitions */}
                <div className="bg-[#090909] border border-white/5 p-8 space-y-6">
                    <h2 className="text-sm font-display uppercase tracking-widest text-[#FAF9F6] border-b border-white/5 pb-4">Recent Acquisitions</h2>
                    {Array.isArray(orders) && orders.length > 0 ? (
                        <div className="divide-y divide-white/5">
                            {orders.slice(0, 5).map((order) => (
                                <div key={order._id || order.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-xs font-light">
                                    <div>
                                        <p className="text-[#FAF9F6] font-medium tracking-wide">Acquisition #{String(order._id || order.id).slice(-6).toUpperCase()}</p>
                                        <p className="text-[10px] text-gray-500 mt-1 tracking-wider">
                                            {new Date(order.createdAt || order.date).toLocaleDateString()} • {order.items?.length || 0} canvases
                                        </p>
                                    </div>
                                    <span className={`text-[9px] uppercase tracking-widest border px-2.5 py-1 font-semibold ${
                                        order.status === 'Delivered' ? 'border-emerald-900/30 text-emerald-300 bg-emerald-950/20' :
                                        order.status === 'Cancelled' ? 'border-red-900/30 text-red-300 bg-red-950/20' :
                                        'border-amber-900/30 text-amber-300 bg-amber-950/20'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-xs tracking-wider">No recent acquisitions recorded on the ledger.</p>
                    )}
                </div>

                {/* Featured Masterpieces */}
                <div className="bg-[#090909] border border-white/5 p-8 space-y-6">
                    <h2 className="text-sm font-display uppercase tracking-widest text-[#FAF9F6] border-b border-white/5 pb-4">Curator's Spotlight</h2>
                    <div className="space-y-4">
                        {safeProducts.filter(p => p.featured).slice(0, 5).map((product) => (
                            <div key={product.id} className="flex items-center space-x-4 text-xs font-light">
                                <div className="w-12 h-12 bg-neutral-900 overflow-hidden relative border border-white/5">
                                    <img src={product.image || product.imageUrl} alt={product.title} className="w-full h-full object-cover grayscale" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-[#FAF9F6] tracking-wide">{product.title}</p>
                                    <p className="text-[10px] text-gray-500 tracking-wider mt-0.5">{product.artist}</p>
                                </div>
                                <span className="text-sm text-[#C5A880] tracking-wider">₹{product.price.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

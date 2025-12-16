import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { LayoutDashboard, Package, Users, Palette, LogOut, Home, Truck, UserCog } from 'lucide-react';

const AdminLayout = () => {
    const { user, logout } = useStore();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else if (!['admin', 'creative_head', 'content_team', 'marketing_em'].includes(user.role)) {
            // Regular users kicked out
            navigate('/');
        }
    }, [user, navigate]);

    if (!user || user.role === 'user') return null;

    // Role-based navigation config
    const allNavItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, roles: ['admin', 'creative_head', 'content_team', 'marketing_em'] },
        { name: 'Orders', path: '/admin/orders', icon: Truck, roles: ['admin'] },
        // Marketing can view ALL orders? No, usually separate. Requirement says "Marketing & EM: Read-only access to analytics" -> Dashboard covers analytics.
        // Orders is purely fulfillment. Admin only for now.
        { name: 'Products', path: '/admin/products', icon: Package, roles: ['admin', 'creative_head', 'marketing_em', 'content_team'] }, // Everyone touches products in some way
        { name: 'Artists', path: '/admin/artists', icon: Users, roles: ['admin', 'creative_head', 'content_team'] },
        { name: 'Commissions', path: '/admin/commissions', icon: Palette, roles: ['admin', 'marketing_em'] },
        { name: 'Users', path: '/admin/users', icon: UserCog, roles: ['admin'] },
    ];

    const allowedNavItems = allNavItems.filter(item => item.roles.includes(user.role));

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-charcoal text-white flex flex-col fixed h-full z-50">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-2xl font-display font-bold tracking-wider">
                        ATRANGI <span className="text-deep-saffron">ADMIN</span>
                    </h1>
                    <p className='text-xs text-gray-400 mt-2 uppercase tracking-widest'>{user.role.replace('_', ' ')}</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {allowedNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center space-x-3 px-4 py-3 rounded transition-colors ${isActive
                                    ? 'bg-deep-saffron text-white'
                                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-700 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                    >
                        <Home size={20} />
                        <span>View Site</span>
                    </Link>
                    <button
                        onClick={() => { logout(); navigate('/login'); }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;

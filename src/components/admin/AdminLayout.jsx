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
        } else if (user.role !== 'ADMIN') {
            // Non-admins booted to safety
            navigate('/');
        }
    }, [user, navigate]);

    if (!user || user.role !== 'ADMIN') return null;

    const navItems = [
        { name: 'Telemetry', path: '/admin', icon: LayoutDashboard },
        { name: 'Acquisitions', path: '/admin/orders', icon: Truck },
        { name: 'Curation', path: '/admin/artworks', icon: Package },
        { name: 'Artisans', path: '/admin/artists', icon: Users },
        { name: 'Commissions', path: '/admin/commissions', icon: Palette },
        { name: 'Members', path: '/admin/users', icon: UserCog },
    ];

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#FAF9F6] flex">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-[#090909] border-r border-white/5 flex flex-col fixed h-full z-50">
                <div className="p-8 border-b border-white/5">
                    <Link 
                        to="/" 
                        className="text-lg font-display font-bold tracking-[0.25em] text-[#FAF9F6] hover:text-[#C5A880] transition-colors"
                    >
                        ARTNESTIA
                    </Link>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#C5A880] mt-2 font-medium">ADMIN PORTAL</p>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center space-x-4 px-4 py-3 text-xs uppercase tracking-widest font-light transition-all ${
                                    isActive
                                        ? 'bg-[#C5A880] text-[#0D0D0D] font-semibold'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-[#FAF9F6]'
                                }`}
                            >
                                <Icon size={16} strokeWidth={isActive ? 2 : 1.2} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-white/5 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center space-x-4 px-4 py-3 text-xs uppercase tracking-widest font-light text-gray-400 hover:text-[#FAF9F6] hover:bg-white/5 transition-all"
                    >
                        <Home size={16} strokeWidth={1.2} />
                        <span>Public Site</span>
                    </Link>
                    <button
                        onClick={() => { logout(); navigate('/login'); }}
                        className="w-full flex items-center space-x-4 px-4 py-3 text-xs uppercase tracking-widest font-light text-red-400 hover:text-red-300 hover:bg-red-950/10 transition-all text-left"
                    >
                        <LogOut size={16} strokeWidth={1.2} />
                        <span>Terminate</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-12 overflow-y-auto bg-[#0D0D0D]">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;

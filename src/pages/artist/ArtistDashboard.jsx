import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { api } from '../../services/api';
import { DollarSign, Landmark, Image, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArtistDashboard = () => {
    const { user } = useStore();
    const [stats, setStats] = useState({
        totalSales: 0,
        listedCount: 0,
        activeCommissions: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtistStats = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const [productsData, commissionsData] = await Promise.all([
                    api.getProductsByArtist(user.name),
                    api.getMyCommissions() // Retrieve mock commissions for display
                ]);
                const productsList = productsData || [];
                const listed = productsList.length;
                const sold = productsList.filter(p => !p.inStock);
                const sales = sold.reduce((sum, p) => sum + p.price, 0);

                setStats({
                    totalSales: sales,
                    listedCount: listed,
                    activeCommissions: commissionsData.length
                });
            } catch (error) {
                console.error("Failed to load artist stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArtistStats();
    }, [user]);

    if (!user) return null;

    return (
        <div className="bg-[#0D0D0D] text-[#FAF9F6] min-h-screen pt-36 pb-24 px-8">
            <div className="max-w-6xl mx-auto space-y-12">
                
                {/* Header */}
                <div className="border-b border-white/5 pb-10 flex justify-between items-center">
                    <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">The Studio Hub</span>
                        <h1 className="text-3xl md:text-5xl font-display font-light text-[#FAF9F6]">Artist Dashboard</h1>
                        <p className="text-xs text-gray-500 tracking-wider">Welcome back, master artisan {user.name}.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-6 h-6 border-2 border-t-transparent border-[#C5A880] rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Analytical Metrics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-[#090909] border border-white/5 p-8 flex items-center justify-between">
                                <div className="space-y-2">
                                    <span className="text-[9px] uppercase tracking-widest text-gray-500 font-semibold block">Total Revenue</span>
                                    <span className="text-2xl font-light text-[#C5A880] tracking-widest">₹{stats.totalSales.toLocaleString()}</span>
                                </div>
                                <Landmark size={24} className="text-[#C5A880]" strokeWidth={1} />
                            </div>

                            <div className="bg-[#090909] border border-white/5 p-8 flex items-center justify-between">
                                <div className="space-y-2">
                                    <span className="text-[9px] uppercase tracking-widest text-gray-500 font-semibold block">Artworks Cataloged</span>
                                    <span className="text-2xl font-light text-[#FAF9F6] tracking-widest">{stats.listedCount}</span>
                                </div>
                                <Image size={24} className="text-[#C5A880]" strokeWidth={1} />
                            </div>

                            <div className="bg-[#090909] border border-white/5 p-8 flex items-center justify-between">
                                <div className="space-y-2">
                                    <span className="text-[9px] uppercase tracking-widest text-gray-500 font-semibold block">Active Briefs</span>
                                    <span className="text-2xl font-light text-[#FAF9F6] tracking-widest">{stats.activeCommissions}</span>
                                </div>
                                <FileText size={24} className="text-[#C5A880]" strokeWidth={1} />
                            </div>
                        </div>

                        {/* Navigation Links to studio sub-sections */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                            {[
                                { name: 'Manage Portfolio', path: '/artist/artworks', desc: 'Add new pieces, edit details, and modify pricing parameters.' },
                                { name: 'Acquisitions & Sales', path: '/artist/sales', desc: 'Track sold canvases, check payouts, and verify invoices.' },
                                { name: 'Commission Briefs', path: '/artist/commissions', desc: 'Review, accept, or update custom spatial commission briefs.' }
                            ].map((hub) => (
                                <Link
                                    key={hub.name}
                                    to={hub.path}
                                    className="bg-[#090909] border border-white/5 hover:border-[#C5A880]/30 p-8 space-y-4 flex flex-col justify-between transition-all duration-300 group"
                                >
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-display uppercase tracking-widest text-[#FAF9F6] group-hover:text-[#C5A880] transition-colors">{hub.name}</h3>
                                        <p className="text-[11px] text-gray-500 tracking-wider font-light leading-relaxed">{hub.desc}</p>
                                    </div>
                                    <span className="text-[9px] uppercase tracking-widest text-[#C5A880] inline-flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
                                        Open Board <ChevronRight size={10} />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtistDashboard;

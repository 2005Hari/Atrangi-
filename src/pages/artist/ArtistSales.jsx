import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { api } from '../../services/api';
import { Landmark, ArrowUpRight, DollarSign, Image } from 'lucide-react';

const ArtistSales = () => {
    const { user } = useStore();
    const [soldArtworks, setSoldArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalEarnings: 0,
        unitsSold: 0,
        pendingPayouts: 0
    });

    useEffect(() => {
        const fetchSalesData = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const artworksData = await api.getProductsByArtist(user.name);
                const sold = (artworksData || []).filter(art => !art.inStock);
                
                const earnings = sold.reduce((sum, art) => sum + art.price, 0);
                
                setSoldArtworks(sold);
                setStats({
                    totalEarnings: earnings,
                    unitsSold: sold.length,
                    pendingPayouts: Math.round(earnings * 0.1) // Assumed 10% commission/payout simulation
                });
            } catch (error) {
                console.error('Failed to load artist sales records:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSalesData();
    }, [user]);

    return (
        <div className="bg-[#0D0D0D] text-[#FAF9F6] min-h-screen pt-36 pb-24 px-8">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="border-b border-white/5 pb-8">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">Acquisitions Ledger</span>
                    <h1 className="text-3xl md:text-5xl font-display font-light text-[#FAF9F6]">Acquisitions &amp; Sales</h1>
                    <p className="text-xs text-gray-500 tracking-wider mt-2">Historical registry of acquired works and accrued studio revenue.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-6 h-6 border-2 border-t-transparent border-[#C5A880] rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Summary Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-[#090909] border border-white/5 p-8 flex items-center justify-between">
                                <div className="space-y-1">
                                    <span className="text-[9px] uppercase tracking-widest text-gray-500 font-semibold block">Accrued Studio Value</span>
                                    <span className="text-2xl font-light text-[#C5A880] tracking-widest">₹{stats.totalEarnings.toLocaleString()}</span>
                                </div>
                                <Landmark size={22} className="text-[#C5A880]" strokeWidth={1} />
                            </div>

                            <div className="bg-[#090909] border border-white/5 p-8 flex items-center justify-between">
                                <div className="space-y-1">
                                    <span className="text-[9px] uppercase tracking-widest text-gray-500 font-semibold block">Canvases Acquired</span>
                                    <span className="text-2xl font-light text-[#FAF9F6] tracking-widest">{stats.unitsSold}</span>
                                </div>
                                <Image size={22} className="text-[#C5A880]" strokeWidth={1} />
                            </div>

                            <div className="bg-[#090909] border border-white/5 p-8 flex items-center justify-between">
                                <div className="space-y-1">
                                    <span className="text-[9px] uppercase tracking-widest text-gray-500 font-semibold block">Secured Payouts</span>
                                    <span className="text-2xl font-light text-[#FAF9F6] tracking-widest">₹{(stats.totalEarnings - stats.pendingPayouts).toLocaleString()}</span>
                                </div>
                                <DollarSign size={22} className="text-[#C5A880]" strokeWidth={1} />
                            </div>
                        </div>

                        {/* Sold Ledger Table */}
                        <div className="space-y-6">
                            <h3 className="text-xs uppercase tracking-[0.25em] text-[#FAF9F6]/80 font-medium">Acquisitions Ledger</h3>
                            
                            {soldArtworks.length === 0 ? (
                                <div className="bg-[#090909] border border-white/5 p-16 text-center text-xs text-gray-500 tracking-wider">
                                    No acquisitions have been executed yet. Your masterpiece listings remain active.
                                </div>
                            ) : (
                                <div className="border border-white/5 overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-[#080808] border-b border-white/5 text-[9px] uppercase tracking-widest text-gray-400 font-semibold">
                                                <th className="py-4 px-6">Masterpiece</th>
                                                <th className="py-4 px-6">Medium / dimensions</th>
                                                <th className="py-4 px-6">Category</th>
                                                <th className="py-4 px-6 text-right">Value (INR)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5 text-xs font-light text-gray-300">
                                            {soldArtworks.map((art) => (
                                                <tr key={art.id} className="hover:bg-white/[0.01] transition-colors">
                                                    <td className="py-5 px-6 flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-neutral-900 overflow-hidden relative">
                                                            <img
                                                                src={art.imageUrl}
                                                                alt={art.title}
                                                                className="w-full h-full object-cover grayscale"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-display text-[#FAF9F6] tracking-wide font-normal">{art.title}</div>
                                                            <div className="text-[10px] text-gray-500 tracking-wider mt-0.5">Acquired</div>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 px-6">
                                                        <div>{art.medium}</div>
                                                        <div className="text-[10px] text-gray-500 mt-0.5">{art.dimensions}</div>
                                                    </td>
                                                    <td className="py-5 px-6">
                                                        <span className="text-[10px] uppercase tracking-widest text-[#C5A880]/80">{art.category}</span>
                                                    </td>
                                                    <td className="py-5 px-6 text-right font-normal text-[#FAF9F6] tracking-wider">
                                                        ₹{art.price.toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtistSales;

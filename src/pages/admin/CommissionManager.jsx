import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Mail, Calendar, DollarSign, Check, X, ShieldAlert } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const CommissionManager = () => {
    const { addToast } = useToast();
    const [commissions, setCommissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCommissions = async () => {
        setLoading(true);
        try {
            const data = await api.getAdminCommissions();
            setCommissions(data || []);
        } catch (error) {
            console.error("Failed to load commissions:", error);
            addToast('error', 'Failed to retrieve global commission briefs.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCommissions();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        try {
            await api.updateCommissionStatus(id, status);
            addToast('success', `Commission request marked as ${status}.`);
            fetchCommissions();
        } catch (error) {
            console.error("Failed to update status:", error);
            addToast('error', 'Failed to modify commission status.');
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Pending': return 'border-amber-900/30 text-amber-300 bg-amber-950/20';
            case 'Accepted':
            case 'Approved': return 'border-emerald-900/30 text-emerald-300 bg-emerald-950/20';
            case 'Rejected':
            case 'Declined': return 'border-red-900/30 text-red-300 bg-red-950/20';
            case 'In Progress': return 'border-cyan-900/30 text-cyan-300 bg-cyan-950/20';
            case 'Completed': return 'border-white/10 text-white bg-white/5';
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
                <h1 className="text-3xl md:text-5xl font-display font-light text-[#FAF9F6]">Bespoke Commissions</h1>
                <p className="text-xs text-gray-500 tracking-wider mt-2">Oversee global commission request briefs, designated budgets, and milestone execution pipelines.</p>
            </div>

            {commissions.length === 0 ? (
                <div className="bg-[#090909] border border-white/5 p-16 text-center text-xs text-gray-500 tracking-wider">
                    No custom commission requests have been submitted yet.
                </div>
            ) : (
                <div className="space-y-6">
                    {commissions.map((c) => (
                        <div key={c._id} className="bg-[#090909] border border-white/5 p-8 flex flex-col md:flex-row justify-between gap-6">
                            <div className="space-y-4 max-w-3xl flex-1">
                                <div className="flex flex-wrap items-center gap-4">
                                    <span className={`text-[9px] uppercase tracking-widest border px-3 py-1 font-semibold ${getStatusStyle(c.status)}`}>
                                        {c.status}
                                    </span>
                                    <span className="text-[10px] text-gray-500 tracking-wider">
                                        Client Reference: <span className="text-gray-300 font-light select-all">{c.userId}</span>
                                    </span>
                                </div>
                                
                                <div className="space-y-2">
                                    <h3 className="font-display text-lg font-light text-[#FAF9F6]">Concept Narrative</h3>
                                    <p className="text-xs text-gray-400 font-light leading-relaxed italic">"{c.description}"</p>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/5 pt-4 text-xs font-light tracking-widest">
                                    <div>
                                        <span className="text-gray-600 block text-[9px] uppercase">Aesthetic Style</span>
                                        <span className="text-[#C5A880] uppercase font-medium">{c.style || 'Bespoke'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 block text-[9px] uppercase">Allocated Budget</span>
                                        <span className="text-[#FAF9F6] font-medium">₹{c.budget?.toLocaleString() || 'Flexible'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 block text-[9px] uppercase">Scale / Dimensions</span>
                                        <span className="text-gray-400 font-medium">{c.dimensions || 'Bespoke Scale'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 block text-[9px] uppercase">Design Window</span>
                                        <span className="text-gray-400 font-medium">{c.timeline || 'Flexible'}</span>
                                    </div>
                                </div>

                                {c.customNotes && (
                                    <div className="bg-[#0D0D0D] p-4 border border-white/5 text-[11px] text-gray-500 font-light">
                                        <strong className="text-gray-400 font-semibold block mb-1">Additional Client Notes:</strong>
                                        {c.customNotes}
                                    </div>
                                )}

                                {c.referenceUrl && (
                                    <div className="pt-2">
                                        <a 
                                            href={c.referenceUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-[10px] uppercase tracking-widest text-[#C5A880] hover:text-[#FAF9F6] underline underline-offset-4"
                                        >
                                            View Reference Imagery
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Status Control Actions */}
                            <div className="flex md:flex-col justify-end gap-3 md:w-48 self-start pt-2 border-t md:border-t-0 md:border-l border-white/5 md:pl-6">
                                {c.status === 'Pending' && (
                                    <>
                                        <button
                                            onClick={() => handleUpdateStatus(c._id, 'Accepted')}
                                            className="w-full bg-[#C5A880] hover:bg-[#FAF9F6] text-[#0D0D0D] text-[10px] tracking-widest uppercase py-3 font-semibold transition-all flex items-center justify-center gap-1.5"
                                        >
                                            <Check size={12} /> Approve Brief
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(c._id, 'Rejected')}
                                            className="w-full border border-white/10 hover:border-red-950/20 hover:bg-red-950/10 text-gray-400 hover:text-red-300 text-[10px] tracking-widest uppercase py-3 font-semibold transition-all flex items-center justify-center gap-1.5"
                                        >
                                            <X size={12} /> Dismiss Brief
                                        </button>
                                    </>
                                )}
                                
                                {c.status === 'Accepted' && (
                                    <button
                                        onClick={() => handleUpdateStatus(c._id, 'In Progress')}
                                        className="w-full bg-[#151515] hover:bg-[#C5A880] text-gray-300 hover:text-[#0D0D0D] text-[10px] tracking-widest uppercase py-3 font-semibold border border-white/5 transition-all"
                                    >
                                        Mark In Progress
                                    </button>
                                )}

                                {c.status === 'In Progress' && (
                                    <button
                                        onClick={() => handleUpdateStatus(c._id, 'Completed')}
                                        className="w-full bg-[#C5A880] hover:bg-[#FAF9F6] text-[#0D0D0D] text-[10px] tracking-widest uppercase py-3 font-semibold transition-all"
                                    >
                                        Mark Completed
                                    </button>
                                )}

                                {['Completed', 'Rejected'].includes(c.status) && (
                                    <div className="w-full text-center text-[10px] text-gray-500 uppercase tracking-widest py-3">
                                        Brief Closed
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommissionManager;

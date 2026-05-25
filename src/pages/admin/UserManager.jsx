import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Shield, Mail, User, Check } from 'lucide-react';

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await api.getUsers();
            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            addToast('error', 'Failed to retrieve platform members.');
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await api.updateUserRole(userId, newRole);
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
            addToast('success', `User role upgraded to ${newRole}.`);
        } catch (error) {
            console.error("Failed to update role:", error);
            addToast('error', 'Failed to modify role permissions.');
        }
    };

    const getRoleStyle = (role) => {
        switch (role) {
            case 'ADMIN': return 'border-red-900/30 text-red-300 bg-red-950/20';
            case 'ARTIST': return 'border-cyan-900/30 text-cyan-300 bg-cyan-950/20';
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
            <div className="border-b border-white/5 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">Executive Portal</span>
                    <h1 className="text-3xl md:text-5xl font-display font-light text-[#FAF9F6]">Manage Members</h1>
                    <p className="text-xs text-gray-500 tracking-wider">Configure client privileges, artist credentials, and database roles.</p>
                </div>
                <div className="bg-[#FAF9F6]/5 text-[#C5A880] border border-[#C5A880]/20 px-4 py-2 text-xs uppercase tracking-widest flex items-center font-semibold">
                    <Shield className="w-4 h-4 mr-2" />
                    Secure Access Control Area
                </div>
            </div>

            {users.length === 0 ? (
                <div className="bg-[#090909] border border-white/5 p-16 text-center text-xs text-gray-500 tracking-wider">
                    No platform members found in database registry.
                </div>
            ) : (
                /* Elegant Users Table */
                <div className="border border-white/5 overflow-hidden bg-[#090909]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#080808] border-b border-white/5 text-[9px] uppercase tracking-widest text-gray-400 font-semibold">
                                <th className="py-4 px-6">Member Profile</th>
                                <th className="py-4 px-6">Email Address</th>
                                <th className="py-4 px-6">Platform Privilege</th>
                                <th className="py-4 px-6 text-right">Configure Role</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-xs font-light text-gray-300">
                            {users.map((u) => (
                                <tr key={u._id} className="hover:bg-white/[0.01] transition-colors">
                                    <td className="py-4 px-6 flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 font-semibold overflow-hidden border border-white/5">
                                            {u.avatar ? <img src={u.avatar} className="w-full h-full object-cover" /> : (u.name?.[0]?.toUpperCase() || 'U')}
                                        </div>
                                        <div>
                                            <div className="text-sm font-display text-[#FAF9F6] tracking-wide font-normal">{u.name || 'Anonymous'}</div>
                                            <div className="text-[9px] text-gray-500 mt-0.5 tracking-wider select-all">UID: {u._id}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-2 text-gray-400">
                                            <Mail size={12} />
                                            <span>{u.email}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`text-[9px] uppercase tracking-widest border px-2.5 py-0.5 font-semibold ${getRoleStyle(u.role)}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <select
                                            value={u.role}
                                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                            className="bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-3 py-2 text-[#FAF9F6] outline-none transition-colors"
                                            disabled={u.email === 'admin@artnestia.com' || u.email === 'admin@atrangi.com'} // Protect primary administrative seed accounts
                                        >
                                            <option value="USER">User (Standard Client)</option>
                                            <option value="ARTIST">Artist (Artisan Creator)</option>
                                            <option value="ADMIN">Admin (Executive Director)</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserManager;

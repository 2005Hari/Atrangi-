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
            setUsers(data);
        } catch (error) {
            console.error(error);
            addToast('Failed to load users', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await api.updateUserRole(userId, newRole);
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
            addToast('Role updated successfully');
        } catch (error) {
            addToast('Failed to update role', 'error');
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin': return 'bg-red-100 text-red-700 border-red-200';
            case 'creative_head': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'content_team': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'marketing_em': return 'bg-orange-100 text-orange-700 border-orange-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading users...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-display font-bold text-charcoal">User Management</h1>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Secure Access Control Area
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-medium text-gray-500">User</th>
                            <th className="p-4 font-medium text-gray-500">Email</th>
                            <th className="p-4 font-medium text-gray-500">Current Role</th>
                            <th className="p-4 font-medium text-gray-500">Change Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                <td className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold overflow-hidden">
                                            {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : (user.name?.[0] || 'U')}
                                        </div>
                                        <span className="font-medium text-charcoal">{user.name || 'Unknown'}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <Mail size={14} />
                                        <span>{user.email}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="bg-white border border-gray-200 text-gray-700 text-sm rounded px-2 py-1 focus:outline-none focus:border-deep-saffron focus:ring-1 focus:ring-deep-saffron"
                                        disabled={user.email === 'admin@atrangi.com'} // Prevent blocking super admin
                                    >
                                        <option value="user">User</option>
                                        <option value="content_team">Content Team</option>
                                        <option value="marketing_em">Marketing & EM</option>
                                        <option value="creative_head">Creative Head</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManager;

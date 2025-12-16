import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, Palette } from 'lucide-react';

const ProfilePage = () => {
    const { user, logout } = useStore();
    const { addToast } = useToast();
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        logout();
        addToast('Logged out successfully');
        navigate('/');
    };

    const [isEditing, setIsEditing] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: user?.name || '',
        email: user?.email || '',
        avatar: user?.avatar || ''
    });
    const { updateUser } = useStore();

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await import('../services/api').then(m => m.api.updateProfile(formData));
            updateUser(updatedUser);
            addToast('Profile updated successfully');
            setIsEditing(false);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-cream pt-24 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 md:p-12 shadow-xl rounded-sm mb-12"
                >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-32 h-32 rounded-full object-cover border-4 border-cream"
                        />
                        <div className="flex-1 text-center md:text-left w-full">
                            {isEditing ? (
                                <form onSubmit={handleUpdate} className="space-y-4 max-w-md">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-deep-saffron"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-deep-saffron"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
                                        <input
                                            type="text"
                                            value={formData.avatar}
                                            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-deep-saffron"
                                        />
                                    </div>
                                    <div className="flex space-x-4 pt-2">
                                        <button
                                            type="submit"
                                            className="bg-deep-saffron text-white px-6 py-2 rounded-sm hover:bg-opacity-90 transition-colors"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="text-gray-500 hover:text-charcoal transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                        <div>
                                            <h1 className="text-4xl font-display text-charcoal mb-2">{user.name}</h1>
                                            <p className="text-gray-500 mb-6">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="text-deep-saffron hover:text-charcoal transition-colors font-medium mb-4 md:mb-0"
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors mx-auto md:mx-0"
                                    >
                                        <LogOut size={18} />
                                        <span>Sign Out</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Addresses Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-8 shadow-lg rounded-sm mb-12"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-display text-charcoal">Saved Addresses</h2>
                        <button
                            onClick={() => {
                                const newAddress = prompt("Enter full address (e.g., '123 Main St, Mumbai, 400001, India')");
                                if (newAddress) {
                                    const updatedAddresses = [...(user.addresses || []), newAddress];
                                    import('../services/api').then(m => m.api.updateProfile({ addresses: updatedAddresses })
                                        .then(updatedUser => {
                                            updateUser(updatedUser);
                                            addToast('Address added');
                                        })
                                        .catch(err => alert(err.message))
                                    );
                                }
                            }}
                            className="text-deep-saffron hover:text-charcoal transition-colors text-sm font-medium"
                        >
                            + Add New
                        </button>
                    </div>
                    {user.addresses && user.addresses.length > 0 ? (
                        <div className="space-y-4">
                            {user.addresses.map((addr, idx) => (
                                <div key={idx} className="flex justify-between items-center border border-gray-100 p-4 rounded-sm">
                                    <p className="text-gray-600 text-sm">{addr}</p>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Delete this address?')) {
                                                const updatedAddresses = user.addresses.filter((_, i) => i !== idx);
                                                import('../services/api').then(m => m.api.updateProfile({ addresses: updatedAddresses })
                                                    .then(updatedUser => {
                                                        updateUser(updatedUser);
                                                        addToast('Address removed');
                                                    })
                                                    .catch(err => alert(err.message))
                                                );
                                            }
                                        }}
                                        className="text-red-500 hover:text-red-700 text-xs"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 italic text-sm">No saved addresses.</p>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Order History */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 shadow-lg rounded-sm"
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <Package className="text-deep-saffron" size={24} />
                            <h2 className="text-2xl font-display text-charcoal">Order History</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="border-b border-gray-100 pb-4">
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium text-charcoal">Order #4923</span>
                                    <span className="text-green-600 text-sm">Delivered</span>
                                </div>
                                <p className="text-gray-500 text-sm">2 items • ₹12,500</p>
                            </div>
                            <div className="border-b border-gray-100 pb-4">
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium text-charcoal">Order #4801</span>
                                    <span className="text-green-600 text-sm">Delivered</span>
                                </div>
                                <p className="text-gray-500 text-sm">1 item • ₹8,000</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Commissions */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-8 shadow-lg rounded-sm"
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <Palette className="text-deep-saffron" size={24} />
                            <h2 className="text-2xl font-display text-charcoal">My Commissions</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="border-b border-gray-100 pb-4">
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium text-charcoal">Abstract Portrait</span>
                                    <span className="text-orange-500 text-sm">In Progress</span>
                                </div>
                                <p className="text-gray-500 text-sm">Artist: Aarav Patel</p>
                            </div>
                            <div className="p-4 bg-cream/50 rounded text-center text-gray-500 text-sm">
                                Want something unique? <a href="/commission" className="text-deep-saffron hover:underline">Request a commission</a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

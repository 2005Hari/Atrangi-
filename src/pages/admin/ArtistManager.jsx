import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';

const ArtistManager = () => {
    const { artists, addArtist, updateArtist, deleteArtist } = useStore();
    const [isEditing, setIsEditing] = useState(false);
    const [currentArtist, setCurrentArtist] = useState(null);

    const initialFormState = {
        name: '',
        expertise: '',
        university: '',
        image: '',
        bio: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleEdit = (artist) => {
        setCurrentArtist(artist);
        setFormData(artist);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setCurrentArtist(null);
        setFormData(initialFormState);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this artist?')) {
            deleteArtist(id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const artistData = {
            ...formData,
            id: currentArtist ? currentArtist.id : Date.now()
        };

        if (currentArtist) {
            updateArtist(artistData);
        } else {
            addArtist(artistData);
        }
        setIsEditing(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-display font-bold text-charcoal">Artist Manager</h1>
                <button
                    onClick={handleAddNew}
                    className="bg-deep-saffron text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-orange-600 transition-colors"
                >
                    <Plus size={20} />
                    <span>Add Artist</span>
                </button>
            </div>

            {/* Artist List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-medium text-gray-500">Image</th>
                            <th className="p-4 font-medium text-gray-500">Name</th>
                            <th className="p-4 font-medium text-gray-500">Expertise</th>
                            <th className="p-4 font-medium text-gray-500">University</th>
                            <th className="p-4 font-medium text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {artists.map(artist => (
                            <tr key={artist.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                <td className="p-4">
                                    <img src={artist.image} alt={artist.name} className="w-12 h-12 rounded-full object-cover" />
                                </td>
                                <td className="p-4 font-medium text-charcoal">{artist.name}</td>
                                <td className="p-4 text-gray-600">{artist.expertise}</td>
                                <td className="p-4 text-gray-600">{artist.university}</td>
                                <td className="p-4 text-right space-x-2">
                                    <button
                                        onClick={() => handleEdit(artist)}
                                        className="text-blue-500 hover:text-blue-700 p-1"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(artist.id)}
                                        className="text-red-500 hover:text-red-700 p-1"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit/Add Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-charcoal">
                                {currentArtist ? 'Edit Artist' : 'Add New Artist'}
                            </h2>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-deep-saffron"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expertise</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.expertise}
                                        onChange={e => setFormData({ ...formData, expertise: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-deep-saffron"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.university}
                                    onChange={e => setFormData({ ...formData, university: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-deep-saffron"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    required
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-deep-saffron"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea
                                    rows="4"
                                    value={formData.bio}
                                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-deep-saffron"
                                ></textarea>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-deep-saffron text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors flex items-center space-x-2"
                                >
                                    <Save size={18} />
                                    <span>Save Artist</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArtistManager;

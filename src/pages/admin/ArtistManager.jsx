import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const ArtistManager = () => {
    const { addToast } = useToast();
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentArtist, setCurrentArtist] = useState(null);

    const initialFormState = {
        name: '',
        expertise: 'Painting',
        university: 'Royal College of Art',
        image: '',
        bio: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    const fetchArtists = async () => {
        setLoading(true);
        try {
            const data = await api.getArtists();
            setArtists(data || []);
        } catch (error) {
            console.error("Failed to load artists registry:", error);
            addToast('error', 'Failed to retrieve artists roster.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArtists();
    }, []);

    const handleEdit = (artist) => {
        setCurrentArtist(artist);
        setFormData({
            name: artist.name || '',
            expertise: artist.expertise || 'Painting',
            university: artist.university || 'Royal College of Art',
            image: artist.image || '',
            bio: artist.bio || ''
        });
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setCurrentArtist(null);
        setFormData(initialFormState);
        setIsEditing(true);
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you certain you wish to remove the registry for ${name}?`)) {
            try {
                await api.deleteArtist(id);
                addToast('success', 'Artisan registry permanently deleted.');
                fetchArtists();
            } catch (error) {
                console.error("Failed to remove artist:", error);
                addToast('error', 'Failed to remove artist registry.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentArtist) {
                await api.updateArtist(currentArtist.id, formData);
                addToast('success', 'Artisan profile registry updated.');
            } else {
                await api.createArtist(formData);
                addToast('success', 'Artisan enrolled in studio database.');
            }
            setIsEditing(false);
            fetchArtists();
        } catch (error) {
            console.error("Failed to register artist details:", error);
            addToast('error', 'Failed to save artisan details.');
        }
    };

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="border-b border-white/5 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">Executive Portal</span>
                    <h1 className="text-3xl md:text-5xl font-display font-light text-[#FAF9F6]">Artisans Roster</h1>
                    <p className="text-xs text-gray-500 tracking-wider">Moderate and register platform artists, academies, and professional biographies.</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="bg-[#C5A880] text-[#0D0D0D] hover:bg-[#FAF9F6] text-xs uppercase tracking-widest px-6 py-3 flex items-center gap-2 transition-all font-semibold self-start md:self-auto"
                >
                    <Plus size={14} /> Enroll New Artisan
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-6 h-6 border-2 border-t-transparent border-[#C5A880] rounded-full animate-spin"></div>
                </div>
            ) : artists.length === 0 ? (
                <div className="bg-[#090909] border border-white/5 p-16 text-center text-xs text-gray-500 tracking-wider">
                    No artisans are currently registered in the database.
                </div>
            ) : (
                /* Elegant Artisans Table */
                <div className="border border-white/5 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#080808] border-b border-white/5 text-[9px] uppercase tracking-widest text-gray-400 font-semibold">
                                <th className="py-4 px-6">Artisan</th>
                                <th className="py-4 px-6">Expertise / Class</th>
                                <th className="py-4 px-6">Academy Affiliation</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-xs font-light text-gray-300">
                            {artists.map((artist) => (
                                <tr key={artist.id} className="hover:bg-white/[0.01] transition-colors">
                                    <td className="py-4 px-6 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-neutral-900 overflow-hidden rounded-full relative border border-white/5">
                                            <img
                                                src={artist.image}
                                                alt={artist.name}
                                                className="w-full h-full object-cover grayscale"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-sm font-display text-[#FAF9F6] tracking-wide font-normal">{artist.name}</div>
                                            <div className="text-[10px] text-gray-500 mt-0.5 select-all">ID: {artist.id}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-400">
                                        <span className="text-[10px] uppercase tracking-widest text-[#C5A880]/80">{artist.expertise}</span>
                                    </td>
                                    <td className="py-4 px-6 text-gray-400 font-normal tracking-wide">
                                        {artist.university}
                                    </td>
                                    <td className="py-4 px-6 text-right space-x-4">
                                        <button
                                            onClick={() => handleEdit(artist)}
                                            className="text-gray-400 hover:text-[#C5A880] transition-colors p-1"
                                        >
                                            <Edit size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(artist.id, artist.name)}
                                            className="text-gray-400 hover:text-red-400 transition-colors p-1"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0D0D]/90 backdrop-blur-md p-4">
                    <div className="bg-[#090909] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 space-y-6 scrollbar-thin">
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                            <div>
                                <span className="text-[9px] uppercase tracking-widest text-[#C5A880]">Platform Ledger</span>
                                <h3 className="text-xl font-display font-light text-[#FAF9F6]">
                                    {currentArtist ? 'Refine Artisan Profile' : 'Enroll New Artisan'}
                                </h3>
                            </div>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-[#C5A880] transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Artisan Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Benjamin Dupont"
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Expertise / Media Class</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.expertise}
                                        onChange={e => setFormData({ ...formData, expertise: e.target.value })}
                                        placeholder="e.g. Abstract Expressionism"
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Academy / University Affiliation</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.university}
                                        onChange={e => setFormData({ ...formData, university: e.target.value })}
                                        placeholder="e.g. Yale School of Art"
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">High-Resolution Avatar URL</label>
                                    <input
                                        required
                                        type="url"
                                        value={formData.image}
                                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="Paste image link address"
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400">Artisan Biography / Curation context</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.bio}
                                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                    placeholder="Write a brief professional narrative about the artist..."
                                    className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs p-4 text-[#FAF9F6] outline-none transition-colors resize-none leading-relaxed"
                                />
                            </div>

                            <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 text-xs uppercase tracking-widest px-6 py-3 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#C5A880] text-[#0D0D0D] hover:bg-[#FAF9F6] text-xs uppercase tracking-widest px-6 py-3 transition-colors font-semibold"
                                >
                                    <Save size={12} className="inline mr-1" /> Enroll Artisan
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

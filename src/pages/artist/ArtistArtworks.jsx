import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const ArtistArtworks = () => {
    const { user } = useStore();
    const { addToast } = useToast();
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState(null);

    // Form fields
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Painting',
        style: 'Modernism',
        imageUrl: '',
        medium: 'Oil on Canvas',
        dimensions: '36" x 48"',
        featured: false,
        inStock: true
    });

    const categories = ['Painting', 'Sculpture', 'Photography', 'Digital Art', 'Mixed Media'];
    const styles = ['Modernism', 'Abstract', 'Realism', 'Minimalism', 'Surrealism', 'Expressionism'];

    const fetchArtworks = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const data = await api.getProductsByArtist(user.name);
            setArtworks(data || []);
        } catch (error) {
            console.error('Failed to load portfolio:', error);
            addToast('error', 'Failed to retrieve portfolio listings.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArtworks();
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const newArtwork = {
                ...form,
                price: Number(form.price),
                artist: user.name,
                artistId: user.id || Date.now(),
                inStock: true,
                rating: 5,
                reviews: 0
            };
            await api.createProduct(newArtwork);
            addToast('success', 'Artwork listed successfully in the gallery.');
            setIsAddModalOpen(false);
            resetForm();
            fetchArtworks();
        } catch (error) {
            console.error('Create product failed:', error);
            addToast('error', 'Failed to list artwork.');
        }
    };

    const handleEditClick = (art) => {
        setSelectedArtwork(art);
        setForm({
            title: art.title || '',
            description: art.description || '',
            price: art.price || '',
            category: art.category || 'Painting',
            style: art.style || 'Modernism',
            imageUrl: art.imageUrl || '',
            medium: art.medium || 'Oil on Canvas',
            dimensions: art.dimensions || '36" x 48"',
            featured: art.featured || false,
            inStock: art.inStock !== undefined ? art.inStock : true
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!selectedArtwork) return;
        try {
            const updated = {
                ...form,
                price: Number(form.price)
            };
            await api.updateProduct(selectedArtwork.id, updated);
            addToast('success', 'Artwork portfolio details updated.');
            setIsEditModalOpen(false);
            resetForm();
            fetchArtworks();
        } catch (error) {
            console.error('Update failed:', error);
            addToast('error', 'Failed to update artwork.');
        }
    };

    const handleDeleteClick = async (art) => {
        if (!art.inStock) {
            addToast('error', 'Cannot delete sold items. Please archive instead.');
            return;
        }
        if (window.confirm(`Are you certain you wish to withdraw "${art.title}" from the curation?`)) {
            try {
                await api.deleteProduct(art.id);
                addToast('success', 'Artwork listing permanently withdrawn.');
                fetchArtworks();
            } catch (error) {
                console.error('Delete failed:', error);
                addToast('error', 'Failed to withdraw artwork.');
            }
        }
    };

    const resetForm = () => {
        setForm({
            title: '',
            description: '',
            price: '',
            category: 'Painting',
            style: 'Modernism',
            imageUrl: '',
            medium: 'Oil on Canvas',
            dimensions: '36" x 48"',
            featured: false,
            inStock: true
        });
        setSelectedArtwork(null);
    };

    return (
        <div className="bg-[#0D0D0D] text-[#FAF9F6] min-h-screen pt-36 pb-24 px-8">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="border-b border-white/5 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">Studio Collections</span>
                        <h1 className="text-3xl md:text-5xl font-display font-light text-[#FAF9F6]">Manage Artworks</h1>
                        <p className="text-xs text-gray-500 tracking-wider">Catalog and refine your exclusive physical inventory listings.</p>
                    </div>
                    <button
                        onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                        className="bg-[#C5A880] text-[#0D0D0D] hover:bg-[#FAF9F6] text-xs uppercase tracking-widest px-6 py-3 flex items-center gap-2 transition-all font-semibold"
                    >
                        <Plus size={14} /> Catalog New Piece
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-6 h-6 border-2 border-t-transparent border-[#C5A880] rounded-full animate-spin"></div>
                    </div>
                ) : artworks.length === 0 ? (
                    <div className="bg-[#090909] border border-white/5 p-16 text-center space-y-4">
                        <p className="text-sm text-gray-400">Your curation is currently empty.</p>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="text-[#C5A880] hover:text-[#FAF9F6] text-xs uppercase tracking-widest underline underline-offset-4"
                        >
                            Upload your first masterpiece
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {artworks.map((art) => (
                          <div key={art.id} className="bg-[#090909] border border-white/5 group relative flex flex-col justify-between">
                              <div className="aspect-[4/5] bg-neutral-900 overflow-hidden relative">
                                  <img
                                      src={art.imageUrl || "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"}
                                      alt={art.title}
                                      className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                  />
                                  <div className="absolute top-4 right-4 flex gap-2">
                                      {art.featured && (
                                          <span className="bg-[#C5A880]/90 text-[#0D0D0D] text-[9px] uppercase tracking-widest px-2.5 py-1 font-semibold backdrop-blur-md">
                                              Featured
                                          </span>
                                      )}
                                      {!art.inStock && (
                                          <span className="bg-red-950/90 text-red-200 border border-red-800/30 text-[9px] uppercase tracking-widest px-2.5 py-1 font-semibold backdrop-blur-md">
                                              Acquired
                                          </span>
                                      )}
                                  </div>
                              </div>
                              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                                  <div className="space-y-1">
                                      <span className="text-[9px] uppercase tracking-widest text-[#C5A880]">{art.category} • {art.style}</span>
                                      <h3 className="font-display text-lg font-light text-[#FAF9F6] line-clamp-1">{art.title}</h3>
                                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-light">{art.description}</p>
                                  </div>
                                  
                                  <div className="border-t border-white/5 pt-4 flex items-center justify-between mt-auto">
                                      <span className="text-sm font-light text-[#FAF9F6]/90 tracking-wider">₹{art.price?.toLocaleString()}</span>
                                      <div className="flex gap-4">
                                          <button
                                              onClick={() => handleEditClick(art)}
                                              className="text-gray-400 hover:text-[#C5A880] transition-colors p-1"
                                              title="Edit Artwork Details"
                                          >
                                              <Edit2 size={15} />
                                          </button>
                                          <button
                                              onClick={() => handleDeleteClick(art)}
                                              className={`transition-colors p-1 ${art.inStock ? 'text-gray-400 hover:text-red-400' : 'text-gray-700 cursor-not-allowed'}`}
                                              disabled={!art.inStock}
                                              title={art.inStock ? "Delete listing" : "Sold items cannot be deleted"}
                                          >
                                              <Trash2 size={15} />
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Catalog (Add) Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0D0D]/90 backdrop-blur-md p-4">
                    <div className="bg-[#090909] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 space-y-6 scrollbar-thin">
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                            <div>
                                <span className="text-[9px] uppercase tracking-widest text-[#C5A880]">Studio Ledger</span>
                                <h3 className="text-xl font-display font-light text-[#FAF9F6]">Catalog Masterpiece</h3>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-[#C5A880] transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Artwork Title</label>
                                    <input
                                        required
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Whispers of the Cosmos"
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Acquisition Price (INR)</label>
                                    <input
                                        required
                                        type="number"
                                        name="price"
                                        value={form.price}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 185000"
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400">Exposition Description</label>
                                <textarea
                                    required
                                    name="description"
                                    rows="3"
                                    value={form.description}
                                    onChange={handleInputChange}
                                    placeholder="Write a poetic description or context about the masterpiece..."
                                    className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs p-4 text-[#FAF9F6] outline-none transition-colors resize-none leading-relaxed"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Category</label>
                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    >
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Aesthetic Style</label>
                                    <select
                                        name="style"
                                        value={form.style}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    >
                                        {styles.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Medium Used</label>
                                    <input
                                        required
                                        type="text"
                                        name="medium"
                                        value={form.medium}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Acrylic on Canvas"
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Physical Dimensions</label>
                                    <input
                                        required
                                        type="text"
                                        name="dimensions"
                                        value={form.dimensions}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 24&quot; x 36&quot;"
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Masterpiece Image URL</label>
                                    <input
                                        required
                                        type="url"
                                        name="imageUrl"
                                        value={form.imageUrl}
                                        onChange={handleInputChange}
                                        placeholder="Paste a premium high-res image address"
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                                <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={form.featured}
                                        onChange={handleInputChange}
                                        className="accent-[#C5A880] w-4 h-4 bg-[#0D0D0D] border border-white/10"
                                    />
                                    <span className="text-[11px] uppercase tracking-widest text-gray-400">Feature on Platform Hero List</span>
                                </label>
                            </div>

                            <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 text-xs uppercase tracking-widest px-6 py-3 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#C5A880] text-[#0D0D0D] hover:bg-[#FAF9F6] text-xs uppercase tracking-widest px-6 py-3 transition-colors font-semibold"
                                >
                                    Publish Listing
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0D0D]/90 backdrop-blur-md p-4">
                    <div className="bg-[#090909] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 space-y-6 scrollbar-thin">
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                            <div>
                                <span className="text-[9px] uppercase tracking-widest text-[#C5A880]">Studio Ledger</span>
                                <h3 className="text-xl font-display font-light text-[#FAF9F6]">Refine Masterpiece</h3>
                            </div>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-[#C5A880] transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Artwork Title</label>
                                    <input
                                        required
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Acquisition Price (INR)</label>
                                    <input
                                        required
                                        type="number"
                                        name="price"
                                        value={form.price}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400">Exposition Description</label>
                                <textarea
                                    required
                                    name="description"
                                    rows="3"
                                    value={form.description}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs p-4 text-[#FAF9F6] outline-none transition-colors resize-none leading-relaxed"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Category</label>
                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    >
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Aesthetic Style</label>
                                    <select
                                        name="style"
                                        value={form.style}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    >
                                        {styles.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Medium Used</label>
                                    <input
                                        required
                                        type="text"
                                        name="medium"
                                        value={form.medium}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Physical Dimensions</label>
                                    <input
                                        required
                                        type="text"
                                        name="dimensions"
                                        value={form.dimensions}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Masterpiece Image URL</label>
                                    <input
                                        required
                                        type="url"
                                        name="imageUrl"
                                        value={form.imageUrl}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-8 pt-4 border-t border-white/5">
                                <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={form.featured}
                                        onChange={handleInputChange}
                                        className="accent-[#C5A880] w-4 h-4 bg-[#0D0D0D] border border-white/10"
                                    />
                                    <span className="text-[11px] uppercase tracking-widest text-gray-400">Feature on Platform Hero List</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        name="inStock"
                                        checked={form.inStock}
                                        onChange={handleInputChange}
                                        className="accent-[#C5A880] w-4 h-4 bg-[#0D0D0D] border border-white/10"
                                    />
                                    <span className="text-[11px] uppercase tracking-widest text-gray-400">Available For Sale</span>
                                </label>
                            </div>

                            <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 text-xs uppercase tracking-widest px-6 py-3 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#C5A880] text-[#0D0D0D] hover:bg-[#FAF9F6] text-xs uppercase tracking-widest px-6 py-3 transition-colors font-semibold"
                                >
                                    Save Masterpiece
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArtistArtworks;

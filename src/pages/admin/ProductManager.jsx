import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const ProductManager = () => {
    const { addToast } = useToast();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const initialFormState = {
        title: '',
        artist: '',
        price: '',
        category: 'Painting',
        style: 'Modernism',
        imageUrl: '',
        description: '',
        dimensions: '36" x 48"',
        medium: 'Oil on Canvas',
        inStock: true,
        featured: false
    };

    const [formData, setFormData] = useState(initialFormState);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await api.getProducts({ limit: 100 });
            setProducts(data?.products || []);
        } catch (error) {
            console.error("Failed to load products list:", error);
            addToast('error', 'Failed to retrieve products list.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setFormData({
            title: product.title || '',
            artist: product.artist || '',
            price: product.price || '',
            category: product.category || 'Painting',
            style: product.style || 'Modernism',
            imageUrl: product.image || product.imageUrl || '',
            description: product.description || '',
            dimensions: product.dimensions || '36" x 48"',
            medium: product.medium || 'Oil on Canvas',
            inStock: product.inStock !== undefined ? product.inStock : true,
            featured: product.featured || false
        });
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setCurrentProduct(null);
        setFormData(initialFormState);
        setIsEditing(true);
    };

    const handleDelete = async (art) => {
        if (!art.inStock) {
            addToast('error', 'Cannot delete sold masterpieces. Please archive instead.');
            return;
        }
        if (window.confirm(`Are you certain you wish to withdraw "${art.title}" from curation?`)) {
            try {
                await api.deleteProduct(art.id);
                addToast('success', 'Artwork curation listings permanently deleted.');
                fetchProducts();
            } catch (error) {
                console.error("Failed to withdraw product:", error);
                addToast('error', 'Failed to withdraw product curation.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                image: formData.imageUrl // Ensure both schemas stay synced
            };

            if (currentProduct) {
                await api.updateProduct(currentProduct.id, payload);
                addToast('success', 'Artwork curation listing updated successfully.');
            } else {
                await api.createProduct(payload);
                addToast('success', 'Bespoke masterpiece listed in gallery.');
            }
            setIsEditing(false);
            fetchProducts();
        } catch (error) {
            console.error("Save product failed:", error);
            addToast('error', 'Failed to register product curation.');
        }
    };

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="border-b border-white/5 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">Executive Portal</span>
                    <h1 className="text-3xl md:text-5xl font-display font-light text-[#FAF9F6]">Manage Curation</h1>
                    <p className="text-xs text-gray-500 tracking-wider">Configure global artwork products, availability, and featured spotlights.</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="bg-[#C5A880] text-[#0D0D0D] hover:bg-[#FAF9F6] text-xs uppercase tracking-widest px-6 py-3 flex items-center gap-2 transition-all font-semibold self-start md:self-auto"
                >
                    <Plus size={14} /> Catalog New Piece
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-6 h-6 border-2 border-t-transparent border-[#C5A880] rounded-full animate-spin"></div>
                </div>
            ) : products.length === 0 ? (
                <div className="bg-[#090909] border border-white/5 p-16 text-center text-xs text-gray-500 tracking-wider">
                    Curation registry is completely empty.
                </div>
            ) : (
                /* Elegant Curation Table */
                <div className="border border-white/5 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#080808] border-b border-white/5 text-[9px] uppercase tracking-widest text-gray-400 font-semibold">
                                <th className="py-4 px-6">Masterpiece</th>
                                <th className="py-4 px-6">Creator</th>
                                <th className="py-4 px-6">Class / Category</th>
                                <th className="py-4 px-6">Investment (INR)</th>
                                <th className="py-4 px-6">Spotlight</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-xs font-light text-gray-300">
                            {products.map((art) => (
                                <tr key={art.id} className="hover:bg-white/[0.01] transition-colors">
                                    <td className="py-4 px-6 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-neutral-900 overflow-hidden relative">
                                            <img
                                                src={art.image || art.imageUrl}
                                                alt={art.title}
                                                className="w-full h-full object-cover grayscale"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-sm font-display text-[#FAF9F6] tracking-wide font-normal">{art.title}</div>
                                            <div className="text-[10px] text-gray-500 mt-0.5">
                                                {art.inStock ? 'Available' : 'Acquired'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-400">{art.artist}</td>
                                    <td className="py-4 px-6">
                                        <span className="text-[10px] uppercase tracking-widest text-[#C5A880]/80">{art.category}</span>
                                    </td>
                                    <td className="py-4 px-6 font-normal text-[#FAF9F6] tracking-wider">
                                        ₹{art.price?.toLocaleString()}
                                    </td>
                                    <td className="py-4 px-6">
                                        {art.featured ? (
                                            <span className="text-[9px] uppercase tracking-widest text-[#C5A880] border border-[#C5A880]/30 px-2 py-0.5 bg-[#C5A880]/5 font-semibold">
                                                Spotlight
                                            </span>
                                        ) : (
                                            <span className="text-[9px] uppercase tracking-widest text-gray-600">Standard</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 text-right space-x-4">
                                        <button
                                            onClick={() => handleEdit(art)}
                                            className="text-gray-400 hover:text-[#C5A880] transition-colors p-1"
                                        >
                                            <Edit size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(art)}
                                            className={`transition-colors p-1 ${art.inStock ? 'text-gray-400 hover:text-red-400' : 'text-gray-700 cursor-not-allowed'}`}
                                            disabled={!art.inStock}
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
                                    {currentProduct ? 'Refine Masterpiece Curation' : 'Catalog New Masterpiece'}
                                </h3>
                            </div>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-[#C5A880] transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Artwork Title</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. Symphony of Obsidian"
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Artisan / Artist Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.artist}
                                        onChange={e => setFormData({ ...formData, artist: e.target.value })}
                                        placeholder="e.g. Alexandra Vance"
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Price (INR)</label>
                                    <input
                                        required
                                        type="number"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        placeholder="e.g. 210000"
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    >
                                        <option value="Painting">Painting</option>
                                        <option value="Sculpture">Sculpture</option>
                                        <option value="Photography">Photography</option>
                                        <option value="Digital Art">Digital Art</option>
                                        <option value="Mixed Media">Mixed Media</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Aesthetic Style</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.style}
                                        onChange={e => setFormData({ ...formData, style: e.target.value })}
                                        placeholder="e.g. Minimalism"
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Dimensions</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.dimensions}
                                        onChange={e => setFormData({ ...formData, dimensions: e.target.value })}
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Medium</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.medium}
                                        onChange={e => setFormData({ ...formData, medium: e.target.value })}
                                        className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400">Artwork Image URL</label>
                                <input
                                    required
                                    type="url"
                                    value={formData.imageUrl}
                                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                    placeholder="Paste high-res image link address"
                                    className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs px-4 py-3 text-[#FAF9F6] outline-none transition-colors"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400">Exposition Description</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Poetic curation bio..."
                                    className="w-full bg-[#0D0D0D] border border-white/5 focus:border-[#C5A880]/50 text-xs p-4 text-[#FAF9F6] outline-none transition-colors resize-none leading-relaxed"
                                />
                            </div>

                            <div className="flex items-center gap-8 pt-4 border-t border-white/5">
                                <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                                        className="accent-[#C5A880] w-4 h-4 bg-[#0D0D0D] border border-white/10"
                                    />
                                    <span className="text-[11px] uppercase tracking-widest text-gray-400">Spotlight Feature on Curation Slider</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={formData.inStock}
                                        onChange={e => setFormData({ ...formData, inStock: e.target.checked })}
                                        className="accent-[#C5A880] w-4 h-4 bg-[#0D0D0D] border border-white/10"
                                    />
                                    <span className="text-[11px] uppercase tracking-widest text-gray-400">Available For Acquisitions</span>
                                </label>
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
                                    <Save size={12} className="inline mr-1" /> Save Masterpiece
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManager;

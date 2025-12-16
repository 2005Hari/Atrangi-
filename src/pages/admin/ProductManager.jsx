import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';

const ProductManager = () => {
    const { products, addProduct, updateProduct, deleteProduct, user } = useStore();
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const canDelete = ['admin', 'creative_head'].includes(user.role);
    const canAdd = ['admin', 'creative_head'].includes(user.role);
    const canEditPriceStock = ['admin', 'creative_head'].includes(user.role);
    const isMarketing = user.role === 'marketing_em';

    // Safety check for products
    const safeProducts = Array.isArray(products) ? products : [];

    const initialFormState = {
        title: '',
        artist: '',
        price: '',
        category: 'Resin Art',
        image: '',
        description: '',
        inStock: true,
        featured: false
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setFormData(product);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setCurrentProduct(null);
        setFormData(initialFormState);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            ...formData,
            id: currentProduct ? currentProduct.id : Date.now(),
            price: Number(formData.price)
        };

        if (currentProduct) {
            updateProduct(productData);
        } else {
            addProduct(productData);
        }
        setIsEditing(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-display font-bold text-charcoal">Product Manager</h1>
                {canAdd && (
                    <button
                        onClick={handleAddNew}
                        className="bg-deep-saffron text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-orange-600 transition-colors"
                    >
                        <Plus size={20} />
                        <span>Add Product</span>
                    </button>
                )}
            </div>

            {/* Product List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-medium text-gray-500">Image</th>
                            <th className="p-4 font-medium text-gray-500">Title</th>
                            <th className="p-4 font-medium text-gray-500">Artist</th>
                            <th className="p-4 font-medium text-gray-500">Price</th>
                            <th className="p-4 font-medium text-gray-500">Category</th>
                            <th className="p-4 font-medium text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {safeProducts.map(product => (
                            <tr key={product.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                <td className="p-4">
                                    <img src={product.image} alt={product.title} className="w-12 h-12 rounded object-cover" />
                                </td>
                                <td className="p-4 font-medium text-charcoal">{product.title}</td>
                                <td className="p-4 text-gray-600">{product.artist}</td>
                                <td className="p-4 text-gray-600">₹{product.price.toLocaleString()}</td>
                                <td className="p-4 text-gray-600">{product.category}</td>
                                <td className="p-4 text-right space-x-2">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="text-blue-500 hover:text-blue-700 p-1"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    {canDelete && (
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-500 hover:text-red-700 p-1"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
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
                                {currentProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        required
                                        disabled={isMarketing}
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-deep-saffron disabled:bg-gray-100 disabled:text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Artist</label>
                                    <input
                                        type="text"
                                        required
                                        disabled={isMarketing}
                                        value={formData.artist}
                                        onChange={e => setFormData({ ...formData, artist: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-deep-saffron disabled:bg-gray-100 disabled:text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        disabled={!canEditPriceStock}
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-deep-saffron disabled:bg-gray-100 disabled:text-gray-500"
                                    />
                                    {!canEditPriceStock && <p className="text-xs text-red-400 mt-1">Only Admin/Creative Head can edit price.</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        value={formData.category}
                                        disabled={isMarketing}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-deep-saffron disabled:bg-gray-100 disabled:text-gray-500"
                                    >
                                        <option>Resin Art</option>
                                        <option>Sculptures</option>
                                        <option>Sketches & Drawings</option>
                                        <option>Mold Art</option>
                                        <option>Home Decor</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    required
                                    disabled={isMarketing}
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-deep-saffron disabled:bg-gray-100 disabled:text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    rows="3"
                                    disabled={isMarketing}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-deep-saffron disabled:bg-gray-100 disabled:text-gray-500"
                                ></textarea>
                            </div>

                            <div className="flex items-center space-x-4">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.inStock}
                                        disabled={!canEditPriceStock}
                                        onChange={e => setFormData({ ...formData, inStock: e.target.checked })}
                                        className="rounded text-deep-saffron focus:ring-deep-saffron disabled:opacity-50"
                                    />
                                    <span className="text-sm text-gray-700">In Stock</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        // Marketing CAN edit featured
                                        onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                                        className="rounded text-deep-saffron focus:ring-deep-saffron"
                                    />
                                    <span className="text-sm text-gray-700">Featured</span>
                                </label>
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
                                    <span>Save Product</span>
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

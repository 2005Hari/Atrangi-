import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { Plus, Trash2, FolderHeart } from 'lucide-react';

const CollectionsPage = () => {
    const { collections, createCollection, removeFromCollection } = useStore();
    const [newCollectionName, setNewCollectionName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = (e) => {
        e.preventDefault();
        if (newCollectionName.trim()) {
            createCollection(newCollectionName);
            setNewCollectionName('');
            setIsCreating(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-cream">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-display font-bold text-charcoal">Your Collections</h1>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="bg-deep-saffron text-white px-6 py-3 rounded-sm flex items-center space-x-2 hover:bg-orange-600 transition-colors"
                    >
                        <Plus size={20} />
                        <span>New Collection</span>
                    </button>
                </div>

                {/* Create Modal */}
                {isCreating && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white p-8 rounded-sm shadow-xl w-full max-w-md">
                            <h3 className="text-xl font-bold mb-4">Create New Collection</h3>
                            <form onSubmit={handleCreate}>
                                <input
                                    type="text"
                                    placeholder="e.g., Office Decor, Gift Ideas"
                                    value={newCollectionName}
                                    onChange={(e) => setNewCollectionName(e.target.value)}
                                    className="w-full border border-gray-300 p-3 rounded-sm mb-6 focus:border-deep-saffron outline-none"
                                    autoFocus
                                />
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreating(false)}
                                        className="text-gray-500 hover:text-charcoal"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-deep-saffron text-white px-6 py-2 rounded-sm"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Collections Grid */}
                <div className="space-y-16">
                    {collections.map((collection) => (
                        <div key={collection.name} className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                                <div className="flex items-center space-x-3">
                                    <FolderHeart className="text-deep-saffron" size={24} />
                                    <h2 className="text-2xl font-display font-bold text-charcoal">{collection.name}</h2>
                                    <span className="text-gray-400 text-sm">({collection.items.length} items)</span>
                                </div>
                            </div>

                            {collection.items.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {collection.items.map((item) => (
                                        <div key={item.id} className="group relative">
                                            <Link to={`/product/${item.id}`}>
                                                <div className="aspect-[4/5] overflow-hidden rounded-sm bg-gray-100 mb-3">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <h3 className="font-medium text-charcoal truncate">{item.title}</h3>
                                                <p className="text-sm text-gray-500">₹{item.price.toLocaleString()}</p>
                                            </Link>
                                            <button
                                                onClick={() => removeFromCollection(collection.name, item.id)}
                                                className="absolute top-2 right-2 bg-white/90 p-2 rounded-full text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Remove from collection"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-sm border-2 border-dashed border-gray-200">
                                    <p className="text-gray-400">This collection is empty.</p>
                                    <Link to="/collections" className="text-deep-saffron hover:underline mt-2 inline-block">
                                        Browse Art
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollectionsPage;

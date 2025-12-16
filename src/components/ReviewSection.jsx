import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { api } from '../services/api';
import { Star, User } from 'lucide-react';

const ReviewSection = ({ productId }) => {
    const { user } = useStore();
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await api.getReviews(productId);
                setReviews(data);
            } catch (error) {
                console.error("Failed to fetch reviews", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [productId]);

    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        const newReview = {
            productId,
            rating,
            comment
        };

        try {
            const savedReview = await api.addReview(newReview);
            setReviews([savedReview, ...reviews]);
            setComment('');
            setRating(5);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="mt-16 border-t border-gray-100 pt-12">
            <h2 className="text-2xl font-display font-bold text-charcoal mb-8">
                Reviews ({reviews.length})
                {reviews.length > 0 && <span className="text-lg font-sans font-normal text-gray-500 ml-2">★ {averageRating}</span>}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Review List */}
                <div className="space-y-8">
                    {loading ? (
                        <p>Loading reviews...</p>
                    ) : reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review._id || review.id} className="border-b border-gray-50 pb-6 last:border-0">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                                            <User size={14} />
                                        </div>
                                        <span className="font-medium text-charcoal">{review.userName}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex text-deep-saffron mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300"} />
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
                    )}
                </div>

                {/* Write Review Form */}
                <div className="bg-gray-50 p-8 rounded-sm h-fit">
                    <h3 className="text-xl font-display font-bold text-charcoal mb-6">Write a Review</h3>
                    {user ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Rating</label>
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className={`focus:outline-none transition-colors ${star <= rating ? 'text-deep-saffron' : 'text-gray-300'}`}
                                        >
                                            <Star size={24} fill={star <= rating ? "currentColor" : "none"} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Comment</label>
                                <textarea
                                    rows="4"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full border border-gray-200 rounded p-3 focus:outline-none focus:border-deep-saffron"
                                    placeholder="Share your thoughts..."
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-charcoal text-white py-3 rounded-sm hover:bg-deep-saffron transition-colors uppercase tracking-widest font-bold text-sm"
                            >
                                Submit Review
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500 mb-4">Please log in to write a review.</p>
                            <a href="/login" className="text-deep-saffron font-medium hover:underline">Sign In</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewSection;

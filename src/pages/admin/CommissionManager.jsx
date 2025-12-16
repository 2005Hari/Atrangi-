import React from 'react';
import { useStore } from '../../store/useStore';
import { Mail, Calendar, DollarSign } from 'lucide-react';

const CommissionManager = () => {
    const { commissions } = useStore();

    return (
        <div>
            <h1 className="text-3xl font-display font-bold text-charcoal mb-8">Commission Requests</h1>

            {commissions.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {commissions.map((commission) => (
                        <div key={commission.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-charcoal mb-1">{commission.style}</h3>
                                    <p className="text-gray-500 text-sm">Requested Artist ID: {commission.artistId || 'Any'}</p>
                                </div>
                                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium">
                                    {commission.status || 'Pending'}
                                </span>
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {commission.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 border-t border-gray-50 pt-4">
                                <div className="flex items-center space-x-2">
                                    <DollarSign size={16} />
                                    <span>Budget: ₹{commission.budget}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Calendar size={16} />
                                    <span>Size: {commission.size}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Mail size={16} />
                                    <span>Submitted: {new Date(commission.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg border border-gray-100">
                    <p className="text-gray-500">No commission requests received yet.</p>
                </div>
            )}
        </div>
    );
};

export default CommissionManager;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useStore();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
                    <p className="text-gray-600 mb-6">You do not have permission to access this page.</p>
                    <button
                        onClick={() => window.history.back()}
                        className="text-blue-500 hover:underline"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;

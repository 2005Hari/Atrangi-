import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const UserProtectedRoute = ({ children }) => {
    const { user } = useStore();
    const token = localStorage.getItem('token');
    
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export const ArtistProtectedRoute = ({ children }) => {
    const { user } = useStore();
    const token = localStorage.getItem('token');
    
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }
    
    if (user.role !== 'ARTIST') {
        return <Navigate to="/" replace />;
    }
    
    return children;
};

export const AdminProtectedRoute = ({ children }) => {
    const { user } = useStore();
    const token = localStorage.getItem('token');
    
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }
    
    if (user.role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }
    
    return children;
};

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[9999] flex flex-col space-y-2 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            layout
                            className={`min-w-[300px] p-4 rounded-sm shadow-xl flex items-start space-x-3 pointer-events-auto border-l-4 ${toast.type === 'success' ? 'bg-white border-green-500' :
                                    toast.type === 'error' ? 'bg-white border-red-500' :
                                        'bg-white border-blue-500'
                                }`}
                        >
                            <div className="flex-shrink-0 mt-0.5">
                                {toast.type === 'success' && <CheckCircle size={18} className="text-green-500" />}
                                {toast.type === 'error' && <AlertCircle size={18} className="text-red-500" />}
                                {toast.type === 'info' && <Info size={18} className="text-blue-500" />}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-charcoal">{toast.message}</p>
                            </div>
                            <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-charcoal">
                                <X size={16} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

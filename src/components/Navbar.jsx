import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchOverlay from './SearchOverlay';
import { useStore } from '../store/useStore';

const Navbar = ({ onCartClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();
    const { user, cart } = useStore();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Gallery', path: '/gallery' },
        { name: 'Commissions', path: '/commission' },
        { name: 'Our Story', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    // Determine dashboard link based on role
    const getDashboardLink = () => {
        if (!user) return { name: 'Access', path: '/login' };
        if (user.role === 'ADMIN') return { name: 'Admin', path: '/admin' };
        if (user.role === 'ARTIST') return { name: 'Studio', path: '/artist' };
        return { name: 'Account', path: '/account' };
    };

    const dashboardLink = getDashboardLink();

    return (
        <>
            <nav
                className={`fixed w-full z-40 transition-all duration-700 ${isScrolled 
                    ? 'bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl' 
                    : 'bg-transparent py-6'
                }`}
            >
                <div className="container mx-auto px-8 flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link 
                        to="/" 
                        className="text-2xl font-display font-bold tracking-[0.2em] text-[#FAF9F6] hover:text-[#C5A880] transition-colors"
                    >
                        ARTNESTIA
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="relative group text-[11px] uppercase tracking-[0.25em] font-light text-[#FAF9F6]/85 hover:text-[#C5A880] transition-colors"
                            >
                                {link.name}
                                <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Right Control Icons */}
                    <div className="flex items-center space-x-6 text-[#FAF9F6]">
                        {/* Search Overlay Toggle */}
                        <button
                            className="hover:text-[#C5A880] transition-colors p-1"
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Search Catalog"
                        >
                            <Search size={18} strokeWidth={1.5} />
                        </button>

                        {/* Account Link */}
                        <Link 
                            to={dashboardLink.path} 
                            className="text-[10px] uppercase tracking-[0.2em] hover:text-[#C5A880] transition-colors flex items-center gap-2 font-medium"
                        >
                            <User size={18} strokeWidth={1.5} />
                            <span className="hidden lg:inline-block">{dashboardLink.name}</span>
                        </Link>

                        {/* Cart Trigger */}
                        <button
                            className="relative hover:text-[#C5A880] transition-colors p-1"
                            onClick={onCartClick}
                            aria-label="View Cart"
                        >
                            <ShoppingBag size={18} strokeWidth={1.5} />
                            {cart.length > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-[#C5A880] text-[#0D0D0D] text-[9px] w-4 h-4 flex items-center justify-center font-bold rounded-full">
                                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Icon */}
                        <button
                            className="md:hidden hover:text-[#C5A880] transition-colors p-1"
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Toggle Navigation"
                        >
                            <Menu size={20} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Immersive Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-50 bg-[#0D0D0D] flex flex-col justify-center items-center px-8 border-b border-white/10"
                    >
                        <button
                            className="absolute top-6 right-8 text-[#FAF9F6] hover:text-[#C5A880] transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close Navigation"
                        >
                            <X size={26} strokeWidth={1.2} />
                        </button>

                        <div className="flex flex-col space-y-8 text-center">
                            {/* Logo inside menu */}
                            <div className="text-xl font-display tracking-[0.25em] text-[#C5A880] mb-6">
                                ARTNESTIA
                            </div>
                            
                            <Link
                                to="/"
                                className="text-sm font-display font-medium tracking-[0.25em] text-[#FAF9F6] hover:text-[#C5A880] transition-colors uppercase"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>

                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-sm font-display font-medium tracking-[0.25em] text-[#FAF9F6] hover:text-[#C5A880] transition-colors uppercase"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <Link
                                to={dashboardLink.path}
                                className="text-sm font-display font-bold tracking-[0.25em] text-[#C5A880] hover:text-[#FAF9F6] transition-colors uppercase pt-4 border-t border-white/5"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {dashboardLink.name}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Panel Overlay */}
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

export default Navbar;

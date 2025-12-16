import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, Heart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchOverlay from './SearchOverlay';
import { useStore } from '../store/useStore';

const Navbar = ({ onCartClick, cart = [], onFavoritesClick, favorites = [] }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();
    const { user } = useStore();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Collections', path: '/collections' },
        { name: 'Artists', path: '/artists' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <nav
                className={`fixed w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4 text-charcoal' : 'bg-transparent py-6 text-white'
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-display font-bold tracking-wider">
                        ATRANGI <span className="text-deep-saffron">CLUB</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="relative group text-sm uppercase tracking-widest hover:text-deep-saffron transition-colors font-medium"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-deep-saffron transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-6">
                        <button
                            className="hover:text-deep-saffron transition-colors"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search size={20} />
                        </button>

                        {user ? (
                            <Link to="/profile" className="hover:text-deep-saffron transition-colors">
                                <User size={20} />
                            </Link>
                        ) : (
                            <Link to="/login" className="hover:text-deep-saffron transition-colors">
                                <User size={20} />
                            </Link>
                        )}

                        <button
                            className="relative hover:text-deep-saffron transition-colors"
                            onClick={onFavoritesClick}
                        >
                            <Heart size={20} />
                            {favorites.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-deep-saffron text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                    {favorites.length}
                                </span>
                            )}
                        </button>
                        <button
                            className="relative hover:text-deep-saffron transition-colors"
                            onClick={onCartClick}
                        >
                            <ShoppingBag size={20} />
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-deep-saffron text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                        <button
                            className="md:hidden hover:text-deep-saffron transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-cream flex flex-col justify-center items-center"
                    >
                        <button
                            className="absolute top-6 right-6 text-charcoal hover:text-deep-saffron transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X size={32} />
                        </button>
                        <div className="flex flex-col space-y-8 text-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-2xl font-display font-bold text-charcoal hover:text-deep-saffron transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

export default Navbar;

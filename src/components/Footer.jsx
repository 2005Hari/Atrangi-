import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, CreditCard } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-charcoal text-cream pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="text-2xl font-display font-bold tracking-wider">
                            ATRANGI <span className="text-deep-saffron">CLUB</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Curated handcrafted art pieces from the world's most talented student artists.
                            Supporting emerging talent while transforming your space.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-deep-saffron transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-deep-saffron transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-deep-saffron transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-deep-saffron font-display font-bold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/collections" className="hover:text-deep-saffron transition-colors">Shop Collections</Link></li>
                            <li><Link to="/artists" className="hover:text-deep-saffron transition-colors">Our Artists</Link></li>
                            <li><Link to="/commission" className="hover:text-deep-saffron transition-colors">Commission Art</Link></li>
                            <li><Link to="/about" className="hover:text-deep-saffron transition-colors">About Us</Link></li>
                            <li><Link to="/faq" className="hover:text-deep-saffron transition-colors">FAQ</Link></li>
                            <li><Link to="/contact" className="hover:text-deep-saffron transition-colors">Contact Us</Link></li>
                            <li><Link to="/admin" className="hover:text-deep-saffron transition-colors text-xs text-gray-500">Admin Access</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-deep-saffron font-display font-bold text-lg mb-6">Customer Service</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/contact" className="hover:text-deep-saffron transition-colors">Contact Us</Link></li>
                            <li><Link to="/shipping" className="hover:text-deep-saffron transition-colors">Shipping Policy</Link></li>
                            <li><Link to="/returns" className="hover:text-deep-saffron transition-colors">Returns & Exchanges</Link></li>
                            <li className="pt-4 text-xs text-gray-500">
                                42, Kala Ghoda, Fort<br />
                                Mumbai, Maharashtra 400001<br />
                                +91 98765 43210<br />
                                atrangithefineartsclub@gmail.com
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-xl font-display font-bold mb-6">Stay Inspired</h4>
                        <p className="text-gray-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className="flex flex-col space-y-2" onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-800 text-white px-4 py-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-deep-saffron"
                                required
                            />
                            <button type="submit" className="bg-deep-saffron text-white px-4 py-3 rounded-sm font-bold tracking-wider hover:bg-orange-600 transition-colors">
                                SUBSCRIBE
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-gray-500 text-xs">
                        © {new Date().getFullYear()} Artisan Collective. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-4 text-gray-500">
                        <div className="flex items-center space-x-1" title="Credit/Debit Cards">
                            <CreditCard size={20} />
                        </div>
                        <div className="flex items-center space-x-1" title="UPI">
                            <span className="font-bold text-sm border border-current px-1 rounded-sm">UPI</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

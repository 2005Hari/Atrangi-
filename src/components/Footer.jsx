import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ShieldCheck } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#080808] text-[#FAF9F6] border-t border-white/5 pt-24 pb-12">
            <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    {/* Brand Philosophy */}
                    <div className="space-y-6">
                        <Link 
                            to="/" 
                            className="text-xl font-display font-bold tracking-[0.25em] text-[#C5A880] hover:text-[#FAF9F6] transition-colors"
                        >
                            ARTNESTIA
                        </Link>
                        <p className="text-gray-500 text-xs tracking-wider leading-relaxed font-light">
                            A highly curated, luxury digital gallery showcasing custom and unique student masterpieces. Supporting emerging genius, redefining premium living spaces.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-[#C5A880] font-display font-semibold text-xs tracking-[0.2em] uppercase mb-8">
                            Navigation
                        </h4>
                        <ul className="space-y-4 text-xs tracking-wider font-light text-gray-400">
                            <li><Link to="/gallery" className="hover:text-[#C5A880] transition-colors">The Gallery</Link></li>
                            <li><Link to="/commission" className="hover:text-[#C5A880] transition-colors">Commission Briefs</Link></li>
                            <li><Link to="/about" className="hover:text-[#C5A880] transition-colors">Our Story</Link></li>
                            <li><Link to="/contact" className="hover:text-[#C5A880] transition-colors">Inquiries</Link></li>
                        </ul>
                    </div>

                    {/* Support & Services */}
                    <div>
                        <h4 className="text-[#C5A880] font-display font-semibold text-xs tracking-[0.2em] uppercase mb-8">
                            Services
                        </h4>
                        <ul className="space-y-4 text-xs tracking-wider font-light text-gray-400">
                            <li><Link to="/faq" className="hover:text-[#C5A880] transition-colors">FAQ</Link></li>
                            <li><Link to="/shipping-policy" className="hover:text-[#C5A880] transition-colors">Shipping & Delivery</Link></li>
                            <li><Link to="/returns" className="hover:text-[#C5A880] transition-colors">Returns & Exchanges</Link></li>
                            <li><Link to="/privacy-policy" className="hover:text-[#C5A880] transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-[#C5A880] transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter / Join */}
                    <div>
                        <h4 className="text-[#C5A880] font-display font-semibold text-xs tracking-[0.2em] uppercase mb-8">
                            Direct Inquiries
                        </h4>
                        <p className="text-gray-500 text-xs tracking-wider font-light mb-6">
                            Receive private catalog releases, curation reviews, and exclusive artist listings.
                        </p>
                        <form 
                            className="flex flex-col space-y-3" 
                            onSubmit={(e) => { e.preventDefault(); alert("You have been added to the ArtNestia private circle."); }}
                        >
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-[#151515] border border-white/5 text-xs text-[#FAF9F6] px-4 py-3 rounded-none focus:outline-none focus:border-[#C5A880] tracking-widest placeholder-gray-600"
                                required
                            />
                            <button 
                                type="submit" 
                                className="bg-[#C5A880] text-[#0D0D0D] py-3 text-[10px] tracking-[0.25em] font-bold hover:bg-[#FAF9F6] transition-colors uppercase"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-500 text-[10px] tracking-[0.15em] font-light">
                    <p>
                        © {new Date().getFullYear()} ARTNESTIA. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <ShieldCheck size={14} className="text-[#C5A880]" />
                            <span>100% Insured Delivery</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

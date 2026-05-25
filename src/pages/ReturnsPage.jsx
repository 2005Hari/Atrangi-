import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ShieldCheck, Mail } from 'lucide-react';

const ReturnsPage = () => {
    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#FAF9F6] pt-40 pb-24 px-8">
            <div className="max-w-4xl mx-auto space-y-16">
                
                {/* Header */}
                <div className="text-center space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">Platform Guarantees</span>
                    <h1 className="text-3xl md:text-5xl font-display font-light text-[#FAF9F6]">Acquisition Return Policy</h1>
                    <p className="text-xs text-gray-500 tracking-wider max-w-lg mx-auto leading-relaxed mt-2">
                        Each transaction represents an exclusive curatorial transition. Learn about our authenticity assurance and grace windows.
                    </p>
                </div>

                {/* Analytical Value Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-[#090909] border border-white/5 p-8 text-center space-y-4">
                        <div className="w-12 h-12 bg-white/5 text-[#C5A880] rounded-full flex items-center justify-center mx-auto">
                            <RefreshCw size={20} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-display uppercase tracking-widest text-[#FAF9F6] text-xs">7-Day Return Grace</h3>
                        <p className="text-gray-500 text-[10px] tracking-wider leading-relaxed">
                            Eligible standard acquisitions can be returned within 7 days of verified arrival in original packaging.
                        </p>
                    </div>

                    <div className="bg-[#090909] border border-white/5 p-8 text-center space-y-4">
                        <div className="w-12 h-12 bg-white/5 text-[#C5A880] rounded-full flex items-center justify-center mx-auto">
                            <ShieldCheck size={20} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-display uppercase tracking-widest text-[#FAF9F6] text-xs">Authenticity Certificate</h3>
                        <p className="text-gray-500 text-[10px] tracking-wider leading-relaxed">
                            Every original physical canvas includes a physical Certificate of Authenticity signed by the artist.
                        </p>
                    </div>

                    <div className="bg-[#090909] border border-white/5 p-8 text-center space-y-4">
                        <div className="w-12 h-12 bg-white/5 text-[#C5A880] rounded-full flex items-center justify-center mx-auto">
                            <Mail size={20} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-display uppercase tracking-widest text-[#FAF9F6] text-xs">Direct Support Desk</h3>
                        <p className="text-gray-500 text-[10px] tracking-wider leading-relaxed">
                            Direct premium concierge assistance to coordinate packaging returns or freight pick-ups.
                        </p>
                    </div>
                </div>

                {/* Editorial Details */}
                <div className="bg-[#090909] border border-white/5 p-8 md:p-12 space-y-8 text-xs font-light tracking-wider leading-relaxed text-gray-400">
                    <section className="space-y-3">
                        <h2 className="text-sm font-display uppercase tracking-widest text-[#FAF9F6]">Eligibility and Parameters</h2>
                        <p>
                            To maintain the integrity of listed masterpieces, returns are accepted strictly within 7 business days of delivery. Artworks must be returned in their original wooden crates, wrapped in their initial archival sheets, and showing no signs of wear, framing damage, or environmental exposure.
                        </p>
                        <p className="text-red-400/90 font-medium">
                            * Custom commission briefs, once accepted and entered into the structural creation phase, are final sale and non-refundable.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm font-display uppercase tracking-widest text-[#FAF9F6]">Verification and Payout Refunds</h2>
                        <p>
                            Upon arrival back at our primary curatorial gallery, returned works undergo thorough authenticity and physical condition verification. Verified acquisitions are credited back to your original transaction gateway within 5-10 business days of reception.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ReturnsPage;

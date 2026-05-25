import React from 'react';

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#FAF9F6] pt-40 pb-24 px-8">
            <div className="max-w-3xl mx-auto space-y-12">
                {/* Header */}
                <div className="border-b border-white/5 pb-8">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">Platform Covenant</span>
                    <h1 className="text-3xl md:text-5xl font-display font-light text-[#FAF9F6] mt-2">Terms of Service</h1>
                    <p className="text-xs text-gray-500 tracking-wider mt-2">Legal frameworks, physical art acquisition covenants, and intellectual copyrights.</p>
                </div>

                <div className="bg-[#090909] border border-white/5 p-8 md:p-12 space-y-8 text-xs font-light tracking-wider leading-relaxed text-gray-400">
                    <section className="space-y-3">
                        <h2 className="text-sm font-display uppercase tracking-widest text-[#FAF9F6]">Acquisitions &amp; Transaction Settlements</h2>
                        <p>
                            By executing an acquisition on ArtNestia, you agree to pay the stated value for the physical canvas, including any calculated domestic or international freight, insurance, and custom duties. Artworks remain property of the studio until full transaction verification is cleared.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm font-display uppercase tracking-widest text-[#FAF9F6]">Bespoke Spatial Commission Agreements</h2>
                        <p>
                            Bespoke commissions represent direct design agreements between the client and student artisan. Upon acceptance of a commission brief, the client commits to the designated budget. Progress updates are tracked directly inside the studio account. Commissioned deliverables are non-returnable.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm font-display uppercase tracking-widest text-[#FAF9F6]">Intellectual Fine Art Copyrights</h2>
                        <p>
                            All copyrights, reproduction prints, and design concepts regarding physical masterpieces, digital showcases, and platform photographs are properties of ArtNestia and their respective student creators. Purchasing fine art does not convey reproduction rights.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;

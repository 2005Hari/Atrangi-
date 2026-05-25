import React from 'react';

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#FAF9F6] pt-40 pb-24 px-8">
            <div className="max-w-3xl mx-auto space-y-12">
                {/* Header */}
                <div className="border-b border-white/5 pb-8">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">Confidentiality Pact</span>
                    <h1 className="text-3xl md:text-5xl font-display font-light text-[#FAF9F6] mt-2">Privacy Charter</h1>
                    <p className="text-xs text-gray-500 tracking-wider mt-2">Your data confidentiality, secure transactions, and collection tracking privacy.</p>
                </div>

                <div className="bg-[#090909] border border-white/5 p-8 md:p-12 space-y-8 text-xs font-light tracking-wider leading-relaxed text-gray-400">
                    <section className="space-y-3">
                        <h2 className="text-sm font-display uppercase tracking-widest text-[#FAF9F6]">Personal Curatorial Data Collection</h2>
                        <p>
                            We collect personal details such as shipping addresses, client names, transaction hashes, and secure emails exclusively to process custom commissions, track active acquisitions, and customize your luxury digital browsing telemetry.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm font-display uppercase tracking-widest text-[#FAF9F6]">Secure Transactions &amp; Gateway Encryptions</h2>
                        <p>
                            Every single financial transaction is processed via industry-standard SSL encrypted third-party payment gateways. We never save raw credit card codes or gateway access logs inside our main databases.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm font-display uppercase tracking-widest text-[#FAF9F6]">Platform Cookies &amp; Telemetry Tracking</h2>
                        <p>
                            We employ micro-telemetry cookies to save active cart data, authentication status, and curatorial interface configurations (such as dark mode parameters). You can adjust cookie configurations directly within your browser settings.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;

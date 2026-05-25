import React from 'react';

const ShippingPage = () => {
    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#FAF9F6] pt-40 pb-24 px-8">
            <div className="max-w-3xl mx-auto space-y-12">
                {/* Header */}
                <div className="border-b border-white/5 pb-8">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">Acquisition Logistics</span>
                    <h1 className="text-3xl md:text-5xl font-display font-light text-[#FAF9F6] mt-2">Shipping &amp; Transit</h1>
                    <p className="text-xs text-gray-500 tracking-wider mt-2">White-glove curation crating, insured domestic &amp; global transit rules.</p>
                </div>

                <div className="bg-[#090909] border border-white/5 p-8 md:p-12 space-y-8 text-xs font-light tracking-wider leading-relaxed text-gray-400">
                    <section className="space-y-3">
                        <h2 className="text-sm font-display uppercase tracking-widest text-[#FAF9F6]">Museum-Grade Processing</h2>
                        <p>
                            Each unique physical artwork is inspected, wrapped in acid-free archival parchment, secured inside structural edge-guards, and packed in reinforced timber crates. Curatorial preparation takes 2-4 business days before hand-off.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm font-display uppercase tracking-widest text-[#FAF9F6]">Transit Options &amp; Insurance</h2>
                        <p>
                            ArtNestia coordinates insured shipping globally. Full commercial transit values are declared and insured to safeguard the acquisition in case of transit disruptions.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2 text-[#C5A880]">
                            <li><strong>Standard Insured Transit (India):</strong> 4-7 business days — Complimentary curation delivery.</li>
                            <li><strong>White-glove Express Dispatch:</strong> 2-3 business days — ₹1,500 premium.</li>
                            <li><strong>Global Insured Shipping:</strong> 8-15 business days — Calculated dynamically at checkout.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm font-display uppercase tracking-widest text-[#FAF9F6]">Shipment Tracking</h2>
                        <p>
                            An executive dispatch notice containing real-time carrier tracking numbers is sent to your registered profile email as soon as the artwork is dispatched. Telemetry status is also updated in your Account dashboard under Tracking.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm font-display uppercase tracking-widest text-[#FAF9F6]">Transit Damage</h2>
                        <p>
                            In the highly unlikely event that your fine-art acquisition arrives compromised, please document the damage (including the wooden crate) and contact our curatorial desk at <strong>support@artnestia.com</strong> within 24 hours of delivery. We will initiate immediate recovery or complete refund routing.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ShippingPage;

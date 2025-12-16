import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ShieldCheck, Mail } from 'lucide-react';

const ReturnsPage = () => {
    return (
        <div className="min-h-screen bg-cream pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-display text-charcoal mb-6">Returns & Refunds</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        We want you to be completely happy with your Atrangi purchase. If something isn't right, we're here to help.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-sm shadow-sm text-center">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <RefreshCw size={32} />
                        </div>
                        <h3 className="font-bold text-lg mb-3">7-Day Returns</h3>
                        <p className="text-gray-500 text-sm">
                            Return any eligible artwork within 7 days of delivery for a full refund or exchange.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-sm shadow-sm text-center">
                        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="font-bold text-lg mb-3">Authenticity Guarantee</h3>
                        <p className="text-gray-500 text-sm">
                            Every piece comes with a Certificate of Authenticity signed by the artist.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-sm shadow-sm text-center">
                        <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail size={32} />
                        </div>
                        <h3 className="font-bold text-lg mb-3">Easy Process</h3>
                        <p className="text-gray-500 text-sm">
                            Simply email us with your order number and photos to initiate a return.
                        </p>
                    </div>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm space-y-8 text-gray-600 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-charcoal mb-4">Eligibility for Returns</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>The item must be unused and in the same condition that you received it.</li>
                            <li>It must be in the original packaging.</li>
                            <li>You must have the receipt or proof of purchase.</li>
                            <li><strong>Custom commissioned artworks</strong> are final sale and cannot be returned unless damaged during transit.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-charcoal mb-4">Refunds Process</h2>
                        <p>
                            Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
                        </p>
                        <p className="mt-4">
                            If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within 5-10 business days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-charcoal mb-4">Damaged Items</h2>
                        <p>
                            We pack our art with extreme care, but accidents can happen. If your artwork arrives damaged, please email us at <strong>returns@atrangi.com</strong> within 48 hours of delivery with clear photos of the damage and the packaging. We will arrange for a replacement or a full refund immediately.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ReturnsPage;

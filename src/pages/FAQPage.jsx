import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQPage = () => {
    const faqs = [
        {
            question: "What is the dispatch time for curated masterpieces?",
            answer: "Each unique physical artwork is inspected, custom crated, and insured before dispatch. Curatorial preparation takes 2-4 business days. Standard delivery within India takes 4-7 business days. Custom express dispatch can be configured at check-out."
        },
        {
            question: "What is your acquisition return policy?",
            answer: "Due to the unique, one-of-a-kind nature of fine art, all sales are considered final upon delivery. However, we offer a 7-day grace window for standard cataloged acquisitions if you are not fully satisfied. Custom commission briefs are non-refundable."
        },
        {
            question: "How are the canvases packaged?",
            answer: "Every physical canvas is secured inside heavy-duty museum-grade wooden crates, wrapped in archival acid-free paper, bubble wrap, and structural edge guards to guarantee pristine, transit-safe delivery."
        },
        {
            question: "Can I request custom creations from an artisan?",
            answer: "Yes, you can initiate a custom visual project via our 'Commissions' page. We host a 5-step editorial wizard brief that matches you directly with the designated artisan to fit your exact architectural dimensions."
        },
        {
            question: "Do you offer insured international delivery?",
            answer: "Yes, we coordinate global logistics. All international customs duty clearance and custom shipping costs are automatically estimated at checkout based on package dimensions and weight."
        },
        {
            question: "What secure gateways do you accept?",
            answer: "We support major luxury secure gateways, including all international credit cards, secure banking transactions, and digital wallets, under SSL encryptions."
        }
    ];

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#FAF9F6] pt-40 pb-24 px-8">
            <div className="max-w-3xl mx-auto space-y-12">
                {/* Header */}
                <div className="border-b border-white/5 pb-8 text-center space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">Platform Assistance</span>
                    <h1 className="text-3xl md:text-5xl font-display font-light text-[#FAF9F6]">Frequently Asked Questions</h1>
                    <p className="text-xs text-gray-500 tracking-wider mt-2">Essential inquiries regarding acquisitions, commissions, and shipping.</p>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-white/5 bg-[#090909] overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-white/[0.01] transition-colors"
            >
                <span className="font-display font-light text-sm tracking-wider text-[#FAF9F6]">{question}</span>
                {isOpen ? (
                    <Minus size={14} className="text-[#C5A880]" />
                ) : (
                    <Plus size={14} className="text-gray-500" />
                )}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="p-6 pt-0 text-[11px] font-light tracking-wider leading-relaxed text-gray-400 border-t border-white/5">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FAQPage;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQPage = () => {
    const faqs = [
        {
            question: "How long does shipping take?",
            answer: "We strive to deliver your art as quickly as possible. Domestic shipping within India typically takes 5-7 business days. Express shipping options (2-3 days) are available at checkout. International shipping generally takes 10-15 business days depending on the destination and customs clearance."
        },
        {
            question: "What is your return policy?",
            answer: "We want you to love your art! If you are not completely satisfied, we accept returns within 7 days of delivery for a full refund, provided the artwork is in its original condition. Please note that custom commissioned pieces are non-refundable unless they arrive damaged."
        },
        {
            question: "How are the artworks packaged?",
            answer: "We take great care in packaging. Prints are shipped in reinforced tubes, while framed works and canvases are protected with bubble wrap, corner guards, and sturdy cardboard boxes to ensure they arrive safely."
        },
        {
            question: "Can I commission a custom piece from a specific artist?",
            answer: "Absolutely! Visit our 'Commission Art' page, where you can browse artists open for commissions. You can specify your requirements, budget, and style preferences, and we will facilitate the process from concept to delivery."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we ship worldwide! International shipping rates are calculated at checkout based on the package weight and destination. Please be aware that you may be responsible for any local customs duties or taxes."
        },
        {
            question: "How do I support the student artists?",
            answer: "By purchasing from Atrangi, you are directly supporting student creativity. We ensure that 85% of the profit from each sale goes directly to the artist to support their education and artistic journey."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit and debit cards (Visa, Mastercard, Amex), UPI, and Net Banking. All transactions are processed securely."
        }
    ];

    return (
        <div className="min-h-screen bg-cream pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-3xl">
                <h1 className="text-4xl font-display text-charcoal mb-12 text-center">Frequently Asked Questions</h1>

                <div className="space-y-4">
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
        <div className="border border-gray-200 rounded-sm bg-white overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
            >
                <span className="font-medium text-charcoal text-lg">{question}</span>
                {isOpen ? <Minus size={20} className="text-deep-saffron" /> : <Plus size={20} className="text-gray-400" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-6 pt-0 text-gray-500 leading-relaxed border-t border-gray-100">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FAQPage;

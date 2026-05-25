import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, FileText, LayoutGrid, DollarSign, Calendar, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';

const CommissionPage = () => {
    const { user, addCommission } = useStore();
    const { addToast } = useToast();
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        description: '',
        style: 'Minimalist',
        referenceUrl: '',
        dimensions: '36x48 inches',
        budget: 50000,
        timeline: '2 Months',
        customNotes: ''
    });

    const styles = ['Minimalist', 'Abstract', 'Realism', 'Textured Contemporary', 'Conceptual Portrait'];
    const dimensionsList = ['24x36 inches', '36x48 inches', '48x60 inches', 'Custom Gallery Scale'];
    const timelineOptions = ['1 Month (Express)', '2 Months (Recommended)', '3-4 Months (Highly Detailed)'];

    const handleNext = () => {
        if (step === 1 && !formData.description.trim()) {
            addToast("Please provide a brief description of your visual goal.");
            return;
        }
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            addToast("Please sign in or create an account to submit a commission request.");
            return;
        }

        setSubmitting(true);
        try {
            const res = await api.submitCommission({
                ...formData,
                userId: user.id
            });
            // Update local store
            addCommission(res);
            setSuccess(true);
            addToast("Your private commission brief has been submitted successfully.");
        } catch (error) {
            console.error("Commission submission error:", error);
            addToast("Submission failed. Please check backend connection.");
        } finally {
            setSubmitting(false);
        }
    };

    const steps = [
        { num: 1, name: 'The Vision' },
        { num: 2, name: 'References' },
        { num: 3, name: 'Scale' },
        { num: 4, name: 'Investment' },
        { num: 5, name: 'Review' }
    ];

    if (!user) {
        return (
            <div className="min-h-screen bg-[#0D0D0D] text-[#FAF9F6] pt-40 flex flex-col items-center justify-center px-8 text-center space-y-6">
                <Sparkles size={48} className="text-[#C5A880] animate-pulse" strokeWidth={1} />
                <h2 className="text-3xl font-display font-light text-[#FAF9F6]">Private Commission Board</h2>
                <p className="text-xs text-gray-500 tracking-wider max-w-md leading-relaxed">
                    Collaborate directly with our master class student artists to construct custom creations sized for your exact physical environment. Authenticated account access is required.
                </p>
                <a 
                    href="/login" 
                    className="px-10 py-4 bg-[#C5A880] text-[#0D0D0D] text-[10px] tracking-[0.25em] font-bold uppercase hover:bg-[#FAF9F6] transition-colors"
                >
                    Authenticate Access
                </a>
            </div>
        );
    }

    return (
        <div className="bg-[#0D0D0D] text-[#FAF9F6] min-h-screen pt-32 pb-24 px-8 flex items-center justify-center">
            <div className="w-full max-w-2xl bg-[#090909] border border-white/5 p-8 md:p-12 shadow-2xl relative">
                {/* Visual Progress Bar */}
                <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
                    {steps.map((s) => (
                        <div key={s.num} className="flex flex-col items-center gap-2 flex-1">
                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all ${
                                step >= s.num 
                                    ? 'bg-[#C5A880] border-[#C5A880] text-[#0D0D0D]' 
                                    : 'border-white/10 text-gray-600'
                            }`}>
                                {s.num}
                            </div>
                            <span className={`text-[8px] uppercase tracking-wider hidden sm:inline ${
                                step === s.num ? 'text-[#FAF9F6] font-bold' : 'text-gray-600'
                            }`}>
                                {s.name}
                            </span>
                        </div>
                    ))}
                </div>

                {success ? (
                    /* Final Success Screen */
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-8 py-10"
                    >
                        <CheckCircle size={56} className="text-[#C5A880] mx-auto animate-bounce" strokeWidth={1} />
                        <div className="space-y-3">
                            <h2 className="text-3xl font-display font-light">Brief Registered</h2>
                            <p className="text-xs text-gray-500 tracking-wider max-w-md mx-auto leading-relaxed">
                                Your bespoke commission visual brief is verified. An administrator and selected artists from your designated academy will review the specs and send draft pitches directly to your Studio account tab.
                            </p>
                        </div>
                        <div className="pt-4 flex justify-center gap-4">
                            <a 
                                href="/account" 
                                className="px-10 py-4 bg-[#C5A880] text-[#0D0D0D] text-[10px] tracking-[0.25em] font-bold uppercase hover:bg-[#FAF9F6] transition-colors"
                            >
                                Track Status
                            </a>
                            <Link 
                                to="/gallery" 
                                className="px-10 py-4 border border-white/10 text-[#FAF9F6] text-[10px] tracking-[0.25em] font-bold uppercase hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                            >
                                Back to Gallery
                            </Link>
                        </div>
                    </motion.div>
                ) : (
                    /* Form Step Router */
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <AnimatePresence mode="wait">
                            {/* STEP 1: VISION */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium flex items-center gap-2">
                                            <FileText size={12} /> Step 1 / 5
                                        </span>
                                        <h3 className="text-2xl font-display font-light text-[#FAF9F6]">The Visual Concept</h3>
                                        <p className="text-[11px] text-gray-500 tracking-wider leading-relaxed">
                                            Describe the core theme, emotional narrative, color temperatures, or room textures you wish to cultivate.
                                        </p>
                                    </div>

                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Type your design narrative here..."
                                        rows={6}
                                        className="w-full bg-[#121212] border border-white/5 p-4 text-xs tracking-wider leading-relaxed outline-none focus:border-[#C5A880]/50 placeholder-gray-700"
                                        required
                                    />
                                </motion.div>
                            )}

                            {/* STEP 2: REFERENCES & STYLE */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-2">
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium flex items-center gap-2">
                                            <Sparkles size={12} /> Step 2 / 5
                                        </span>
                                        <h3 className="text-2xl font-display font-light text-[#FAF9F6]">Aesthetic Style</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block font-semibold">Select Target Style</label>
                                        <div className="flex flex-wrap gap-3">
                                            {styles.map((st) => (
                                                <button
                                                    key={st}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, style: st })}
                                                    className={`px-6 py-2.5 text-[10px] uppercase tracking-widest font-medium transition-all ${
                                                        formData.style === st 
                                                            ? 'bg-[#C5A880] text-[#0D0D0D]' 
                                                            : 'bg-[#121212] border border-white/5 text-gray-400 hover:border-white/20'
                                                    }`}
                                                >
                                                    {st}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block font-semibold">Optional Reference URL</label>
                                        <input
                                            type="url"
                                            value={formData.referenceUrl}
                                            onChange={(e) => setFormData({ ...formData, referenceUrl: e.target.value })}
                                            placeholder="Paste Unsplash, Pinterest, or image address..."
                                            className="w-full bg-[#121212] border border-white/5 p-4 text-xs tracking-wider outline-none focus:border-[#C5A880]/50 placeholder-gray-700"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: SCALE & DIMENSIONS */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-2">
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium flex items-center gap-2">
                                            <LayoutGrid size={12} /> Step 3 / 5
                                        </span>
                                        <h3 className="text-2xl font-display font-light text-[#FAF9F6]">Physical Scale</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block font-semibold">Standard Canvas Scale</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {dimensionsList.map((dim) => (
                                                <button
                                                    key={dim}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, dimensions: dim })}
                                                    className={`p-4 border text-left text-xs uppercase tracking-widest transition-all ${
                                                        formData.dimensions === dim 
                                                            ? 'border-[#C5A880] bg-[#C5A880]/5 text-[#FAF9F6]' 
                                                            : 'border-white/5 bg-[#121212]/30 text-gray-400 hover:border-white/10'
                                                    }`}
                                                >
                                                    {dim}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4: BUDGET & TIMELINE */}
                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-2">
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium flex items-center gap-2">
                                            <DollarSign size={12} /> Step 4 / 5
                                        </span>
                                        <h3 className="text-2xl font-display font-light text-[#FAF9F6]">Budget & Timeframe</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block font-semibold">Budget Investment (₹)</label>
                                        <input
                                            type="number"
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-[#121212] border border-white/5 p-4 text-xs tracking-wider outline-none focus:border-[#C5A880]/50"
                                            min="5000"
                                        />
                                        <span className="text-[9px] text-gray-600 block tracking-widest uppercase">Minimum recommended commission pricing starts at ₹10,000.</span>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block font-semibold flex items-center gap-2"><Calendar size={12} /> Allocated Delivery Window</label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {timelineOptions.map((time) => (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, timeline: time })}
                                                    className={`p-4 border text-left text-xs uppercase tracking-widest transition-all ${
                                                        formData.timeline === time 
                                                            ? 'border-[#C5A880] bg-[#C5A880]/5 text-[#FAF9F6]' 
                                                            : 'border-white/5 bg-[#121212]/30 text-gray-400 hover:border-white/10'
                                                    }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 5: REVIEW BRIEF */}
                            {step === 5 && (
                                <motion.div
                                    key="step5"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-2">
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium">Step 5 / 5</span>
                                        <h3 className="text-2xl font-display font-light text-[#FAF9F6]">Final Verification</h3>
                                        <p className="text-[11px] text-gray-500 tracking-wider">Please review your luxury creation specs before submitting.</p>
                                    </div>

                                    <div className="bg-[#121212]/40 border border-white/5 p-6 rounded-none space-y-4 text-xs font-light tracking-widest leading-relaxed">
                                        <div className="border-b border-white/5 pb-3">
                                            <span className="text-gray-500 block text-[9px] uppercase pb-1">Concept Summary</span>
                                            <p className="text-[#FAF9F6] italic">"{formData.description}"</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <span className="text-gray-500 block text-[9px] uppercase pb-1">Bespoke Style</span>
                                                <span className="text-[#C5A880] font-bold uppercase">{formData.style}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-[9px] uppercase pb-1">Canvas Size</span>
                                                <span className="text-[#FAF9F6] font-medium">{formData.dimensions}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-[9px] uppercase pb-1">Budget</span>
                                                <span className="text-[#C5A880] font-bold">₹{formData.budget.toLocaleString()}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-[9px] uppercase pb-1">Timeframe</span>
                                                <span className="text-[#FAF9F6] font-medium">{formData.timeline}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Interactive Navigation buttons */}
                        <div className="flex justify-between items-center border-t border-white/5 pt-8 mt-12">
                            {step > 1 ? (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="inline-flex items-center text-xs tracking-widest uppercase hover:text-[#C5A880] transition-colors p-2"
                                >
                                    <ArrowLeft size={14} className="mr-2" /> Back
                                </button>
                            ) : (
                                <div />
                            )}

                            {step < 5 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-10 py-4 bg-[#C5A880] text-[#0D0D0D] text-[10px] tracking-[0.25em] font-bold uppercase hover:bg-[#FAF9F6] transition-colors flex items-center gap-2"
                                >
                                    Next Step <ArrowRight size={12} />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-12 py-4 bg-[#C5A880] text-[#0D0D0D] text-[10px] tracking-[0.25em] font-bold uppercase hover:bg-[#FAF9F6] transition-colors flex items-center gap-2"
                                >
                                    {submitting ? 'Registering Brief...' : 'Confirm & Submit Brief'}
                                </button>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CommissionPage;

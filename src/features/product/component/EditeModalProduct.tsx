import React, { useRef, useEffect } from 'react';
import { X, Loader2, Image as ImageIcon } from 'lucide-react';

const EditModalProduct = ({
    isOpen,
    onClose,
    onSubmit,
    formData,
    onInputChange,
    onFileChange,
    rawImageFile,
    isLoading = false
}) => {
    const fileInputRef = useRef(null);
    const AGRICULTURAL_CATEGORIES = ["Tractor Trolleys", "Cultivators", "Agricultural Tools", "Hydraulic Equipment", "Dustbins"];

    // 🎯 Accessibility Guard: Close pop-up instantly when pressing 'Escape'
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen && !isLoading) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isLoading, onClose]);

    if (!isOpen) return null;
    return (
        <div 
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto animate-in fade-in duration-200"
            onClick={!isLoading ? onClose : undefined}
        >
            <div 
                className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 md:p-8 relative max-h-[95vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150 font-sans text-slate-800"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Section */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                            <span className="text-[#52C5C3]">✏️</span> Edit Product Specifications
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">Modify database parameters for this machinery record</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-40"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Form Processing Sheet */}
                <form onSubmit={onSubmit} className="space-y-4">
                    
                    {/* 1. Card Index Sorting Order Field */}
                    <div className="flex flex-col space-y-1.5">
                        <label className="text-xs text-slate-600 font-semibold tracking-wide uppercase">Card Position Index</label>
                        <input 
                            type="number" 
                            name="card_index" 
                            min="1"
                            value={formData.card_index} 
                            onChange={onInputChange} 
                            required 
                            className="w-full bg-white text-slate-700 p-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#52C5C3]" 
                        />
                    </div>

                    {/* 2. File Upload Binary Browser Row with Live Frame Preview */}
                    <div className="flex flex-col space-y-1.5">
                        <label className="text-xs text-slate-600 font-semibold tracking-wide uppercase">Product Image Asset</label>
                        <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div className="w-16 h-12 rounded-lg bg-white border border-slate-200/60 overflow-hidden flex items-center justify-center shrink-0">
                                {formData.product_image ? (
                                    <img src={formData.product_image} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <ImageIcon size={16} className="text-slate-300" />
                                )}
                            </div>
                            <div className="relative flex gap-2 flex-1">
                                <input 
                                    type="text" 
                                    readOnly
                                    value={rawImageFile ? rawImageFile.name : ''} 
                                    placeholder={formData.product_image ? "Retaining original database image path..." : "Upload machinery picture..."} 
                                    className="w-full bg-white text-slate-500 p-2 rounded-lg border border-slate-200 text-sm cursor-not-allowed truncate" 
                                />
                                <input type="file" ref={fileInputRef} onChange={onFileChange} accept="image/*" className="hidden" />
                                <button 
                                    type="button" 
                                    onClick={() => fileInputRef.current?.click()} 
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200 whitespace-nowrap cursor-pointer"
                                >
                                    Browse...
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 3. Product Title Input */}
                    <div className="flex flex-col space-y-1.5">
                        <label className="text-xs text-slate-600 font-semibold tracking-wide uppercase">Product Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title} 
                            onChange={onInputChange} 
                            required 
                            placeholder="Rigid Cultivator" 
                            className="w-full bg-white text-slate-700 p-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#52C5C3]" 
                        />
                    </div>

                    {/* 4. Category Dropdown Selection Grid Option */}
                    <div className="flex flex-col space-y-1.5">
                        <label className="text-xs text-slate-600 font-semibold tracking-wide uppercase">Category Segment</label>
                        <select 
                            name="category" 
                            value={formData.category} 
                            onChange={onInputChange} 
                            required 
                            className="w-full bg-white text-slate-700 p-2 rounded-lg border border-slate-200 text-sm cursor-pointer focus:outline-none focus:border-[#52C5C3]"
                        >
                            {AGRICULTURAL_CATEGORIES.map((cat, i) => (
                                <option key={i} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* 5. Pricing Attributes Layout Parameters Matrix Group */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs text-slate-600 font-semibold tracking-wide uppercase">Price Label</label>
                            <select 
                                name="price_label" 
                                value={formData.price_label} 
                                onChange={onInputChange} 
                                className="w-full bg-white text-slate-700 p-2 rounded-lg border border-slate-200 text-sm cursor-pointer focus:outline-none focus:border-[#52C5C3]"
                            >
                                <option value="MRP">MRP</option>
                                <option value="Offer Price">Offer Price</option>
                                <option value="MSRP Price">MSRP Price</option>
                            </select>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs text-slate-600 font-semibold tracking-wide uppercase">Currency Type</label>
                            <select 
                                name="currency" 
                                value={formData.currency} 
                                onChange={onInputChange} 
                                className="w-full bg-white text-slate-700 p-2 rounded-lg border border-slate-200 text-sm cursor-pointer focus:outline-none focus:border-[#52C5C3]"
                            >
                                <option value="₹">Rupees (₹)</option>
                                <option value="$">Dollars ($)</option>
                                <option value="€">Euros (€)</option>
                            </select>
                        </div>

                        {/* Complete Pricing Attributes Layout Parameters Matrix Group: Amount Input */}
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs text-slate-600 font-semibold tracking-wide uppercase">Amount</label>
                            <input 
                                type="number" 
                                name="amount" 
                                value={formData.amount} 
                                onChange={onInputChange} 
                                required 
                                placeholder="20000" 
                                className="w-full bg-white text-slate-700 p-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#52C5C3]" 
                            />
                        </div>
                    </div>

                    {/* ====================================================
                        6. PRODUCT BADGES CONFIGURATIONS AND RATINGS SYSTEM 
                       ==================================================== */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs text-slate-600 font-semibold tracking-wide uppercase">Badge Type</label>
                            <select 
                                name="badge_type" 
                                value={formData.badge_type} 
                                onChange={onInputChange} 
                                className="w-full bg-white text-slate-700 p-2 rounded-lg border border-slate-200 text-sm cursor-pointer focus:outline-none focus:border-[#52C5C3]"
                            >
                                <option value="Normal">Normal (No Flag)</option>
                                <option value="Sale">Sale</option>
                                <option value="New">New</option>
                                <option value="Hot">Hot</option>
                            </select>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs text-slate-600 font-semibold tracking-wide uppercase">Badge Color String</label>
                            <input 
                                type="text" 
                                name="badge_color" 
                                value={formData.badge_color} 
                                onChange={onInputChange} 
                                required 
                                placeholder="e.g. Red or #ef4444" 
                                disabled={formData.badge_type === 'Normal'}
                                className="w-full bg-white text-slate-700 p-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#52C5C3] disabled:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400 font-medium" 
                            />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs text-slate-600 font-semibold tracking-wide uppercase">Rating Stars (1-5)</label>
                            <input 
                                type="number" 
                                name="rating_stars" 
                                min="1" 
                                max="5" 
                                value={formData.rating_stars} 
                                onChange={onInputChange} 
                                required 
                                className="w-full bg-white text-slate-700 p-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#52C5C3]" 
                            />
                        </div>
                    </div>

                    {/* ====================================================
                        🎯 FOOTER INTERACTIVE ACTIONS BUTTON STRIP 
                       ==================================================== */}
                    <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5 mt-6">
                        <button
                          type="button"
                          onClick={onClose}
                          disabled={isLoading}
                          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Cancel
                        </button>
                        
                        <button 
                          type="submit" 
                          disabled={isLoading}
                          className="px-6 py-2.5 bg-[#52C5C3] hover:bg-[#45b4b2] text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-cyan-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 size={14} className="animate-spin" />
                              <span>Saving configurations...</span>
                            </>
                          ) : (
                            <span>Save Changes</span>
                          )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditModalProduct;

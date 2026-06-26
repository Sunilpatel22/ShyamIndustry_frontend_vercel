import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Check } from 'lucide-react';

// 🎯 ACCEPTS PROPS: Receives the data object passed down from the form
const PreviewLive = ({ formData }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    // Formats strings or values safely to Indian standard currency comma layout (en-IN)
    const formatPreviewCurrency = (amount) => {
        if (!amount) return '0.00';
        const cleanAmount = typeof amount === 'string' ? amount.replace(/,/g, '') : amount;
        const parsed = parseFloat(cleanAmount);
        return isNaN(parsed) ? '0.00' : parsed.toLocaleString('en-IN', { minimumFractionDigits: 2 });
    };

    return (
        <div className="flex flex-col h-full justify-start">
            <span className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-widest select-none">Live Grid Card Preview</span>

            <div className="w-full bg-white rounded-2xl border border-slate-200/60 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group relative">

                {/* Dynamic Badge Display */}
                {formData?.badge_type && formData.badge_type !== 'Normal' && (
                    <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md text-white z-10" style={{ backgroundColor: formData.badge_color || '#3b82f6' }}>
                        {formData.badge_type}
                    </span>
                )}

                {/* Wishlist Button Toggle */}
                <button type="button" onClick={() => setIsWishlisted(!isWishlisted)} className={`absolute top-3 right-3 p-1.5 rounded-xl border transition-all z-10 ${isWishlisted ? 'bg-rose-50 text-rose-500 border-rose-100' : 'bg-white/80 text-slate-400'}`}>
                    <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
                </button>

                {/* Dynamic Product Image Preview Canvas Container */}
                <div className="w-full aspect-[4/3] bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100 relative">
                    {formData?.product_image ? (
                        <img
                            src={formData.product_image}
                            alt="Preview Asset"
                            className="w-full h-full object-contain p-2 select-none pointer-events-none transition-transform duration-300 group-hover:scale-103"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-1 text-slate-400 select-none">
                            <span className="text-xs text-slate-400 font-medium">No Image Loaded</span>
                        </div>
                    )}
                </div>



                {/* Text Metadata Area Frame */}
                <div className="p-4 flex flex-col space-y-2.5">
                    {/* Live Category */}
                    <span className="text-[10px] font-bold text-[#52C5C3] uppercase tracking-wider truncate">
                        {formData?.category || 'Unassigned Category'}
                    </span>

                    {/* Live Product Title */}
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight line-clamp-2 h-9">
                        {formData?.title || 'Untitled Equipment Title'}
                    </h3>

                    {/* Dynamic Rating System Loops */}
                    <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, index) => {
                            const isFilled = index < (Number(formData?.rating_stars) || 5);
                            return <Star key={index} size={12} fill={isFilled ? "currentColor" : "none"} className={isFilled ? "text-amber-400" : "text-slate-200"} />;
                        })}
                    </div>

                    {/* Price Block Metadata Row */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div className="flex flex-col min-w-0">
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider truncate">{formData?.price_label || 'MRP'}</span>
                            <span className="text-sm font-bold text-slate-900 tracking-tight truncate">
                                {formData?.currency || '₹'}{formatPreviewCurrency(formData?.amount)}
                            </span>
                        </div>

                        <button type="button" onClick={() => { setIsAddedToCart(true); setTimeout(() => setIsAddedToCart(false), 2000); }} className={`p-2 rounded-xl text-white ${isAddedToCart ? 'bg-emerald-500' : 'bg-slate-900'}`}>
                            {isAddedToCart ? <Check size={14} /> : <ShoppingCart size={14} />}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PreviewLive;

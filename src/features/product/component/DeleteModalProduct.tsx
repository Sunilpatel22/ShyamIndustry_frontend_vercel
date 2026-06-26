import React, { useEffect } from 'react';
import { Trash2, X, Loader2 } from 'lucide-react';

const DeleteModalProduct = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isLoading = false 
}) => {
  
  // 🎯 Accessibility Bindings: Pressing Escape drops the modal view automatically
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
      className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 transition-all duration-300 animate-in fade-in duration-200"
      onClick={!isLoading ? onClose : undefined} // Close when clicking on backdrop shadow
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-sm border border-slate-100 shadow-2xl p-6 relative text-center space-y-4 animate-in fade-in zoom-in-95 duration-150 transform-gpu"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the card container
      >
        
        {/* Top Close Header Indicator Cross */}
        <button 
          type="button" 
          onClick={onClose} 
          disabled={isLoading}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Close deletion confirmation panel"
        >
          <X size={16} />
        </button>

        {/* Warning Icon Badge Container */}
        <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 border border-rose-100 animate-pulse">
          <Trash2 size={20} />
        </div>

        {/* Main Text Content Details Frame */}
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center justify-center gap-1.5">
            Confirm Deletion
          </h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed px-2">
            Are you absolutely sure you want to permanently delete this product document? This action cannot be undone.
          </p>
        </div>

        {/* Operational Interaction Actions Grid Button Group */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            No, Keep It
          </button>
          
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-rose-600/10 flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-rose-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Dropping...</span>
              </>
            ) : (
              <span>Yes, Delete</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteModalProduct;

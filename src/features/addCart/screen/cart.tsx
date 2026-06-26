import React, { useEffect } from 'react';
import { useCartStore } from '../cart.store'; // 🎯 Linked safely to your exported hook setup name
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  // 🎯 FIXED: Swapped useCartStore for useCartStore to match your Zustand export declaration perfectly
  const { cartItems, fetchCart, updateCartQuantity, removeItem, isLoading } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchCart) fetchCart();
  }, [fetchCart]);

  // Helper utility to safely parse and sanitise your backend string amount formatting
  const parseAmountToFloat = (amountStr) => {
    if (!amountStr) return 0;
    const cleanStr = String(amountStr).replace(/,/g, '');
    const parsed = parseFloat(cleanStr);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Live item total computations
  const calculateTotals = () => {
    let subtotal = 0;
    let currencySymbol = '₹';

    if (Array.isArray(cartItems)) {
      cartItems.forEach(item => {
        if (item.productId) {
          const itemPrice = parseAmountToFloat(item.productId.amount);
          subtotal += itemPrice * (item.quantity || 1);
          if (item.productId.currency) currencySymbol = item.productId.currency;
        }
      });
    }

    return {
      subtotal: subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
      grandTotal: subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
      currencySymbol
    };
  };

  const { subtotal, grandTotal, currencySymbol } = calculateTotals();

  if (isLoading && (!cartItems || cartItems.length === 0)) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-3">
        <Loader2 className="w-8 h-8 text-[#52C5C3] animate-spin" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verifying secure cart contents...</p>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans py-8 px-4 sm:px-6 md:px-12 selection:bg-[#52C5C3]/30">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Back Button Link Header */}
        <button
          type="button"
          onClick={() => navigate('/product')}
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider group cursor-pointer"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          Back to Machinery Catalog
        </button>

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight border-b border-slate-200 pb-3">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          /* Empty Cart State Container */
          <div className="w-full bg-white rounded-2xl border border-slate-200/60 p-12 flex flex-col items-center justify-center text-center space-y-4 shadow-xs">
            <div className="p-4 bg-slate-50 rounded-full text-slate-400">
              <ShoppingBag size={32} />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-800">Your cart is currently empty</h2>
              <p className="text-xs text-slate-400 max-w-xs">Explore our collections to add high-performance tools and industrial machinery products.</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/product')}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-sm active:scale-98 cursor-pointer uppercase tracking-wider"
            >
              Browse Products
            </button>
          </div>
        ) : (
          /* Active E-Commerce Workspace Matrix Layout grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column: Cart Item Row Stack Cards */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                if (!item.productId) return null;
                const prod = item.productId;

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-4 flex flex-col sm:flex-row items-center gap-4 transition-all hover:border-slate-300"
                  >
                    {/* Embedded Product Image Frame */}
                    <div className="w-24 h-20 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                      {prod.product_image ? (
                        <img src={prod.product_image} alt={prod.title} className="w-full h-full object-contain p-1.5" />
                      ) : (
                        <ShoppingBag size={18} className="text-slate-300" />
                      )}
                    </div>

                    {/* Metadata Parameter Info Descriptions Block */}
                    <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
                      <span className="text-[9px] font-black text-[#52C5C3] uppercase tracking-wider">{prod.category}</span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-800 truncate tracking-tight">{prod.title}</h3>
                      <span className="text-xs font-extrabold text-slate-900 block">
                        {prod.currency || '₹'}{parseFloat(String(prod.amount).replace(/,/g, '')).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    {/* Interactive Quantity Adjuster & Removal Row Blocks */}
                    <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                      <div className="flex items-center border border-slate-200 bg-slate-50/50 rounded-xl overflow-hidden p-0.5 shadow-inner">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(prod._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white rounded-lg transition-colors disabled:opacity-30 cursor-pointer"
                        >
                          <Minus size={12} className="stroke-[2.5]" />
                        </button>
                        <span className="text-xs font-black text-slate-800 px-3 min-w-[2rem] text-center select-none">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(prod._id, item.quantity + 1)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white rounded-lg transition-colors cursor-pointer"
                        >
                          <Plus size={12} className="stroke-[2.5]" />
                        </button>
                      </div>

                      {/* Single Item Destruction Trigger Button */}
                      <button
                        type="button"
                        onClick={() => removeItem(prod._id)}
                        className="text-slate-400 hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete product item row from cart"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Checkout Order Summary Panel Card container */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-xs space-y-4 sticky top-6">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Order Summary</h2>
              
              <div className="space-y-2.5 border-b border-slate-100 pb-4 text-xs font-semibold text-slate-500">
                <div className="flex justify-between items-center">
                  <span>Subtotal Amount</span>
                  <span className="text-slate-800 font-bold">{currencySymbol}{subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-emerald-600 text-[11px] font-bold">
                  <span>Shipping & Handling</span>
                  <span className="uppercase tracking-wider">Free Delivery</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm font-black text-slate-900 tracking-tight pt-1">
                <span>Grand Total Total</span>
                <span className="text-[#52C5C3] text-base">{currencySymbol}{grandTotal}</span>
              </div>

              {/* Secure Checkout Form CTA Action Triggers Button */}
              <button
                type="button"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-md shadow-slate-900/10 hover:shadow-lg active:scale-98 cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2 mt-2"
              >
                Proceed to Secure Checkout
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium pt-1">
                <ShieldCheck size={14} className="text-emerald-500" />
                Guaranteed safe and encrypted checkout transactions.
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

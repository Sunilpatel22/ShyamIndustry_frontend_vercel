import React, { useEffect } from 'react';
import { useWishlistStore } from '../wishlist.store'; // 🎯 Path mapped to match your exact hook store
import { useCartStore } from '../../addCart/cart.store'; // 🎯 Maps into your cart state engine layout triggers
import { Heart, ShoppingCart, ShoppingBag, ArrowLeft, Loader2, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  // 🎯 Selectors explicitly reading from your provided useWishlistStore structure
  const wishlistItems = useWishlistStore((state) => state.wishlistItems);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
  const isLoading = useWishlistStore((state) => state.isLoading);

  // 🎯 FIX 2: Point the selector hook reference to read from 'useCartStore' cleanly
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchWishlist) fetchWishlist();
  }, [fetchWishlist]);

  // Safe formatting parsing helper utility
  const formatCurrency = (amount) => {
    if (!amount) return "0.00";
    const cleanAmount = typeof amount === "string" ? amount.replace(/,/g, "") : amount;
    const parsed = parseFloat(cleanAmount);
    return isNaN(parsed) ? "0.00" : parsed.toLocaleString('en-IN', { minimumFractionDigits: 2 });
  };

  if (isLoading && (!wishlistItems || wishlistItems.length === 0)) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-3">
        <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading your favorites catalog...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans py-8 px-4 sm:px-6 md:px-12 selection:bg-rose-500/10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Back Link Nav Bar Header */}
        <button
          type="button"
          onClick={() => navigate('/product')}
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider group cursor-pointer"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          Back to Machinery Catalog
        </button>

        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            My Wishlist
          </h1>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            {wishlistItems?.length || 0} Saved Items
          </span>
        </div>

        {(!wishlistItems || wishlistItems.length === 0) ? (
          /* Empty Favorites Placeholder State View Block Container */
          <div className="w-full bg-white rounded-2xl border border-slate-200/60 p-12 flex flex-col items-center justify-center text-center space-y-4 shadow-xs">
            <div className="p-4 bg-rose-50 text-rose-400 rounded-full animate-pulse">
              <Heart size={32} fill="currentColor" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-800">Your wishlist is empty</h2>
              <p className="text-xs text-slate-400 max-w-xs">Tap the heart icons on industrial machinery products to organize collections here.</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/product')}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-sm active:scale-98 cursor-pointer uppercase tracking-wider"
            >
              Explore Products
            </button>
          </div>
        ) : (
          /* Active Favourites Matrix Grid Map Content Loop Workspace Layer */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => {
              if (!product) return null;
              const productId = product._id || product.id;

              return (
                <div
                  key={productId}
                  className="bg-white rounded-2xl border border-slate-200/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col group relative"
                >
                  {/* Badge Marker Block */}
                  {product.badge?.text_label && product.badge.text_label !== 'Normal' && (
                    <span
                      className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-sm z-10 text-white"
                      style={{ backgroundColor: product.badge.background_color || '#3b82f6' }}
                    >
                      {product.badge.text_label}
                    </span>
                  )}

                  {/* Absolute Position Removal Action Trigger */}
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      type="button"
                      onClick={() => toggleWishlist(productId)}
                      className="backdrop-blur-xs p-1.5 rounded-xl border shadow-xs bg-rose-50 text-rose-500 border-rose-100 hover:bg-rose-100 transition-colors duration-150 cursor-pointer"
                      title="Remove entity listing from favorites layout dashboard"
                    >
                      <Heart size={14} fill="currentColor" />
                    </button>
                  </div>

                  {/* Image Canvas Panel Container Frame */}
                  <div className="w-full aspect-[4/3] bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100 relative">
                    {product.product_image ? (
                      <img src={product.product_image} alt={product.title} className="w-full h-full object-contain p-2 select-none pointer-events-none transition-transform duration-300 group-hover:scale-103" />
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-slate-400"><span className="text-[10px] uppercase">No image layout found</span></div>
                    )}
                  </div>

                  {/* Card Content Descriptive Metadata Layer Wrap */}
                  <div className="p-4 flex flex-col flex-1 space-y-2.5 pb-4">
                    <span className="text-[10px] font-bold text-[#52C5C3] uppercase tracking-wider">{product.category}</span>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight leading-snug line-clamp-2 h-9">{product.title}</h3>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, index) => (
                        <Star key={index} size={12} fill={index < (product.rating_stars || 5) ? "currentColor" : "none"} className={index < (product.rating_stars || 5) ? "text-amber-400" : "text-slate-200"} />
                      ))}
                      <span className="text-[10px] text-slate-400 ml-1 font-bold">({product.rating_stars || 5})</span>
                    </div>

                    {/* Footer MSRP Info & Immediate Add To Cart Workflow Button Action Triggers */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider truncate">{product.price_label || "MSRP Price"}</span>
                        <span className="text-sm font-bold text-slate-900 tracking-tight truncate">{product.currency || "₹"}{formatCurrency(product.amount)}</span>
                      </div>

                      <button
                        onClick={() => addToCart(productId, 1)}
                        type="button"
                        className="bg-slate-900 hover:bg-slate-800 text-white p-2 rounded-xl transition-colors duration-150 shadow-sm cursor-pointer shrink-0 flex items-center gap-1.5 text-xs font-bold px-3 py-2 hover:shadow-md active:scale-98"
                        aria-label="Add item straight to shopping cart page"
                      >
                        <ShoppingCart size={13} />
                        <span className="text-[10px] uppercase tracking-wide">Buy</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

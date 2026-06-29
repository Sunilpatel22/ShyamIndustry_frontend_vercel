import React, { useState, useEffect } from 'react';
import { Heart, Star, ShoppingCart, Filter, Loader2, Edit2, Trash2 } from 'lucide-react';
import { useGetAllProductStore } from '../product.store';
import { useAuthStore } from '../../auth/auth.store';
import { useCartStore } from '../../addCart/cart.store';
import { useWishlistStore } from '../../wishlist/wishlist.store';
import DeleteModalProduct from '../component/DeleteModalProduct';
import EditModalProduct from '../component/EditeModalProduct';
import toast from 'react-hot-toast';

const Product = () => {
  const { products = [], fetchProducts, updateProduct, deleteProduct, isLoading, searchQuery } = useGetAllProductStore();

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  // ====================================================
  // 🎯 GLOBAL STATE LISTENERS (ZUSTAND STORES)
  // ====================================================
  const addToCart = useCartStore((state) => state.addToCart);
  const wishlistedIds = useWishlistStore((state) => state.wishlistedIds);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);

  // Synchronize dynamic lists upon screen hydration lifecycle
  useEffect(() => {
    if (fetchProducts) fetchProducts();
    if (fetchWishlist && token) fetchWishlist();
  }, [fetchProducts, fetchWishlist, token]);

  // Deletion Local Layout View States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Editing Local Layout View States
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Hardened data parsing schema reflecting backend document keys perfectly
  const [editFormData, setEditFormData] = useState({
    card_index: 1,
    title: '',
    category: 'Tractor Trolleys',
    price_label: 'MRP',
    currency: '₹',
    amount: '',
    badge_type: 'Normal',
    badge_color: 'Red',
    rating_stars: 5,
    product_image: ''
  });

  const isLoggedIn = !!token;
  const isAdmin = isLoggedIn && user?.role === 'admin';

  const categories = ["All", "Tractor Trolleys", "Cultivators", "Agricultural Tools", "Hydraulic Equipment", "Dustbins"];
  const [activeCategory, setActiveCategory] = useState("All");

  const formatCurrency = (amount) => {
    if (!amount) return "0.00";
    const cleanAmount = typeof amount === "string" ? amount.replace(/,/g, "") : amount;
    const parsed = parseFloat(cleanAmount);
    return isNaN(parsed) ? "0.00" : parsed.toLocaleString('en-IN', { minimumFractionDigits: 2 });
  };

  // ====================================================
  // 🎯 Hardened Editing Data Bind Mappers
  // ====================================================
  const handleEditClick = (product) => {
    if (!product) return;

    setEditingId(product._id || product.id);
    setSelectedFile(null);

    setEditFormData({
      card_index: product.card_index || 1,
      title: product.title || '',
      category: product.category || 'Tractor Trolleys',
      price_label: product.price_label || 'MRP',
      currency: product.currency || '₹',
      amount: product.amount || '',
      badge_type: product.badge?.text_label || 'Normal',
      badge_color: product.badge?.background_color || 'Red',
      rating_stars: product.rating_stars || 5,
      product_image: product.product_image || ''
    });

    setIsEditOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: name === 'card_index' || name === 'rating_stars' ? Number(value) : value
    }));
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Creates a temporary in-browser local storage preview link string
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData(prev => ({ ...prev, product_image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ====================================================
  // 🎯 DYNAMIC LIVE SEARCH & CATEGORY FILTER ENGINE
  // ====================================================
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" ||
      product.category?.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch = !searchQuery ||
      product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    if (!editingId) return;

    setIsSavingEdit(true);
    try {
      const packet = new FormData();

      // Append binary asset tracking parameters safely if updated by the client
      if (selectedFile) {
        packet.append('product_image', selectedFile);
      }

      packet.append('card_index', String(editFormData.card_index || 1));
      packet.append('title', String(editFormData.title || '').trim());
      packet.append('category', String(editFormData.category || 'Tractor Trolleys'));
      packet.append('price_label', String(editFormData.price_label || 'MRP'));
      packet.append('currency', String(editFormData.currency || '₹'));
      packet.append('amount', String(editFormData.amount || '0'));

      packet.append('badge_text', String(editFormData.badge_type || 'Normal').trim());
      packet.append('badge_color', String(editFormData.badge_color || 'Red').trim());
      packet.append('rating_stars', String(editFormData.rating_stars || 5));

      if (updateProduct) {
        const result = await updateProduct(editingId, packet);
        if (result?.success || result) {
          setIsEditOpen(false);
          if (fetchProducts) fetchProducts();
          toast.success('Product catalog updated successfully!', {
            style: { background: '#0f172a', color: '#ffffff' }
          });
        } else {
          toast.error(result?.error || "The server rejected this update request.");
        }
      }
    } catch (err) {
      console.error("❌ Detail Form Submission Crash Context Log:", err);
      toast.error('Failed to commit modifications into database schema maps.');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // ====================================================
  // 🎯 Deletion Handlers
  // ====================================================
  const handleDeleteClick = (id) => {
    setTargetDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!targetDeleteId) return;
    setIsDeleting(true);
    try {
      const result = await deleteProduct(targetDeleteId);
      if (result?.success || result) {
        setIsDeleteOpen(false);
        toast.success('Product document purged completely from database.', {
          style: { background: '#334155', color: '#ffffff' }
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('An anomaly dropped your data extraction drop requests.');
    } finally {
      setIsDeleting(false);
      setTargetDeleteId(null);
    }
  };

  if (isLoading && !isDeleteOpen && !isEditOpen) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-3">
        <Loader2 className="w-8 h-8 text-[#52C5C3] animate-spin" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading machinery catalog...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#52C5C3]/30 py-8 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Categories Bar */}
        <div className="w-full flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none border-b border-slate-200">
          <div className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 shrink-0"><Filter size={16} /></div>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase whitespace-nowrap transition-all border duration-150 cursor-pointer ${activeCategory === cat
                  ? 'bg-[#52C5C3] text-white border-[#52C5C3] shadow-md shadow-cyan-500/10'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Headings */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Our Products</h1>
          <p className="text-xs font-light text-slate-400 uppercase tracking-widest">{filteredProducts.length} items found matching selector</p>
        </div>

        {/* Product Cards Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const productId = product._id || product.id;
            const isWishlisted = Array.isArray(wishlistedIds) && wishlistedIds.includes(productId);

            return (
              <div
                key={productId}
                className="bg-white rounded-2xl border border-slate-200/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col group relative"
              >
                {/* Product Badge Marker Overlay */}
                {product.badge?.text_label && product.badge.text_label !== 'Normal' && (
                  <span
                    className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-sm z-10 text-white"
                    style={{ backgroundColor: product.badge.background_color || '#3b82f6' }}
                  >
                    {product.badge.text_label}
                  </span>
                )}

                {/* Right Floating Actions Panel Stack Container */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 items-center">

                  {/* Wishlist Heart Icon Button Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(productId)}
                    className={`backdrop-blur-xs p-1.5 rounded-xl border shadow-xs transition-colors duration-150 cursor-pointer ${isWishlisted ? 'bg-rose-50 text-rose-500 border-rose-100' : 'bg-white/80 text-slate-400 border-slate-100 hover:text-rose-500'
                      }`}
                  >
                    <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>

                  {isAdmin && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleEditClick(product)}
                        className="opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 translate-y-[-4px] group-hover:translate-y-0 transition-all duration-200 bg-white/90 backdrop-blur-xs text-slate-400 hover:text-cyan-500 p-1.5 rounded-xl border border-slate-100 hover:border-cyan-100 shadow-sm cursor-pointer"
                        title="Edit Item Data Map"
                      >
                        <Edit2 size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteClick(productId)}
                        className="opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 translate-y-[-8px] group-hover:translate-y-0 transition-all duration-200 bg-white/90 backdrop-blur-xs text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-xl border border-slate-100 hover:border-rose-100 shadow-sm cursor-pointer"
                        title="Purge Document Record"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </div>

                {/* Image Canvas Container Frame Layout */}
                <div className="w-full aspect-[4/3] bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100 relative">
                  {product.product_image ? (
                    <img
                      src={product.product_image}
                      alt={product.title}
                      className="w-full h-full object-contain p-2 select-none pointer-events-none transition-transform duration-300 group-hover:scale-103"
                      loading="lazy"
                      onError={(e) => {
                        // 🎯 OPTIMIZED FALLBACK PATHWAY: Appended resolution dimensions to prevent render sizing errors
                        e.target.src = "https://placehold.co";
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-slate-400"><span className="text-[10px] uppercase">Loading Asset...</span></div>
                  )}
                </div>

                {/* Card Meta Content Details Wrapper Box */}
                <div className="p-4 flex flex-col flex-1 space-y-2.5 pb-4">
                  <span className="text-[10px] font-bold text-[#52C5C3] uppercase tracking-wider">{product.category}</span>
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight leading-snug line-clamp-2 h-9">{product.title}</h3>

                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} size={12} fill={index < (product.rating_stars || 5) ? "currentColor" : "none"} className={index < (product.rating_stars || 5) ? "text-amber-400" : "text-slate-200"} />
                    ))}
                    <span className="text-[10px] text-slate-400 ml-1 font-bold">({product.rating_stars || 5})</span>
                  </div>

                  {/* Footer Row (MSRP & Add to Cart Trigger Button) */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider truncate">{product.price_label || "MSRP Price"}</span>
                      <span className="text-sm font-bold text-slate-900 tracking-tight truncate">{product.currency || "₹"}{formatCurrency(product.amount)}</span>
                    </div>

                    <button
                      onClick={() => addToCart(productId, 1)}
                      type="button"
                      className="bg-slate-900 hover:bg-slate-800 text-white p-2 rounded-xl transition-colors duration-150 shadow-sm cursor-pointer shrink-0"
                      aria-label="Add to Cart"
                    >
                      <ShoppingCart size={14} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>



        {/* Modals Mounting Framework Viewports */}
        <DeleteModalProduct
          isOpen={isDeleteOpen}
          isLoading={isDeleting}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleConfirmDelete}
        />
        <EditModalProduct
        isOpen={isEditOpen}
        isLoading={isSavingEdit}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEditFormSubmit}
        formData={editFormData}
        onInputChange={handleEditInputChange}
        onFileChange={handleEditFileChange}
        rawImageFile={selectedFile}
      />
      </div>

</div>
    );
  }   
  export default Product;
     




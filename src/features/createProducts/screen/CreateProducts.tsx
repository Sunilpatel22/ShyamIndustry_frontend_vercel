import React, { useState, useRef, useEffect } from 'react';
import { useProductStore } from '../createProducts.store';
import { Loader2, AlertCircle, Sparkles, Folder, Tag, DollarSign, Image } from 'lucide-react';
import PreviewLive from '../component/PreviewLive';
import {  useNavigate } from 'react-router-dom';

const CreateProducts = () => {
  const navigate =useNavigate()
    const { createProduct, isLoading, error: storeError } = useProductStore();
    const [localError, setLocalError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [rawImageFile, setRawImageFile] = useState(null);
    
    const AGRICULTURAL_CATEGORIES = ["Tractor Trolleys", "Cultivators", "Agricultural Tools", "Hydraulic Equipment", "Dustbins"];

    // 🎯 Load form parameters directly including cached image preview strings
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('productFormData');
        return savedData ? JSON.parse(savedData) : {
            card_index: 1,
            badge_type: 'Normal',
            badge_color: 'Red',
            product_image: '',
            category: 'Tractor Trolleys',
            title: '',
            rating_stars: 5,
            price_label: 'MRP',
            currency: '₹',
            amount: ''
        };
    });

    const fileInputRef = useRef(null);

    // Keep all standard user configurations logged and up to date
    useEffect(() => {
        localStorage.setItem('productFormData', JSON.stringify(formData));
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'card_index' || name === 'rating_stars' ? Number(value) : value
        }));
        if (localError) setLocalError('');
    };

    // Process image uploads: Capture raw binary file AND create preview base64 strings
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setRawImageFile(file); // Save raw file binary for backend Multer engine
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, product_image: reader.result })); // Cache base64 string locally
                if (localError) setLocalError('');
            };
            reader.readAsDataURL(file);
        }
    };

    // 🎯 FIXED: Correctly closed handleSubmit and encapsulated parsing scopes
    const handleSubmit = async (e) => {
      console.log("first")

        e.preventDefault();
        setLocalError('');
        setSuccessMessage('');

        if (!rawImageFile) {
            setLocalError("Please select a product image file to upload.");
            return;
        }

        const packet = new FormData();
        packet.append('product_image', rawImageFile); 
        packet.append('card_index', formData.card_index);
        packet.append('badge_text', formData.badge_type.trim());
        packet.append('badge_color', formData.badge_color.trim());
        packet.append('category', formData.category.trim());
        packet.append('title', formData.title.trim());
        packet.append('rating_stars', formData.rating_stars);
        packet.append('price_label', formData.price_label);
        packet.append('currency', formData.currency);
        packet.append('amount', formData.amount.trim());
        packet.append('wishlist_icon', 'Heart');
        packet.append('action_button', 'Add to Cart Icon');

        try {
            const result = await createProduct(packet);
            if (result?.success) {
                setSuccessMessage('🎉 Product created successfully!');
                setFormData({
                    card_index: 1, badge_type: 'Normal', badge_color: 'Red', product_image: '',
                    category: 'Tractor Trolleys', title: '', rating_stars: 5, price_label: 'MRP', currency: '₹', amount: ''
                });
                setRawImageFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
                localStorage.removeItem('productFormData');
                 navigate('/product'); 
            } else {
                setLocalError(result?.error || "Submission failed.");
            }
        } catch (err) {
            setLocalError("Failed to publish your product data.");
        }
    

    const activeError = localError || storeError;

    };

    return (
        <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl border border-slate-100 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Form Fields (Column Span 2) */}
                <div className="lg:col-span-2 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
    {/* 1. Card Index Sorting Order Field */}
    <div className="flex flex-col space-y-1.5">
        <label className="text-xs text-slate-600 font-semibold tracking-wide uppercase">Card Position Index</label>
        <input 
            type="number" 
            name="card_index" 
            min="1"
            value={formData.card_index} 
            onChange={handleInputChange} 
            required 
            className="w-full bg-white text-slate-700 p-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#52C5C3]" 
        />
    </div>

    {/* 2. File Upload Binary Browser Row */}
    <div className="flex flex-col space-y-1.5">
        <label className="text-xs text-slate-600 font-semibold tracking-wide uppercase">Product Image Asset</label>
        <div className="relative flex gap-2">
            <input 
                type="text" 
                readOnly
                value={rawImageFile ? rawImageFile.name : ''} 
                placeholder="Upload machinery picture..." 
                className="w-full bg-slate-50 text-slate-500 p-2 rounded-lg border border-slate-200 text-sm cursor-not-allowed" 
            />
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()} 
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200 whitespace-nowrap cursor-pointer"
            >
                Browse...
            </button>
        </div>
    </div>

    {/* 3. Product Title Input */}
    <div className="flex flex-col space-y-1.5">
        <label className="text-xs text-slate-600 font-semibold tracking-wide uppercase">Product Title</label>
        <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleInputChange} 
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
            onChange={handleInputChange} 
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
                onChange={handleInputChange} 
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
                onChange={handleInputChange} 
                className="w-full bg-white text-slate-700 p-2 rounded-lg border border-slate-200 text-sm cursor-pointer focus:outline-none focus:border-[#52C5C3]"
            >
                <option value="₹">Rupees (₹)</option>
                <option value="$">Dollars ($)</option>
                <option value="€">Euros (€)</option>
            </select>
        </div>

        <div className="flex flex-col space-y-1.5">
            <label className="text-xs text-slate-600 font-semibold tracking-wide uppercase">Amount</label>
            <input 
                type="number" 
                name="amount" 
                value={formData.amount} 
                onChange={handleInputChange} 
                required 
                placeholder="20000" 
                className="w-full bg-white text-slate-700 p-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#52C5C3]" 
            />
        </div>
    </div>

    {/* 6. Product Badges Configurations and Ratings System Vector Map */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col space-y-1.5">
            <label className="text-xs text-slate-600 font-semibold tracking-wide uppercase">Badge Type</label>
            <select 
                name="badge_type" 
                value={formData.badge_type} 
                onChange={handleInputChange} 
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
                onChange={handleInputChange} 
                required 
                placeholder="e.g. Red or #ef4444" 
                disabled={formData.badge_type === 'Normal'}
                className="w-full bg-white text-slate-700 p-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#52C5C3] disabled:bg-slate-100 disabled:cursor-not-allowed" 
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
                onChange={handleInputChange} 
                required 
                className="w-full bg-white text-slate-700 p-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#52C5C3]" 
            />
        </div>
    </div>

    {/* Form API Feedback Messaging Windows */}
    {/* {activeError && (
        <div className="text-xs text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
            ⚠️ {typeof activeError === 'string' ? activeError : activeError.message}
        </div>
    )} */}
    {successMessage && (
        <div className="text-xs text-teal-600 bg-teal-50 p-3 rounded-lg text-center font-medium border border-teal-100">
            {successMessage}
        </div>
    )}

    {/* Master Operational Submission Trigger Button */}
    <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-[#52C5C3] hover:bg-[#45b4b2] disabled:bg-slate-200 disabled:text-slate-400 text-white py-3 rounded-lg font-bold text-sm transition-all shadow-md shadow-cyan-500/5 cursor-pointer disabled:cursor-not-allowed"
    >
        {isLoading ? <span>Publishing catalog artifacts...</span> : <span>Add Product</span>}
    </button>
</form>

                </div>

                {/* Right Side Column (Column配置 1) */}
                <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-6">
                    {/* 🎯 DATA HOOK: This binds your local state directly to the preview child */}
                    <PreviewLive formData={formData} />
                </div>

            </div>
        </div>
    );
};

export default CreateProducts;

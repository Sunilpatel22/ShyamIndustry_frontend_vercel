import React, { useState, useEffect, useRef } from 'react'
import { Search, Heart, User, ShoppingCart, LayoutDashboard, ShoppingBag, Info, Package, PhoneCall, LayoutList, Menu, X } from 'lucide-react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import UserCredentialModal from '../components/userCreadentialModal'
import Logo from '../../../assets/image/baba/download.png'
import { useAuthStore } from '../../auth/auth.store'
import { useGetAllProductStore } from '../../product/product.store'
import { useCartStore } from '../../addCart/cart.store' 
import { useWishlistStore } from '../../wishlist/wishlist.store'
import useProfileStore from '../../profile/profile.store'

const Header = () => {
  // 🎯 Global search engine state integration hooks
  const searchQuery = useGetAllProductStore((state) => state.searchQuery);
  const setSearchQuery = useGetAllProductStore((state) => state.setSearchQuery);

  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  const sidebarRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  // 🎯 Live Cart & Wishlist Tracker Selectors
  const totalBadgeCount = useCartStore((state) => state.totalBadgeCount);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
  const wishlistItems = useWishlistStore((state) => state.wishlistItems);

  // 🎯 Extracting Profile Variables with Safe Alias Mapping
  const { profile: profileData, fetchProfile } = useProfileStore();

  const isLoggedIn = !!token
  const isAdmin = user?.role === 'admin'

  // 🎯 Robust refresh-proof mount effect loop to beat state hydration latency
  useEffect(() => {
    const activeToken = token || localStorage.getItem('token'); 
    
    if (activeToken) {
      if (fetchCart) fetchCart();
      if (fetchWishlist) fetchWishlist(); 
      if (fetchProfile) fetchProfile(); 
    }
  }, [token, fetchCart, fetchWishlist, fetchProfile]);

  // Close profile dropdown or side drawer when clicking outside their boundaries
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.mobile-menu-trigger')) {
        setIsMobileMenuOpen(false)
      }
    }
    if (isProfileOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isProfileOpen, isMobileMenuOpen])

  // Automatically drop mobile sidebar overlays when the active subpage changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const navLinkStyles = ({ isActive }) =>
    `relative px-5 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${isActive
      ? 'text-[#52C5C3] font-bold'
      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/60'
    }`

  const mobileNavLinkStyles = ({ isActive }) =>
    `w-full px-5 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all rounded-xl flex items-center space-x-3 ${isActive
      ? 'bg-[#52C5C3]/10 text-[#52C5C3] font-bold'
      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`

  return (
    <div className="w-full flex flex-col font-sans relative shadow-sm">

      {/* Primary Top Utility Brand Toolbar Bar */}
      <div className="w-full bg-[#52C5C3] px-4 md:px-12 py-1 flex items-center justify-between relative z-50 shadow-md shadow-cyan-900/5">

        {/* Left Combo Cluster: Mobile Menu Switch Button & Locked Left Brand Logo */}
        <div className="flex items-center shrink-0 mr-4">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-trigger text-white p-1.5 rounded-xl lg:hidden focus:outline-none transition-colors cursor-pointer shrink-0 mr-2 md:mr-3"
            aria-label="Toggle navigation drawer panel"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link to="/" className="hover:scale-102 active:scale-98 transition-transform block shrink-0">
            <img
              src={Logo}
              alt="Shyam Industries Logo"
              className="h-10 md:h-18 w-auto object-contain drop-shadow-sm filter brightness-105"
            />
          </Link>
        </div>

        {/* Search Engine Box Container with Live State Hooks */}
        <div className="flex-1 max-w-2xl mx-4 lg:mx-16 relative hidden md:block mr-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <Search size={16} className="text-[#52C5C3]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search premium products, tools, and industrial collections..."
            className="w-full bg-white text-slate-800 placeholder:text-slate-400 pl-11 pr-24 py-2.5 rounded-xl text-sm border border-transparent shadow-inner outline-none focus:ring-2 focus:ring-cyan-200 focus:bg-white transition-all duration-200"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-24 top-3 text-slate-400 hover:text-slate-600 text-xs font-semibold px-2 transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
          <button type="button" className="absolute right-2 top-1.5 bottom-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 rounded-lg transition-colors duration-150 shadow-sm">
            Search
          </button>
        </div>

        {/* Interactive Functional Actions Right Cluster */}
        <div className="flex items-center space-x-3 md:space-x-6 text-white relative shrink-0">

          {/* Wishlist Link Button */}
          <button
            type="button"
            onClick={() => navigate('/wishlist')}
            className="hover:scale-110 active:scale-90 text-white hover:text-rose-100 transition-all relative p-1.5 rounded-full hover:bg-white/10 cursor-pointer flex items-center justify-center"
            aria-label="Favorites"
          >
            <Heart size={20} className="stroke-[2.2]" />
            {wishlistItems && wishlistItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-slate-900 border-2 border-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-scale-in">
                {wishlistItems.length}
              </span>
            )}
          </button>

          {/* Authentication Conditional Controller Group */}
          {isLoggedIn ? (
            <div className="relative flex items-center space-x-3 border-l border-white/20 pl-3 md:pl-6" ref={dropdownRef}>

              {/* Profile Avatar Frame Trigger */}
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2.5 group focus:outline-none cursor-pointer"
                aria-label="User profile menu"
              >
                {/* 🎯 FIXED DESKTOP AVATAR CONTAINER: Direct database link passing removes double host prefixes */}
                <div className="w-8 h-8 rounded-xl overflow-hidden bg-white border border-white/10 text-[#52C5C3] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
                  {profileData?.avatar ? (
                    <img 
                      src={profileData.avatar} 
                      alt="User Profile" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.currentTarget.onerror = null; 
                        e.currentTarget.src = "https://placeholder.com";
                      }}
                    />
                  ) : user?.fullname ? (
                    <span className="text-xs font-bold uppercase">
                      {user.fullname.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <User size={14} />
                  )}
                </div>

                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-semibold tracking-wide text-white group-hover:underline truncate max-w-[100px]">
                    {user?.fullname || 'Account'}
                  </span>
                  {isAdmin ? (
                    <span className="text-[10px] text-amber-300 font-bold tracking-wider uppercase truncate max-w-[100px]">
                      Administrator
                    </span>
                  ) : (
                    <span className="text-[10px] text-cyan-100 font-light truncate max-w-[100px]">
                      Standard Customer
                    </span>
                  )}
                </div>
              </button>

              {/* Enhanced Popover Dropdown Panel Overlays */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2.5 z-50 pointer-events-auto">
                  <UserCredentialModal currentUser={user} closeMenu={() => setIsProfileOpen(false)} onLogout={logout} />
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-1 border-l border-white/20 pl-3 md:pl-6">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-xs font-semibold tracking-wide text-white hover:bg-white/10 px-2.5 py-2 rounded-xl transition-colors duration-150 cursor-pointer"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="bg-slate-900 text-[#52C5C3] border border-slate-950 px-3 py-2 rounded-xl text-xs font-bold tracking-wide hover:bg-slate-800 hover:text-white transition-all duration-150 shadow-md active:scale-95 cursor-pointer hidden sm:block"
              >
                Join Free
              </button>
            </div>
          )}

          {/* Persistent E-Commerce Cart Widget Container */}
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="hover:scale-110 active:scale-90 text-white p-1.5 rounded-full hover:bg-white/10 transition-all relative cursor-pointer flex items-center justify-center"
            aria-label="Cart"
          >
            <ShoppingCart size={20} className="stroke-[2.2]" />
            <span className="absolute -top-0.5 -right-0.5 bg-slate-900 border-2 border-[#52C5C3] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
              {totalBadgeCount || 0}
            </span>
          </button>
        </div>
      </div>

      {/* Secondary Bottom Desktop Navigation Strip (Hidden on screens below lg) */}
      <nav className="w-full bg-white border-b border-slate-200/80 px-6 md:px-12 hidden lg:flex items-center justify-between relative z-40">
        <div className="flex items-center space-x-1">
          <NavLink to="/home" className={navLinkStyles}>
            {({ isActive }) => (
              <>
                <ShoppingBag size={14} />
                <span>Marketplace</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#52C5C3] rounded-t-full" />
                )}
              </>
            )}
          </NavLink>

          <NavLink to="/service" className={navLinkStyles}>
            {({ isActive }) => (
              <>
                <LayoutDashboard size={14} />
                <span>Services</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#52C5C3] rounded-t-full" />
                )}
              </>
            )}
          </NavLink>

          <NavLink to="/about-us" className={navLinkStyles}>
            {({ isActive }) => (
              <>
                <Info size={14} />
                <span>About</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#52C5C3] rounded-t-full" />
                )}
              </>
            )}
          </NavLink>

          <NavLink to="/product" className={navLinkStyles}>
            {({ isActive }) => (
              <>
                <Package size={14} />
                <span>Product</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#52C5C3] rounded-t-full" />
                )}
              </>
            )}
          </NavLink>

          <NavLink to="/contact-us" className={navLinkStyles}>
            {({ isActive }) => (
              <>
                <PhoneCall size={14} />
                <span>Contact Us</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#52C5C3] rounded-t-full" />
                )}
              </>
            )}
          </NavLink>

          {/* Desktop Admin Guard Protection */}
          {isAdmin && (
            <NavLink to="/add-product" className={navLinkStyles}>
              {({ isActive }) => (
                <>
                  <LayoutList size={14} />
                  <span>Add Product by Admin</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#52C5C3] rounded-t-full" />
                  )}
                </>
              )}
            </NavLink>
          )}
        </div>

        {/* Right-Aligned Desktop Quick Support Info Panel */}
        <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-slate-500 pr-2">
          <span className="text-gray-400 font-medium">Contact To:</span>
          <a href="tel:+919415064551" className="text-slate-800 font-bold hover:text-[#52C5C3] transition-colors">
            +91 94150 64551
          </a>
        </div>
      </nav>

      {/* SLIDE-OUT LEFT SIDEBAR DRAWER PANEL FOR MOBILE/TABLET */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300" />
        <div
          ref={sidebarRef}
          className="absolute top-0 bottom-0 left-0 w-72 max-w-[80vw] bg-white shadow-2xl border-r border-slate-100 flex flex-col justify-between p-6 transition-transform duration-300 ease-out transform-gpu"
          style={{ transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <img src={Logo} alt="Shyam Industries" className="h-9 w-auto object-contain filter brightness-95" />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Embedded Search Element Panel */}
            <div className="relative w-full">
              <Search size={16} className="absolute left-3.5 top-3 text-[#52C5C3]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collections..."
                className="w-full bg-slate-50 placeholder:text-slate-400 pl-10 pr-4 py-2 rounded-xl text-sm border border-transparent focus:bg-white focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <NavLink to="/home" className={mobileNavLinkStyles}>
                <ShoppingBag size={16} /> <span>Marketplace</span>
              </NavLink>

              <NavLink to="/service" className={mobileNavLinkStyles}>
                <LayoutDashboard size={16} /> <span>Services</span>
              </NavLink>

              <NavLink to="/about-us" className={mobileNavLinkStyles}>
                <Info size={16} /> <span>About</span>
              </NavLink>

              <NavLink to="/product" className={mobileNavLinkStyles}>
                <Package size={16} /> <span>Product</span>
              </NavLink>

              <NavLink to="/contact-us" className={mobileNavLinkStyles}>
                <PhoneCall size={16} /> <span>Contact Us</span>
              </NavLink>

              {isAdmin && (
                <NavLink to="/add-product" className={mobileNavLinkStyles}>
                  <LayoutList size={16} /> <span>Add Product by Admin</span>
                </NavLink>
              )}
            </div>
          </div>

          {/* Combined Profile Information and Quick Support info inside Sidebar Footer */}
          <div className="border-t border-slate-100 pt-4 flex flex-col space-y-4">
            {isLoggedIn && (
              <div className="flex items-center gap-3 bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                <div 
                  className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 flex items-center justify-center shrink-0 cursor-pointer"
                  onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}
                >
                  {profileData?.avatar ? (
                    <img 
                      src={profileData.avatar} 
                      alt="User Avatar" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placeholder.com";
                      }}
                    />
                  ) : (
                    <span className="text-sm font-black text-[#52C5C3] uppercase">
                      {user?.fullname?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}>
                  <p className="text-sm font-bold text-slate-800 truncate">{user?.fullname || "Account Profile"}</p>
                  <p className="text-xs text-slate-500 capitalize">{user?.role || "Customer"}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-1.5 text-xs text-slate-500 font-semibold px-1">
              <span className="text-gray-400 font-medium">Quick Support Hotlink:</span>
              <a href="tel:+919415064551" className="text-slate-900 font-bold hover:text-[#52C5C3] transition-colors flex items-center gap-1">
                <PhoneCall size={12} className="text-[#52C5C3]" /> +91 94150 64551
              </a>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Header;

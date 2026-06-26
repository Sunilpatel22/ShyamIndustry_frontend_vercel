import React, { useEffect } from 'react' 
import { User, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom' 
import { useAuthStore } from '../../auth/auth.store' 
import useProfileStore from '../../profile/profile.store' 

const UserCredentialModal = ({ closeMenu, onLogout }) => {
  const navigate = useNavigate()
  
  // 1. Pull live user info from authentication store
  const user = useAuthStore((state) => state.user);
  
  // 2. Pull profile parameters AND the direct background dispatch loader action
  const { profile: profileData, fetchProfile } = useProfileStore();

  // 🎯 CRITICAL REFRESH RECOVERY FIX: 
  // Forces the component to fetch the latest avatar image if it hasn't loaded yet
  useEffect(() => {
    if (!profileData && fetchProfile) {
      fetchProfile();
    }
  }, [profileData, fetchProfile]);

  // Debugger trace logger
  useEffect(() => {
    if (profileData) {
      console.log("🔥 Active Modal Avatar URL:", profileData?.avatar);
    }
  }, [profileData]) 

  const handleProfileRedirect = () => {
    closeMenu();
    navigate('/profile'); 
  };

  return (
    <div className="w-64 bg-white rounded-xl shadow-2xl border border-slate-100 flex flex-col text-left overflow-hidden divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
      
      {/* Dynamic User Information Header Block with Live Avatar Image */}
      <div className="px-5 py-4 bg-slate-50/50 flex items-center gap-3">
        
        {/* LIVE POPOVER AVATAR BINDING FRAME */}
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#f1f1f1] border border-slate-200/60 text-[#52C5C3] flex items-center justify-center shadow-sm shrink-0">
          {profileData?.avatar ? (
            <img 
              src={profileData.avatar} 
              alt="User Avatar Summary" 
              className="w-full h-full object-cover" 
              onError={(e) => {
                e.currentTarget.onerror = null;
                // Safe standard placeholder if image file becomes corrupted on backend disk path
                e.currentTarget.src = "https://placeholder.com";
              }}
            />
          ) : user?.fullname ? (
            <span className="text-sm font-black uppercase">
              {user.fullname.charAt(0).toUpperCase()}
            </span>
          ) : (
            <User size={16} />
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <h4 className="text-sm font-bold text-slate-900 leading-tight capitalize truncate">
            {user?.fullname || 'Anonymous User'} 
          </h4>
          <p className="text-xs text-slate-400 mt-0.5 font-normal tracking-wide truncate">
            {user?.email || 'No email associated'}
          </p>
        </div>
      </div>

      {/* Menu Action List */}
      <div className="flex flex-col py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600">
        <button 
          onClick={handleProfileRedirect}
          className="w-full px-5 py-2.5 flex items-center gap-3.5 hover:bg-[#EEFAFA] hover:text-[#52C5C3] transition-all duration-150 text-left group cursor-pointer"
        >
          <User size={16} className="text-slate-400 group-hover:text-[#52C5C3]" />
          <span>My Profile</span>
        </button>
      </div>

      {/* Footer Log Out Area */}
      <div className="py-1 bg-slate-50/30">
        <button 
          onClick={() => {
            closeMenu();
            onLogout(); 
            navigate('/'); 
          }}
          className="w-full px-5 py-2.5 flex items-center gap-3.5 hover:bg-rose-50/60 transition-all duration-150 text-left text-rose-600 font-bold text-xs uppercase tracking-wider group cursor-pointer"
        >
          <LogOut size={16} className="text-rose-500 group-hover:translate-x-0.5 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default UserCredentialModal;

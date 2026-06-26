import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '../features/auth/auth.store'; // Adjust import path to match your folder structure

const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);
  const isInitializing = useAuthStore((state) => state.isInitializing);

  // 💡 DEFENSIVE CHECK: If the store is busy validating the token with MongoDB, hold the page execution
  if (isInitializing) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 space-y-3 font-sans">
        <Loader2 className="animate-spin text-[#52C5C3]" size={32} />
        <p className="text-xs text-slate-400 font-medium tracking-wide">Syncing secure user session...</p>
      </div>
    );
  }

  // Once validation completes, check if a valid token exists
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

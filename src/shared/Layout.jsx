import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from '../features/header/screen/Header';
import Footer from '../features/footer/screen/Footer';

const Layout = () => {
  const location = useLocation(); // Tracks the current active URL path

  // Read baseline structural storage state instance hook
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    // Listen for custom authentication event shifts globally
    const handleAuthChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    window.addEventListener('auth-state-changed', handleAuthChange);
    return () => window.removeEventListener('auth-state-changed', handleAuthChange);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    window.dispatchEvent(new Event('auth-state-changed'));
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('auth-state-changed'));
  };

  // Hides the header if the user is on either the /signup or /login pages
  const isAuthPage = location.pathname === '/signup' || location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Toast viewport mounted once so toast works in all pages/screens */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: 'sans-serif',
            fontSize: '12px',
            fontWeight: '600',
            borderRadius: '12px',
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        }}
      />

      {/* The Header hides automatically on signup and login pages */}
      {!isAuthPage && (
        <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      )}

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* 💡 THE FOOTER PLACEMENT HERE: Hidden automatically on auth view screens */}
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default Layout;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
// Import your store engine hook
import { useAuthStore } from '../auth.store'; 
// import Logo from '../../../assets/image/baba/shyamlogoremovebackgound.png'
import Logo from '../../../assets/image/baba/shyamIndustrylogo.png'

const SignInScreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Extract necessary auth states and methods from Zustand
  const { login, isLoading, error } = useAuthStore();

  // Local state to bind input field values
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    
    // Fire the async store login operation 
    const result = await login(formData);
    
    if (result.success) {
      // CODE FIX: Scramble form input elements right before navigating 
      // This stops the browser from recognizing the password data structure!
      setFormData({ email: '', password: '' });
      
      // Navigate smoothly over to the secure homepage dashboard endpoint
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 font-sans selection:bg-[#52C5C3]/30">
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 p-8 md:p-10 flex flex-col items-center">
        
        {/* Brand Logo Container Wrapper */}
        <Link to="/" className="hover:opacity-90 transition-opacity mb-4 block">
          {/* 💡 SCALE UP: Adjusted height properties from h-9 to a larger h-16 (with h-20 scaling on wider desktop screens) */}
          <img 
            src={Logo} 
            alt="Shyam Industries Logo" 
            className="h-18 md:h-21 w-auto object-contain select-none pointer-events-none" 
          />
        </Link>

        <h1 className="text-2xl font-medium text-slate-800 tracking-tight text-center">
          Welcome Back
        </h1>
        <p className="text-xs text-gray-400 mt-1.5 text-center font-light">
          Sign in to Shyam Industries
        </p>

        <form className="w-full mt-8 flex flex-col space-y-4" onSubmit={handleSignInSubmit} autoComplete="off">
          
          {/* Email Address Input Field */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs text-slate-600 font-medium tracking-wide">Email Address</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail size={16} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your@email.com"
                className="w-full bg-white text-slate-700 pl-11 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#52C5C3] transition-colors text-sm font-light placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div className="flex flex-col space-y-1.5 relative">
            <label className="text-xs text-slate-600 font-medium tracking-wide">Password</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="••••••••"
                className="w-full bg-white text-slate-700 pl-11 pr-11 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#52C5C3] transition-colors text-sm font-light placeholder:text-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            
            <div className="text-right pt-1">
              <Link to="/forgot-password" className="text-xs font-normal text-[#52C5C3] hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Dynamic Error Message Block */}
          {error && (
            <div className="text-xs text-red-500 bg-red-50/50 border border-red-100 rounded-lg p-3 text-center font-normal tracking-wide">
              {error}
            </div>
          )}

          {/* Primary Call to Action Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#52C5C3] hover:bg-[#45b4b2] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm flex items-center justify-center space-x-2 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <div className="w-full mt-8 pt-6 border-t border-dashed border-gray-100 flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center space-y-1">
            <span className="text-xs text-gray-400 font-light">New to Shyam Industries?</span>
            <Link to="/signup" className="text-xs font-normal text-[#52C5C3] hover:underline">
              Create an account →
            </Link>
          </div>
          
          <Link to="/" className="text-[11px] text-gray-400 hover:text-gray-600 font-light transition-colors">
            ← Back to Home
          </Link>
        </div>

      </div>

      <button className="fixed bottom-4 right-4 w-8 h-8 bg-white border border-gray-100 text-gray-400 rounded-full flex items-center justify-center text-xs font-normal shadow-sm hover:bg-gray-50 transition-colors" aria-label="Help">
        ?
      </button>
    </div>
  );
};

export default SignInScreen;

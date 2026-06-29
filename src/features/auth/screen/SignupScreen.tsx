import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../../assets/image/baba/shyamIndustrylogo.png';
import { User, Mail, Lock, Eye, EyeOff, Loader2, Phone, ShieldCheck } from 'lucide-react';
// Import your Zustand store hook
import { useAuthStore } from '../auth.store';

const SignupScreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');
const [showAdminKey, setShowAdminKey] = useState(false);
  // Extract state and actions from the Zustand store
  const { signup, isLoading, error: storeError } = useAuthStore();

  // Set up local state to track input changes
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '', 
    role: 'customer', 
    password: '',
    confirmPassword: '',
    adminSecretKey: '' 
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (localError) setLocalError('');
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    // FRONTEND VALIDATION
    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    // Explicitly build the exact payload your backend schema expects
    const payload = {
      fullname: formData.fullname.trim(),
      email: formData.email.trim(),
      mobileNumber: formData.phone.trim(), 
      role: formData.role,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      adminSecretKey: formData.adminSecretKey.trim()
    };

    try {
      const result = await signup(payload);
      if (result?.success) {
        navigate('/login'); 
      }
    } catch (err) {
      console.error("Signup submission crash:", err);
    }
  };

  // Combine store errors and local validations safely
  const activeError = localError || storeError;

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 font-sans selection:bg-[#52C5C3]/30">
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 p-8 md:p-10 flex flex-col items-center">

        <Link to="/" className="hover:opacity-90 transition-opacity mb-4 block">
          <img
            src={Logo}
            alt="Shyam Industries Logo"
            className="h-18 md:h-21 w-auto object-contain select-none pointer-events-none"
          />
        </Link>

        <h1 className="text-2xl font-medium text-slate-800 tracking-tight text-center">
          Create Account
        </h1>
        <p className="text-xs text-gray-400 mt-1.5 text-center font-light">
          Join Shyam Industries today
        </p>

        <form className="w-full mt-8 flex flex-col space-y-4" onSubmit={handleSignupSubmit}>

          {/* Full Name Field */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs text-slate-600 font-medium tracking-wide">Full Name</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
                <User size={16} />
              </div>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                required
                placeholder="John Doe"
                className="w-full bg-white text-slate-700 pl-11 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#52C5C3] transition-colors text-sm font-light placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Email Address Field */}
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

          {/* Phone Number Field */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs text-slate-600 font-medium tracking-wide">Phone Number</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
                <Phone size={16} />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10}"
                title="Please fill a valid 10-digit mobile number"
                placeholder="1234567890"
                className="w-full bg-white text-slate-700 pl-11 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#52C5C3] transition-colors text-sm font-light placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Account Role Dropdown Field */}
         <div className="flex flex-col space-y-1.5">
  <label className="text-xs text-slate-600 font-medium tracking-wide">Register As</label>
  <div className="relative w-full">
    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
      <ShieldCheck size={16} />
    </div>
    <select
      name="role"
      value={formData.role}
      onChange={handleInputChange}
      className="w-full bg-white text-slate-700 pl-11 pr-10 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#52C5C3] transition-colors text-sm font-light appearance-none cursor-pointer"
    >
      <option value="customer">Customer / Standard User</option>
      <option value="admin">Administrator / System Admin</option>
    </select>
    <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-gray-400 text-xs">
      ▼
    </div>
  </div>
</div>

{/* Conditional Admin Secret Key Field */}
{formData.role === 'admin' && (
  <div className="flex flex-col space-y-1.5 animate-fadeIn">
    <label className="text-xs text-red-600 font-medium tracking-wide">Admin Secret Passkey</label>
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-red-400">
        <Lock size={16} />
      </div>
      <input
        // 1. Dynamic type selection handles viewing vs hiding characters
        type={showAdminKey ? 'text' : 'password'}
        name="adminSecretKey"
        value={formData.adminSecretKey}
        onChange={handleInputChange}
        required
        placeholder="Enter Secret Code"
        // 2. Added right padding (pr-11) to prevent text overlapping with the icon
        className="w-full bg-white text-slate-700 pl-11 pr-11 py-2.5 rounded-lg border border-red-200 focus:outline-none focus:border-red-500 transition-colors text-sm font-light placeholder:text-gray-300"
      />
      {/* 3. Interactive button instead of static layout */}
      <button
        type="button"
        onClick={() => setShowAdminKey(!showAdminKey)}
        className="absolute inset-y-0 right-3.5 flex items-center text-red-400 hover:text-red-600 transition-colors"
      >
        {showAdminKey ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  </div>
)}

{/* Password Field */}
<div className="flex flex-col space-y-1.5">
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
</div>

{/* Confirm Password Field */}
<div className="flex flex-col space-y-1.5">
  <label className="text-xs text-slate-600 font-medium tracking-wide">Confirm Password</label>
  <div className="relative w-full">
    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
      <Lock size={16} />
    </div>
    <input
      type={showConfirmPassword ? 'text' : 'password'}
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleInputChange}
      required
      placeholder="••••••••"
      className="w-full bg-white text-slate-700 pl-11 pr-11 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#52C5C3] transition-colors text-sm font-light placeholder:text-gray-300"
    />
    <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="absolute inset-y-0 right-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
    >
      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  </div>
</div>


          {/* Dynamic Error Message UI Block */}
          {activeError && (
            <div className="w-full text-xs text-red-500 bg-red-50/50 border border-red-100 rounded-lg p-3 text-center font-normal tracking-wide">
              {typeof activeError === 'string' ? activeError : activeError.message || JSON.stringify(activeError)}
            </div>
          )}

          {/* Primary Submit Button with Inline Spinner State */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#52C5C3] hover:bg-[#45b4b2] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm flex items-center justify-center space-x-2 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>

        <div className="w-full mt-8 pt-6 border-t border-dashed border-gray-100 flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center space-y-1">
            <span className="text-xs text-gray-400 font-light">Already have an account?</span>
            <Link to="/login" className="text-xs font-normal text-[#52C5C3] hover:underline">
              Sign in instead →
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

export default SignupScreen;


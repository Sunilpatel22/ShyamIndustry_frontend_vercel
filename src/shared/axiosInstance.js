import axios from 'axios';

// 🎯 Pulls from .env (local) or .env.production / Vercel cloud environment settings
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://shyamindustry-backend.vercel.app';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 40000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // 1. Fetch data pieces from storage and environment parameters
    const token = localStorage.getItem('token');
    const apiKey = import.meta.env.VITE_API_KEY;
    
    // 👇 DIAGNOSTIC LOG: Shows exactly which backend environment (Local/Prod) is being called
    console.log(`📡 Axios executing network call to: ${config.baseURL}${config.url}`);
    console.log(`🔑 Token being injected into Headers:`, token ? `Bearer ${token.substring(0, 15)}...` : "❌ NONE FOUND");
    console.log(`🔒 API Passkey Active:`, apiKey ? "✅ YES" : "❌ NONE INJECTED");

    // 2. Inject authorization bearer JWT tokens dynamically if active
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 3. Inject API Key if present in your configuration settings
    if (apiKey) {
      config.headers['X-API-Key'] = apiKey;
    }
    
    // 4. Safely handle content typing structures for file transfers vs standard JSON payloads
    if (config.data && !(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

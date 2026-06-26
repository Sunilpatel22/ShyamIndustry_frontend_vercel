import axios from 'axios';

// 🎯 DYNAMIC BASE URL: Automatically switches between Local, Staging, and Production
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'shyamindustry-backend.vercel.app';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 40000, // 💡 40 seconds for large image uploads
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    // 👇 DIAGNOSTIC LOG: Shows exactly which backend environment (Local/Staging/Prod) is being called
    console.log(`📡 Axios executing network call to: ${config.baseURL}${config.url}`);
    console.log(`🔑 Token being injected into Headers:`, token ? `Bearer ${token.substring(0, 15)}...` : "❌ NONE FOUND");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
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

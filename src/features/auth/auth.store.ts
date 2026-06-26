import { create } from 'zustand';
import { userApiService } from './auth.api';
import axiosInstance from '../../shared/axiosInstance';

export const useAuthStore = create((set, get) => ({
  user: null,
  usersList: [],
  token: localStorage.getItem('token') || null, 
  isLoading: false,
  isInitializing: true, 
  error: null,

  initializeAuth: async () => {
    const currentToken = get().token;
    if (!currentToken) {
      set({ isInitializing: false });
      return;
    }
    try {
      const data = await userApiService.getMe();
      set({ user: data.user, isInitializing: false });
    } catch (err) {
      console.error("🔒 Token check failed details:", err.response?.data?.error || err.message);
      set({ isInitializing: false }); 
    }
  },

  login: async (loginData: any) => {
    set({ isLoading: true, error: null });
    try {
      const data = await userApiService.login(loginData);
      localStorage.setItem('token', data.token); 
      set({ user: data.user, token: data.token, isLoading: false, isInitializing: false });
      return { success: true };
    } catch (err) {
      // 💡 Automatically catches the "Access denied" error message from your new backend admin restriction!
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Invalid credentials';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  // 🛠️ SENDS DATA TO YOUR API SERVICE AND RETURNS CLEAN STATUS OBJECTS
  signup: async (payload: any) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await axiosInstance.post('/user/signup', payload);
      set({ isLoading: false });
      
      // Return success to the frontend component
      return { success: true, data: response.data };
      
    } catch (err) {
      let errorMessage = 'Something went wrong';

      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else {
          errorMessage = err.response.data.message || err.response.data.error || errorMessage;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      // Save error message to store state so the UI can read it
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      
      return { success: false };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, usersList: [], error: null });
  }
}));

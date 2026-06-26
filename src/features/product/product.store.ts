import { create } from 'zustand';
import { getProductApiService } from './product.api'; // Ensure correct path import location

export const useGetAllProductStore = create((set, get) => ({
  products: [],
  searchQuery: '', // 🎯 GLOBAL SEARCH ENGINE STATE LAYER: Holds current real-time text query strings
  isLoading: false,
  error: null,

  // 1. READ ALL METHOD (Fetches all active machinery items from backend)
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getProductApiService.getAllProducts();
      // Handle instances where the backend wraps your dataset array inside dynamic keys
      const cleanedList = Array.isArray(data) ? data : data.data || data.products || [];
      set({ products: cleanedList, isLoading: false });
    } catch (err) {
      set({ 
        error: err.response?.data?.error || err.response?.data?.message || err.message || "Failed to load index.", 
        isLoading: false 
      });
    }
  },

  // 2. CREATE METHOD (Uploads new equipment using multipart payloads)
  createProduct: async (formDataPacket) => {
    set({ isLoading: true, error: null });
    try {
      const responseData = await getProductApiService.createProduct(formDataPacket);
      
      // Pull current items database states instantly to refresh UI arrays cleanly
      await get().fetchProducts();
      return { success: true, data: responseData?.data || responseData };
    } catch (err) {
      const errText = err.response?.data?.error || err.response?.data?.message || "Failed to compile product pipeline initialization.";
      set({ error: errText, isLoading: false });
      return { success: false, error: errText };
    }
  },

  // 3. EDIT / UPDATE METHOD (Modifies parameter keys inside active item documents)
  updateProduct: async (id, formDataPacket) => {
    set({ isLoading: true, error: null });
    try {
      const responseData = await getProductApiService.editProduct(id, formDataPacket);
      
      // Refresh state cache rows directly from the live backend
      await get().fetchProducts();
      return { success: true, data: responseData?.data || responseData };
    } catch (err) {
      const errText = err.response?.data?.error || err.response?.data?.message || "Modification request dropped by server pipeline.";
      set({ error: errText, isLoading: false });
      return { success: false, error: errText };
    }
  },

  // 4. OPTIMISTIC UI DELETION PIPELINE METHOD (Wipes items from frontend instantly)
  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const responseData = await getProductApiService.deleteProduct(id);
      
      // 🎯 Instantly filters local array memory states before network calls finish executing
      set((state) => ({
        products: state.products.filter(p => (p._id || p.id) !== id),
        isLoading: false
      }));
      
      return { success: true, message: responseData?.message || "Dropped row successfully." };
    } catch (err) {
      const errText = err.response?.data?.error || err.response?.data?.message || "Failed to complete drop call actions.";
      set({ error: errText, isLoading: false });
      return { success: false, error: errText };
    }
  },

  // 🎯 5. SEARCH DISPATCHER ACTION METHOD
  // Mutates the query string in real-time, instantly visible across Header and Product screens
   setSearchQuery: (query) => {
    set({ searchQuery: query });
    // 🎯 LIVE SYNC TRIGGER: Triggers the server query right away as the user types
    get().fetchProducts(); 
  },

  // Helper utility to quickly flush error logs
  clearErrors: () => set({ error: null })
}));

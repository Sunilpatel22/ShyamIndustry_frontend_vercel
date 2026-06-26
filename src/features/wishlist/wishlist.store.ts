import { create } from 'zustand';
import { wishlistApiService } from './wishlist.api'; // Ensure path alignment matches structure
import toast from 'react-hot-toast';

export const useWishlistStore = create((set, get) => ({
  wishlistItems: [], // Full product model data containers for rendering a /wishlist page
  wishlistedIds: [], // Fast indexing tracker array layer holding simple string IDs: ["id1", "id2"]
  isLoading: false,

  // Synchronise wishlist states from database records
  fetchWishlist: async () => {
    if (!localStorage.getItem('token')) return;
    try {
      set({ isLoading: true });
      const data = await wishlistApiService.getWishlist();
      const products = data.products || [];
      const ids = products.map(p => p._id || p.id);
      set({ wishlistItems: products, wishlistedIds: ids });
    } catch (err) {
      console.error("Wishlist sync error:", err.message);
    } finally {
      set({ isLoading: false });
    }
  },

  // Fire toggle network request parameters
  toggleWishlist: async (productId) => {
    if (!localStorage.getItem('token')) {
      toast.error("Please log in to manage your favorites.");
      return;
    }
    try {
      const res = await wishlistApiService.toggleWishlist(productId);
      if (res.success) {
        await get().fetchWishlist(); // Re-sync local states instantly
        
        // Render dynamic toasts matching specific mutation rules matching accent keys
        if (res.isWishlisted) {
          toast.success(res.message, {
                      position: 'top-right',
            style: { background: '#334155', color: '#fff' },
            iconTheme: { primary: '#f43f5e', secondary: '#0f172a' } // Rose pink heart accent color tracking rules
          });
        } else {
          toast.success(res.message, 

            {
                          position: 'top-right',
                 style: { background: '#0f172a', color: '#fff' } });
        }
      }
    } catch (err) {
      toast.error("Unable to alter wishlist parameters.");
    }
  },

  clearWishlistStore: () => set({ wishlistItems: [], wishlistedIds: [] })
}));

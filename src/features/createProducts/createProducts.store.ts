import { create } from 'zustand';
import { productApiService } from './createProducts.api'; 

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,

  createProduct: async (productData) => {
    set({ isLoading: true, error: null });

    try {
      const responseData = await productApiService.createProduct(productData);

      // 🎯 FIX: Adjusted property matching paths to extract the backend's "data" node key wrapper
      const savedProduct = responseData?.data || responseData?.product || (responseData?.success ? responseData : null) || {
        card_index: Number(productData.get('card_index')),
        title: productData.get('title'),
        category: productData.get('category'),
        amount: productData.get('amount'),
        currency: productData.get('currency'),
        rating_stars: Number(productData.get('rating_stars')),
        price_label: productData.get('price_label'),
        badge: {
          text_label: productData.get('badge_text'),
          background_color: productData.get('badge_color')
        },
        _id: Date.now().toString() 
      };

      // Mutate central state arrays predictably 
      set((state) => ({
        products: [...state.products, savedProduct],
        isLoading: false,
        error: null
      }));

      return { success: true, data: savedProduct };

    } catch (err) {
      let errorMessage = 'Failed to create product. Something went wrong.';

      // Parse standardized Axios runtime exceptions
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else {
          errorMessage = err.response.data.message || err.response.data.error || errorMessage;
        }
      } else if (err.message) {
        errorMessage = err.message; // 🎯 FIXED: Stray character "a" has been completely removed!
      }

      set({ 
        error: errorMessage, 
        isLoading: false 
      });

      return { success: false, error: errorMessage };
    }
  },

  clearErrors: () => set({ error: null })
}));

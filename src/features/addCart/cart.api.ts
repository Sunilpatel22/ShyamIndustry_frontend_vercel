import axiosInstance from '../../shared/axiosInstance';

export const cartApiService = {
  // 📋 Fetch full cart details with populated product structures
  getCart: async () => {
    const response = await axiosInstance.get('/cart/get');
    return response.data;
  },

  // 🛒 Add a machinery product or increment its volume count
  addToCart: async (productId, quantity = 1) => {
    const response = await axiosInstance.post('/cart/add', { productId, quantity });
    return response.data;
  },

  // 🔄 Explicitly adjust item row quantity parameters
  updateQuantity: async (productId, quantity) => {
    const response = await axiosInstance.put('/cart/update-quantity', { productId, quantity });
    return response.data;
  },

  // ❌ Remove an item row from the cart database completely
  removeFromCart: async (productId) => {
    const response = await axiosInstance.delete(`/cart/remove/${productId}`);
    return response.data;
  }
};


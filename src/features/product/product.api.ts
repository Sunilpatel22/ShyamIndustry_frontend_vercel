import axiosInstance from '../../shared/axiosInstance';

export const getProductApiService = {
  // 1. UPGRADED READ ALL / GLOBAL SEARCH METHOD
  // 🎯 Accepts an optional query parameter string to power real-time database matching indexes
  getAllProducts: async (searchString = '') => {
    const urlPath = searchString 
      ? `/product/getAllProduct?search=${encodeURIComponent(searchString)}`
      : '/product/getAllProduct';
      
    const response = await axiosInstance.get(urlPath);
    return response.data;
  },

  // 2. CREATE METHOD (Multipart Payload Upload)
  createProduct: async (formData) => {
    // 🎯 ENFORCED MULTIPART HEADERS: Ensures binary file streams and text keys map securely
    const response = await axiosInstance.post('/product/createProduct', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // 3. EDIT / UPDATE METHOD
  editProduct: async (id, formData) => {
    const response = await axiosInstance.put(`/product/editProduct/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // 4. DELETE METHOD
  deleteProduct: async (id) => {
    const response = await axiosInstance.delete(`/product/deleteProduct/${id}`);
    return response.data;
  },

 

  // 🛒 Add a machinery product or increment its volume count
  addToCart: async (productId, quantity = 1) => {
    try {
      const res = await getProductApiService.addToCart(productId, quantity);
      if (res.success || res) {
        await get().fetchCart(); 
      }
    } catch (err) {
      alert("Unable to save product addition changes.");
    }
  },

  
};


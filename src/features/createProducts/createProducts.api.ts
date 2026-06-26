import axiosInstance from '../../shared/axiosInstance';

export const productApiService = {
  createProduct: async (formData) => {
    // 🎯 FIX: Explicitly enforce multipart headers so Axios correctly maps the data packet
    const response = await axiosInstance.post('/product/createProduct', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
}
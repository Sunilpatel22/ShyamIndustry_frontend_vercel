import axiosInstance from '../../shared/axiosInstance';

export const wishlistApiService = {
getWishlist: async () => {
  const response = await axiosInstance.get('/wishlist/get');
  return response.data;
},

// ❤️ Toggle dynamic listing indexes inside database maps
toggleWishlist: async (productId) => {
  const response = await axiosInstance.post('/wishlist/toggle', { productId });
  return response.data;
}

}
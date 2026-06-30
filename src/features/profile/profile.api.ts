import axiosInstance from '../../shared/axiosInstance';

export const profileApiService = {
  // Fetches the active user profile matching the token context
  getProfile: async () => {
    // 🎯 FIXED: Removed leading slash to make path joining relative
    const response = await axiosInstance.get('profile/getProfile');
    return response.data;
  },

  // Updates profile parameters (Expects a FormData object containing the image)
  updateProfile: async (formData: FormData) => {
    // 🎯 FIXED: Removed leading slash to prevent URL resolution breakdowns
    const response = await axiosInstance.put('profile/updateProfile', formData, {
      headers: {
        
        'Content-Type': 'multipart/form-data', 
      },
    });
    return response.data;
  },
};

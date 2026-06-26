import axiosInstance from '../../shared/axiosInstance';

export const userApiService = {
  signup: async (userData) => {
    const response = await axiosInstance.post('/user/signup', userData);
    return response.data;
  },

  login: async (loginData) => {
    const response = await axiosInstance.post('/user/login', loginData);
    return response.data; // Returns { user, token }
  },

  // 💡 ADDED THIS METHOD: Fetches current session context matching the active JWT
  getMe: async () => {
    const response = await axiosInstance.get('/user/me');
    return response.data; // Returns { user }
  },

  getAllUsers: async () => {
    const response = await axiosInstance.get('/user/getAllUser');
    return response.data.users;
  }
};

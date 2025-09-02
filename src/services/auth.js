import api from './api';

const authService = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  login: async (credentials) => {
    try {
    
      const response = await api.post('/auth/login', credentials);
      const { token } = response.data;
      localStorage.setItem('auth_token', token);
             localStorage.setItem('user', JSON.stringify({
          userId: response.data.userId,
          username: response.data.username
          
        }));
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  }
};

export default authService;

import api from './api';

const wishService = {
  createWish: async (bucketId, wishData) => {
    try {
      const response = await api.post(`/buckets/${bucketId}/wishes`, wishData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getWishesByBucket: async (bucketId) => {
    try {
      const response = await api.get(`/buckets/${bucketId}/wishes`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getWishById: async (wishId) => {
    try {
      const response = await api.get(`/wishes/${wishId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateWish: async (bucketId, wishId, updateData) => {
    try {
      const response = await api.put(`/buckets/${bucketId}/wishes/${wishId}`, updateData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  markComplete: async (bucketId, wishId) => {
    try {
      const response = await api.patch(`/buckets/${bucketId}/wishes/${wishId}/complete`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteWish: async (bucketId,wishId) => {
    try {
      const response = await api.delete(`/buckets/${bucketId}/wishes/${wishId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default wishService;

import api from './api';

const bucketService = {
  createBucket: async (bucketData) => {
    try {
      const response = await api.post('/buckets', bucketData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getUserBuckets: async () => {
    try {
      const response = await api.get('/buckets');
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getBucketById: async (bucketId) => {
    try {
      const response = await api.get(`/buckets/${bucketId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateBucket: async (bucketId, updateData) => {
    try {
      const response = await api.put(`/buckets/${bucketId}`, updateData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteBucket: async (bucketId) => {
    try {
      const response = await api.delete(`/buckets/${bucketId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default bucketService;

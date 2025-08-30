import api from './api';

const logService = {
  createLog: async (wishId, logData) => {
    try {
      const response = await api.post(`/wishes/${wishId}/logs`, logData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getLogsByWish: async (wishId) => {
    try {
      const response = await api.get(`/wishes/${wishId}/logs`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getLogById: async (logId) => {
    try {
      const response = await api.get(`/logs/${logId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateLog: async (logId, updateData) => {
    try {
      const response = await api.put(`/logs/${logId}`, updateData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteLog: async (logId) => {
    try {
      const response = await api.delete(`/logs/${logId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default logService;

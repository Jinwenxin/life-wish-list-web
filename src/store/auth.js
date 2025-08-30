import { defineStore } from 'pinia';
import authService from '../services/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // 从localStorage恢复用户信息
    userId: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).userId
      : null,

    username: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).username
      : null,

    isAuthenticated: !!localStorage.getItem('user')
  }),

  actions: {
    async login(credentials) {
      try {
        const response = await authService.login(credentials);

        // 只存储需要的用户信息，忽略token
        this.userId = response.userId;
        this.username = response.username;
        this.isAuthenticated = true;

        return response;
      } catch (error) {
        this.logout();
        throw error;
      }
    },

    async register(userData) {
      try {
        const response = await authService.register(userData);
        return response;
      } catch (error) {
        throw error;
      }
    },

    async fetchCurrentUser() {
      try {
        const user = await authService.getCurrentUser();
        this.user = user;
        this.isAuthenticated = true;
        return user;
      } catch (error) {
        this.logout();
        throw error;
      }
    },

    logout() {
      authService.logout();
      // 清理用户信息
      this.userId = null;
      this.username = null;
      this.isAuthenticated = false;
    }
  },

  getters: {
    currentUserId: (state) => state.userId,
    currentUsername: (state) => state.username,
    currentUser: (state) => ({
      id: state.userId,
      name: state.username
    }),
    loggedIn: (state) => state.isAuthenticated
  }
});

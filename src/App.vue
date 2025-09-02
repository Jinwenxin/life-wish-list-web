<template>
  <div id="app">
  <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './store/auth';

const authStore = useAuthStore();

// Try to fetch current user on app initialization
onMounted(async () => {
  if (authStore.isAuthenticated) {
    try {
      console.log("已登录，获取current user")
      await authStore.fetchCurrentUser();
    } catch (error) {
      authStore.logout();
    }
  }
});
</script>

<style>
@import './style.css';

/* #app {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  max-width: 1200px;
} */

/* Global button styles */
button {
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Global form styles */
input, textarea, select {
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 1rem;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}
</style>

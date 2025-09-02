<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>注册</h1>
      
      <form @submit.prevent="register">
        <div class="form-group">
          <label>用户名</label>
          <input 
            v-model="user.username" 
            type="text" 
            required
            :disabled="loading"
          >
        </div>
        
        <div class="form-group">
          <label>邮箱</label>
          <input 
            v-model="user.email" 
            type="email" 
            required
            :disabled="loading"
          >
        </div>
        
        <div class="form-group">
          <label>密码</label>
          <input 
            v-model="user.password" 
            type="password" 
            required
            :disabled="loading"
          >
        </div>
        
        <div class="form-group">
          <label>确认密码</label>
          <input 
            v-model="user.confirmPassword" 
            type="password" 
            required
            :disabled="loading"
          >
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <button type="submit" :disabled="loading" class="auth-btn">
          <span v-if="!loading">注册</span>
          <span v-else>注册中...</span>
        </button>
      </form>
      
      <div class="auth-footer">
        <p>已有账号？ <router-link to="/login">登录</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';

const router = useRouter();
const authStore = useAuthStore();

const user = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});
const loading = ref(false);
const error = ref('');

const register = async () => {
  if (user.value.password !== user.value.confirmPassword) {
    error.value = '两次输入的密码不一致';
    return;
  }

  loading.value = true;
  error.value = '';
  
  try {
    await authStore.register(user.value);
    router.push({ name: 'Login' });
  } catch (err) {
    error.value = err.response?.data?.message || '注册失败，请重试';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('/inside.png');
  background-size: cover;
  background-position: center;
  padding: 2rem;
}

.auth-card {
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.auth-form {
  max-width: 400px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2d3748;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #4a5568;
}

.form-group input {
  width: 100%;
  max-width: 400px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  margin: 0 auto;
}

.form-group input:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.error-message {
  color: #e53e3e;
  margin-bottom: 20px;
  text-align: center;
}

.auth-btn {
  width: 100%;
  padding: 12px;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.auth-btn:hover {
  background-color: #3182ce;
}

.auth-btn:disabled {
  background-color: #bee3f8;
  cursor: not-allowed;
}

.auth-footer {
  margin-top: 20px;
  text-align: center;
  color: #718096;
}

.auth-footer a {
  color: #4299e1;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>

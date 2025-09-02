<template>
  <div class="main-layout">
    <header class="header">
      <div class="logo">人生愿望清单</div>
      <nav class="nav">
        <router-link to="/">欢迎页</router-link>
        <router-link to="/buckets">我的愿望</router-link>
        <router-link to="/profile">个人中心</router-link>
      </nav>
      <div class="auth-actions">
        <template v-if="authStore.loggedIn">
          <span class="username">{{ authStore.currentUser?.name }}</span>
          <button @click="handleLogout">退出</button>
        </template>
        <template v-else>
          <router-link to="/login">登录</router-link>
          <router-link to="/register">注册</router-link>
        </template>
      </div>
    </header>
    <main class="main-content">
      <router-view></router-view>
    </main>
    <footer class="footer">
      <p>© 2025 人生愿望清单 - 记录你的每一个愿望</p>
    </footer>
  </div>
</template>

<script setup>
import { handleCurrentChange } from 'element-plus/es/components/tree/src/model/util.mjs';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url('/inside.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  margin: 0;
  padding: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
}

.nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav a.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.auth-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.auth-actions a,
.auth-actions button {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #3498db;
  border: none;
  cursor: pointer;
}

.auth-actions a:hover,
.auth-actions button:hover {
  background-color: #2980b9;
}

.username {
  margin-right: 1rem;
}

.main-content {
  flex: 1;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 8px;
  margin: 2rem auto;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  width: 80%;
}

.footer {
  text-align: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
}
</style>

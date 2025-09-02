<template>
  <div class="welcome-container">
    <div class="background-image"></div>
    <div class="content">
      <h1>人生愿望清单</h1>
      <h2>在这里记录你的每一个愿望，从心意萌生，到努力实现</h2>
      <h2>我今年的愿望是...</h2>
      <h2>人生必须打卡的地方有...</h2>
      <h2>相信自己，不负此生</h2>
      <button @click="goToLogin" class="wish-button">开始许愿</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
.welcome-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/cover1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(0.7);
  margin: 0;
  padding: 0;
}

.content {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  color: white;
  text-align: center;
  margin: 0;
  padding: 0;
  pointer-events: none;
}

.content > * {
  pointer-events: auto;
}

h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.wish-button {
  padding: 1rem 2rem;
  font-size: 1.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.wish-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
</style>

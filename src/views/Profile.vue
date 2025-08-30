<template>
  <div class="profile">
    <h1>个人资料</h1>
    
    <div class="profile-content">
      <div class="profile-info">
        <div class="avatar">
          <div class="avatar-placeholder">
            {{ userInitials }}
          </div>
        </div>
        
        <div class="user-details">
          <h2>{{ authStore.currentUser?.name }}</h2>
          <p>注册时间: {{ formatDate(authStore.currentUser?.createdAt) }}</p>
        </div>
      </div>

      <div class="stats-grid">
        <StatCard 
          title="愿望清单" 
          :value="bucketStore.buckets.length" 
          type="primary"
        />
        <StatCard 
          title="已完成愿望" 
          :value="completedWishes" 
          type="success"
        />
        <StatCard 
          title="进行中愿望" 
          :value="pendingWishes" 
          type="warning"
        />
      </div>

      <div class="profile-actions">
        <button @click="showUpdateModal = true" class="edit-btn">
          编辑资料
        </button>
        <button @click="logout" class="logout-btn">
          退出登录
        </button>
      </div>
    </div>

    <!-- Update Profile Modal -->
    <div v-if="showUpdateModal" class="modal">
      <div class="modal-content">
        <h3>更新个人资料</h3>
        <form @submit.prevent="updateProfile">
          <div class="form-group">
            <label>用户名</label>
            <input v-model="updatedUser.username" required>
          </div>
          <div class="form-group">
            <label>邮箱</label>
            <input type="email" v-model="updatedUser.email" required>
          </div>
          <div class="form-actions">
            <button type="button" @click="showUpdateModal = false">取消</button>
            <button type="submit">保存</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../store/auth';
import { useBucketStore } from '../store/bucket';
import StatCard from '../components/StatCard.vue';

const authStore = useAuthStore();
const bucketStore = useBucketStore();
const showUpdateModal = ref(false);
const updatedUser = ref({
  username: '',
  email: ''
});

onMounted(async () => {
  await bucketStore.fetchBuckets();
  updatedUser.value = {
    username: authStore.currentUser?.name || '',
    email: authStore.currentUser?.email || ''
  };
});

const userInitials = computed(() => {
  const name = authStore.currentUser?.name || '';
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
});

const completedWishes = computed(() => {
  return bucketStore.buckets.reduce((total, bucket) => {
    return total + (bucket.completedCount || 0);
  }, 0);
});

const pendingWishes = computed(() => {
  return bucketStore.buckets.reduce((total, bucket) => {
    return total + ((bucket.wishCount || 0) - (bucket.completedCount || 0));
  }, 0);
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};

const updateProfile = async () => {
  try {
    await authStore.updateProfile(updatedUser.value);
    showUpdateModal.value = false;
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

const logout = () => {
  authStore.logout();
};
</script>

<style scoped>
.profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
  color: #2d3748;
}

.profile-content {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.profile-info {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.avatar {
  margin-right: 20px;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #4299e1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.user-details h2 {
  margin: 0 0 8px 0;
  color: #2d3748;
}

.user-details p {
  margin: 0;
  color: #718096;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.profile-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.edit-btn {
  background-color: #4299e1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.logout-btn {
  background-color: #e53e3e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.edit-btn:hover {
  background-color: #3182ce;
}

.logout-btn:hover {
  background-color: #c53030;
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
}

.modal h3 {
  margin-top: 0;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.form-actions button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.form-actions button[type="button"] {
  background-color: #e2e8f0;
}

.form-actions button[type="submit"] {
  background-color: #4299e1;
  color: white;
  border: none;
}
</style>

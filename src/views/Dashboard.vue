<template>
  <div class="dashboard">
    <h1>我的愿望清单</h1>
    
    <div class="stats-grid">
      <StatCard 
        title="总清单数" 
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

    <div class="actions">
      <button @click="showCreateModal = true" class="create-btn">
        + 创建新清单
      </button>
    </div>

    <div class="buckets-grid">
      <BucketCard 
        v-for="bucket in bucketStore.buckets" 
        :key="bucket.id" 
        :bucket="bucket" 
      />
      <!-- :bucket是子组件的props -->
    </div>

    <div v-if="bucketStore.buckets.length === 0" class="empty-state">
      <p>您还没有创建任何愿望清单</p>
      <button @click="showCreateModal = true" class="create-btn">
        + 创建第一个清单
      </button>
    </div>

    <!-- Create Bucket Modal -->
    <div v-if="showCreateModal" class="modal">
      <div class="modal-content">
        <h3>创建新愿望清单</h3>
        <form @submit.prevent="createBucket">
          <div class="form-group">
            <label>清单名称</label>
            <input v-model="newBucket.title" required>
          </div>
          <div class="form-group">
            <label>描述 (可选)</label>
            <textarea v-model="newBucket.description"></textarea>
          </div>
          <div class="form-group">
            <label>是否公开</label>
            <div class="radio-group">
              <label>
                <input 
                  type="radio" 
                  v-model="newBucket.isPublic" 
                  :value="true"
                >
                是
              </label>
              <label>
                <input 
                  type="radio" 
                  v-model="newBucket.isPublic" 
                  :value="false"
                >
                否
              </label>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" @click="showCreateModal = false">取消</button>
            <button type="submit">创建</button>
          </div>
        </form>
      </div>
    </div>
  </div> 
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useBucketStore } from '../store/bucket';
import BucketCard from '../components/BucketCard.vue';
import StatCard from '../components/StatCard.vue';


const bucketStore = useBucketStore();
const showCreateModal = ref(false);
const newBucket = ref({
  name: '',
  description: '',
  isPublic: true
});
const loading = ref(false);
const error = ref(null);
// const buckets = ref([]);
const loadBuckets = async () => {
  try {
    bucketStore.fetchBuckets();
    console.log('Buckets fetched successfully',bucketStore.getBuckets);
  } catch (error) {
    console.error('Error fetching buckets:', error);
  }
};

onMounted(() => {
  console.log('Dashboard Mounted');
  loadBuckets();
});

const completedWishes = computed(() => {
  return bucketStore.buckets.reduce((total, bucket) => {
    // 确保 bucket.wishes 存在且是数组
    if (!bucket.wishes || !Array.isArray(bucket.wishes)) {
      return total;
    }
    
    // 计算当前 bucket 中已完成的愿望数量
    const completedInBucket = bucket.wishes.filter(
      wish => wish.status === 'COMPLETED'
    ).length;
    
    return total + completedInBucket;
  }, 0);
});

const pendingWishes = computed(() => {
  return bucketStore.buckets.reduce((total, bucket) => {
    // 确保 bucket.wishes 存在且是数组
    if (!bucket.wishes || !Array.isArray(bucket.wishes)) {
      return total;
    }
    
    // 计算当前 bucket 中进行中的愿望数量
    const inProgressWishes = bucket.wishes.filter(
      wish => wish.status === 'IN_PROGRESS'
    ).length;
    
    return total + inProgressWishes;
  }, 0);
});

const createBucket = async () => {
  try {
    await bucketStore.createBucket(newBucket.value);
    showCreateModal.value = false;
    newBucket.value = { name: '', description: '' };
  } catch (error) {
    console.error('Error creating bucket:', error);
  }
};
</script>

<style scoped>
.dashboard {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  color: #2d3748;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.actions {
  margin-bottom: 20px;
  text-align: right;
}

.create-btn {
  background-color: #4299e1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.create-btn:hover {
  background-color: #3182ce;
}

.buckets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  border: 1px dashed #e2e8f0;
  border-radius: 8px;
  margin-top: 40px;
}

.empty-state p {
  margin-bottom: 20px;
  color: #718096;
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

.form-group input,
.form-group textarea {
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

.radio-group {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.radio-group input[type="radio"] {
  margin: 0;
}
</style>

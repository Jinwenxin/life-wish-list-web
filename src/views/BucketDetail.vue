<template>
  <div class="bucket-detail">
    <div class="bucket-header">
      <h1>{{ bucketStore.currentBucket?.title }}</h1>
      <p v-if="bucketStore.currentBucket?.description">
        {{ bucketStore.currentBucket.description }}
      </p>
      <div class="bucket-stats">
        <!-- <StatCard 
          title="总愿望数" 
          :value="bucketStore.currentBucket?.wishes.length || 0" 
          type="primary"
        /> -->
        <StatCard title="总愿望数" :value="wishCount" type="primary" />
        <StatCard title="已完成" :value="completedCount" type="success" />
        <StatCard title="进行中"
          :value="inProgressCount"
          type="primary" />
        <StatCard title="完成进度" :value="`${progress || 0}%`" type="primary" />
      </div>
    </div>

    <div class="wish-actions">
      <button @click="showCreateModal = true" class="create-btn">
        + 添加愿望
      </button>
    </div>

    <div class="wishes-list">
      <WishItem v-for="wish in bucketStore.wishes" :key="wish.id" :wish="wish" @edit="editWish(wish)"
        @delete="deleteWish(wish.id)" />
    </div>

    <div v-if="bucketStore.wishes.length === 0" class="empty-state">
      <p>这个愿望清单还是空的</p>
      <button @click="showCreateModal = true" class="create-btn">
        + 添加第一个愿望
      </button>
    </div>

    <!-- Create/Edit Wish Modal -->
    <div v-if="showCreateModal" class="modal">
      <div class="modal-content">
        <h3>{{ editingWish ? '编辑愿望' : '添加新愿望' }}</h3>
        <form @submit.prevent="submitWish">
          <div class="form-group">
            <label>愿望标题</label>
            <input v-model="currentWish.title" required>
          </div>
          <div class="form-group">
            <label>描述 (可选)</label>
            <textarea v-model="currentWish.description"></textarea>
          </div>
          <!-- <div class="form-group">
            <label>截止日期 (可选)</label>
            <input type="date" v-model="currentWish.dueDate">
          </div> -->
          <!-- <div class="form-group">
            <label>优先级</label>
            <select v-model="currentWish.priority">
              <option value="HIGH">高</option>
              <option value="MEDIUM">中</option>
              <option value="LOW">低</option>
            </select>
          </div> -->

          <div class="form-actions">
            <button type="button" @click="closeModal">取消</button>
            <button type="submit">{{ editingWish ? '更新' : '创建' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useBucketStore } from '../store/bucket';
import WishItem from '../components/WishItem.vue';
import StatCard from '../components/StatCard.vue';
import { lo } from 'element-plus/es/locales.mjs';

const route = useRoute();
const bucketStore = useBucketStore();
const showCreateModal = ref(false);
const editingWish = ref(false);
const currentWish = ref({
  title: '',
  description: '',
  dueDate: '',
  createdAt: '',
  // priority: 'MEDIUM'
});
const loading = ref(false);
const error = ref(null);

const fetchOneBucket = async () => {
  error.value = null;
  loading.value = true;
  try {
    await bucketStore.selectBucket(route.params.id);
  } catch (err) {
    console.error('Error fetching bucket:', err);
    error.value = '获取愿望清单失败，请稍后重试。';
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  fetchOneBucket();
});



// 安全的计算属性
const wishCount = computed(() => {
  //确保 currentBucket 存在且有 wishes 属性
  if (bucketStore.currentBucket?.wishes) {
    return bucketStore.currentBucket.wishes.length
  }
  return 0
})
const completedCount = computed(() => {
  if (bucketStore.currentBucket?.wishes) {
    return bucketStore.currentBucket.wishes.filter(wish => wish.status === 'COMPLETED').length
  }
  return 0
});

const inProgressCount = computed(() => {
  if (bucketStore.currentBucket?.wishes) {
    return bucketStore.currentBucket.wishes.filter(wish => wish.status === 'IN_PROGRESS').length
  }
  return 0
});

const progress = computed(() => {
  return wishCount.value > 0 ? ((completedCount.value / wishCount.value) * 100).toFixed(2) : 0;
});

// 使用 watch 观察计算属性变化
// watch(wishCount, (newCount) => {
//   console.log("wishCount 更新为:", newCount)
// })

const submitWish = async () => {
  try {
    if (editingWish.value) {
      await bucketStore.updateWish(currentWish.value);
    } else {
      await bucketStore.createWish(currentWish.value);
    }
    closeModal();
  } catch (error) {
    console.error('Error saving wish:', error);
  }
};

const editWish = (wish) => {
  currentWish.value = { ...wish };
  editingWish.value = true;
  showCreateModal.value = true;
};

const deleteWish = async (wishId) => {
  try {
    // 重复调用，删除
    // await bucketStore.deleteWish(bucketId, wishId);
    console.log("父组件打印：delete wish", wishId);
  } catch (error) {
    console.error('Error deleting wish:', error);
  }
};

const closeModal = () => {
  showCreateModal.value = false;
  editingWish.value = false;
  currentWish.value = {
    title: '',
    description: '',
    createdAt: '',
    id:'',
    status: '',
    completedAt: ''
  };
};
</script>

<style scoped>
.bucket-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.bucket-header {
  margin-bottom: 30px;
}

.bucket-header h1 {
  margin-bottom: 10px;
  color: #2d3748;
}

.bucket-header p {
  color: #718096;
  margin-bottom: 20px;
}

.bucket-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.wish-actions {
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

.wishes-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
.form-group textarea,
.form-group select {
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

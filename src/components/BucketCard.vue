<template>
  <div class="bucket-card">
    <div class="bucket-header">
      <h3>{{ bucket.title }}</h3>
      <span class="wish-count">{{ wishCount }} 个愿望</span>
    </div>
    <div class="bucket-stats">
      <div class="stat">
        <span class="stat-value">{{ completedCount }}</span>
        <span class="stat-label">已完成</span>
      </div>
      <div class="stat">
        <span class="stat-value">{{ progress }}%</span>
        <span class="stat-label">进度</span>
      </div>
    </div>
    <div class="bucket-actions">
      <button @click="viewBucket">查看详情</button>
      <button @click="showDeleteConfirm = true" class="delete-btn">删除</button>
    </div>

    <!-- Delete Confirmation Dialog -->
    <div v-if="showDeleteConfirm" class="modal">
      <div class="modal-content">
        <h3>确认删除</h3>
        <p>确定要删除这个愿望清单吗？此操作无法撤销。</p>
        <div class="modal-actions">
          <button @click="showDeleteConfirm = false">取消</button>
          <button @click="deleteBucket" class="confirm-delete">确认删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBucketStore } from '../store/bucket';

const props = defineProps({
  bucket: {
    type: Object,
    required: true
  }
});

// Calculate wishCount, completedCount, and progress

// 使用 computed 创建响应式计算属性
const wishCount = computed(() => props.bucket.wishes.length);

const completedCount = computed(() => 
  props.bucket.wishes.filter(wish => wish.status === 'COMPLETED').length
);

const progress = computed(() => 
  wishCount.value > 0 ? ((completedCount.value / wishCount.value) * 100).toFixed(2) : 0
);

const router = useRouter();

const bucketStore = useBucketStore();
const showDeleteConfirm = ref(false);

const viewBucket = () => {
  router.push(`/buckets/${props.bucket.id}`);
};

const deleteBucket = async () => {
  try {
    await bucketStore.deleteBucket(props.bucket.id);
    showDeleteConfirm.value = false;
  } catch (error) {
    console.error('Error deleting bucket:', error);
  }
};
</script>

<style scoped>
.bucket-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  transition: all 0.2s ease;
}

.bucket-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.bucket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.bucket-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #2d3748;
}

.wish-count {
  color: #718096;
  font-size: 0.9rem;
}

.bucket-stats {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #4299e1;
}

.stat-label {
  font-size: 0.8rem;
  color: #718096;
}

.bucket-actions button {
  background-color: #4299e1;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.bucket-actions button:hover {
  background-color: #3182ce;
}

.delete-btn {
  background-color: #e53e3e;
  margin-left: 8px;
}

.delete-btn:hover {
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
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
}

.modal h3 {
  margin-top: 0;
  margin-bottom: 16px;
}

.modal p {
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-actions button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-delete {
  background-color: #e53e3e;
  color: white;
  border: none;
}

.confirm-delete:hover {
  background-color: #c53030;
}
</style>

<template>
  <div class="wish-item" :class="{ completed: wish.completed }">
    <div class="wish-main">
      <input 
      v-if="wish.status!=='COMPLETED'"
        type="checkbox"
        :checked="wish.completed"
        @change="toggleComplete"
      />
      <div class="wish-content">
        <h4>{{ wish.title }}</h4>
        <p v-if="wish.description">{{ wish.description }}</p>
        <div class="wish-meta">
          <span class="created-date" v-if="wish.createdAt">
           创建时间： {{ formatDate(wish.createdAt) }}
          </span> 
           <span class="created-date" v-if="wish.completedAt">
           完成时间： {{ formatDate(wish.completedAt) }}
          </span>
          <!-- <span class="priority" :class="wish.priority.toLowerCase()">
            {{ wish.priority }}
          </span>  -->
        </div> 
      </div>
    </div>
    <div class="wish-actions">
      <button @click="editWish" class="edit-btn">编辑</button>
      <button @click="deleteWish" class="delete-btn">删除</button>
    </div>
  </div>
</template>

<script setup>
// import { defineProps, defineEmits } from 'vue';
import { useBucketStore } from '../store/bucket';

const props = defineProps({
  wish: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['edit', 'delete']);

const bucketStore = useBucketStore();


const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const toggleComplete = async () => {
  try {
    await bucketStore.markWishComplete(props.wish.bucketId, props.wish.id);
  } catch (error) {
    console.error('Error marking wish complete:', error);
  }
};

const editWish = async() => {
  try{
     //await bucketStore.updateWish(props.wish);
     // 父组件负责弹窗，必须触发父组件的edit事件
      emit('edit', props.wish);
  } catch (error) {
    console.error('Error updating wish:', error);
  }
};

const deleteWish = async () => {
  try {
// 子组件负责删除，然后trigger父组件的delete事件 
// 1.​​单一职责原则​​：每个组件负责自己的操作
// 2.​​减少耦合​​：子组件不需要知道父组件的存在
// 3.​​性能优化​​：减少不必要的事件传递和函数调用
// 4.​​简化代码​​：代码更简洁，易于维护
    await bucketStore.deleteWish(props.wish.bucketId, props.wish.id,);
    emit('delete', props.wish.id);
  } catch (error) {
    console.error('Error deleting wish:', error);
  }
};
</script>

<style scoped>
.wish-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 8px;
  background-color: white;
}

.wish-item.completed {
  opacity: 0.7;
  background-color: #f7fafc;
}

.wish-item.completed h4 {
  text-decoration: line-through;
  color: #a0aec0;
}

.wish-main {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-grow: 1;
}

.wish-content {
  flex-grow: 1;
}

.wish-content h4 {
  margin: 0 0 4px 0;
  color: #2d3748;
}

.wish-content p {
  margin: 0;
  color: #718096;
  font-size: 0.9rem;
}

.wish-meta {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  font-size: 0.8rem;
}

.due-date {
  color: #718096;
}

.created-date {
  color: #718096;
}

.priority {
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.priority.high {
  background-color: #fed7d7;
  color: #c53030;
}

.priority.medium {
  background-color: #feebc8;
  color: #9c4221;
}

.priority.low {
  background-color: #c6f6d5;
  color: #276749;
}

.wish-actions {
  display: flex;
  gap: 8px;
}

button {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.edit-btn {
  background-color: #bee3f8;
  color: #2b6cb0;
}

.delete-btn {
  background-color: #fed7d7;
  color: #c53030;
}

button:hover {
  opacity: 0.8;
}
</style>

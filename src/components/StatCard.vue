<template>
  <div class="stat-card" :class="type">
    <div class="stat-icon">
      <slot name="icon">
        <div class="default-icon">{{ iconText }}</div>
      </slot>
    </div>
    <div class="stat-content">
      <div class="stat-value">{{ value }}</div>
      <div class="stat-title">{{ title }}</div>
      <div class="stat-description" v-if="description">{{ description }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'default',
    validator: (value) => {
      return ['default', 'primary', 'success', 'warning', 'danger'].includes(value);
    }
  }
});

const iconText = computed(() => {
  return props.title.charAt(0).toUpperCase();
});
</script>

<style scoped>
.stat-card {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  font-weight: bold;
  font-size: 1.2rem;
}

.default-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e2e8f0;
  color: #4a5568;
  border-radius: 50%;
}

.stat-content {
  flex-grow: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 4px;
}

.stat-title {
  font-size: 0.9rem;
  color: #718096;
}

.stat-description {
  font-size: 0.8rem;
  color: #a0aec0;
  margin-top: 4px;
}

/* Type variations */
.primary .stat-icon {
  background-color: #bee3f8;
  color: #3182ce;
}

.success .stat-icon {
  background-color: #c6f6d5;
  color: #38a169;
}

.warning .stat-icon {
  background-color: #feebc8;
  color: #dd6b20;
}

.danger .stat-icon {
  background-color: #fed7d7;
  color: #e53e3e;
}
</style>

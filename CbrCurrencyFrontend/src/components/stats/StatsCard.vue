<template>
  <div class="stats-card" :class="colorClass">
    <div class="card-icon">
      <FontAwesomeIcon :icon="icon" />
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-value">{{ value }}</p>
      <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  icon: {
    type: [String, Array],
    default: () => ['fas', 'chart-line']
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'green', 'purple', 'orange'].includes(value)
  }
})

const colorClass = computed(() => `color-${props.color}`)
</script>

<style scoped>
.stats-card {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  transition: all 0.3s ease;
  border-left: 4px solid;
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.color-blue {
  border-left-color: #667eea;
}

.color-green {
  border-left-color: #48bb78;
}

.color-purple {
  border-left-color: #9f7aea;
}

.color-orange {
  border-left-color: #ed8936;
}

.card-icon {
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  color: var(--text-primary);
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.card-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.card-subtitle {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0.5rem 0 0 0;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .stats-card {
    padding: 1rem;
  }

  .card-icon {
    font-size: 2rem;
  }

  .card-value {
    font-size: 1.5rem;
  }
}
</style>
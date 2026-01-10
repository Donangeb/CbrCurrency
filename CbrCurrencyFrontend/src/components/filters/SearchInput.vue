<template>
  <div class="search-input-wrapper">
    <label v-if="label" class="search-input-label">
      {{ label }}
    </label>
    
    <div class="search-input-container">
      <span class="search-icon">
        <FontAwesomeIcon icon="search" />
      </span>
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        class="search-input"
      />
      <button
        v-if="modelValue"
        @click="clear"
        class="clear-button"
        type="button"
        title="Очистить"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    
    <p v-if="resultsCount !== undefined" class="results-count">
      Найдено: {{ resultsCount }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Поиск...'
  },
  resultsCount: {
    type: Number,
    default: undefined
  }
})

const emit = defineEmits(['update:modelValue'])

const clear = () => {
  emit('update:modelValue', '')
}
</script>

<style scoped>
.search-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  width: 100%;
}

.search-input-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 18px;
  pointer-events: none;
}

.search-input {
  display: block;
  width: 100%;
  padding: 11px 40px 11px 48px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid rgb(209, 213, 219);
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  outline: none;
  min-height: 48px;
  line-height: 1.5;
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.dark .search-input {
  border-color: rgb(55, 65, 81);
}

.search-input:hover {
  border-color: var(--primary-color);
}

.search-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 153, 153, 0.1);
}

.search-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}

.clear-button {
  position: absolute;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.clear-button:hover {
  background-color: rgba(0, 153, 153, 0.1);
  color: var(--primary-color);
}

.results-count {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
  margin-bottom: 0;
}
</style>
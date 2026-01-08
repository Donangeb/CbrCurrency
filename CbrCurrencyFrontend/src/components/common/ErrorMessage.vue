<template>
  <div v-if="message" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4 flex justify-between items-center transition-colors duration-300">
    <div class="flex items-center gap-3">
      <span class="text-xl">⚠️</span>
      <span class="text-red-700 dark:text-red-300 font-medium">{{ message }}</span>
    </div>
    <button
      v-if="dismissible"
      @click="$emit('dismiss')"
      class="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-200 text-xl transition-colors"
      type="button"
    >
      ✕
    </button>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: ''
  },
  dismissible: {
    type: Boolean,
    default: true
  }
})

defineEmits(['dismiss'])
</script>
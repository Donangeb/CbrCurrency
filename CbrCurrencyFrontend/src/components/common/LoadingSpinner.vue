<template>
  <div :class="['flex items-center justify-center', inline ? 'inline-flex flex-row gap-2 p-0' : 'flex-col gap-4 p-8']">
    <div 
      class="rounded-full border-4 border-gray-300 dark:border-gray border-t-primary animate-spin"
      :style="{ width: size, height: size }"
    ></div>
    <p v-if="text" class="text-primary dark:text-primary font-medium m-0">
      {{ text }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: '40px'
  },
  inline: {
    type: Boolean,
    default: false
  }
})
</script>
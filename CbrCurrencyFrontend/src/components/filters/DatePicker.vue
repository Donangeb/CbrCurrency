<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="block mb-2 font-medium text-gray-dark dark:text-gray-light">
      {{ label }}
    </label>
    <input
      type="date"
      class="block w-full px-4 py-3 bg-white dark:bg-[#2d2d2d] text-dark dark:text-light border border-gray-300 dark:border-gray rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
      :value="modelValue"
      :max="maxDate"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  maxDate: String
})

defineEmits(['update:modelValue'])
</script>
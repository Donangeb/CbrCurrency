<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="block mb-2 font-medium text-gray-dark dark:text-gray-light">
      {{ label }}
    </label>
    <div class="relative flex items-center">
      <span class="absolute left-4 text-xl">
        <FontAwesomeIcon icon="search" />
      </span>
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        class="block w-full py-3 pl-12 pr-12 bg-white dark:bg-[#2d2d2d] text-dark dark:text-light border border-gray-300 dark:border-gray rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
      />
      <button
        v-if="modelValue"
        @click="clear"
        class="absolute right-3 text-gray dark:text-gray-light hover:text-gray-dark dark:hover:text-light text-xl transition-colors"
        type="button"
      >
        ✕
      </button>
    </div>
    <p v-if="resultsCount !== undefined" class="text-xs text-gray dark:text-gray-light mt-1">
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
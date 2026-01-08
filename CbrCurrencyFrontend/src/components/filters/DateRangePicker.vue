<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="font-medium text-gray-dark dark:text-gray-light text-sm">
      {{ label }}
    </label>
    <div class="flex items-center gap-2">
      <input
        type="date"
        class="flex-1 py-3 px-4 bg-white dark:bg-[#2d2d2d] text-dark dark:text-light border border-gray-300 dark:border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
        :value="fromDate"
        :max="toDate || maxDate"
        :min="minDate"
        @input="updateFrom($event.target.value)"
      />
      <span class="text-gray dark:text-gray-light">—</span>
      <input
        type="date"
        class="flex-1 py-3 px-4 bg-white dark:bg-[#2d2d2d] text-dark dark:text-light border border-gray-300 dark:border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
        :value="toDate"
        :min="fromDate || minDate"
        :max="maxDate"
        @input="updateTo($event.target.value)"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  fromDate: {
    type: String,
    required: true
  },
  toDate: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  minDate: {
    type: String,
    default: ''
  },
  maxDate: {
    type: String,
    default: ''
  }
})

const emit = defineEmits([
  'update:fromDate',
  'update:toDate'
])

const updateFrom = (value) => {
  emit('update:fromDate', value)
  if (props.toDate && value > props.toDate) {
    emit('update:toDate', value)
  }
}

const updateTo = (value) => {
  emit('update:toDate', value)
  if (props.fromDate && value < props.fromDate) {
    emit('update:fromDate', value)
  }
}
</script>
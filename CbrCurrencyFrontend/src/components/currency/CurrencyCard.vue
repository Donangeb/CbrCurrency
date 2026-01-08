<template>
  <div class="bg-white dark:bg-gray-dark rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div class="flex justify-between items-center mb-3">
      <span class="text-xl font-bold text-primary">{{ currency.code }}</span>
      <span v-if="currency.symbol" class="text-2xl text-gray dark:text-gray-light">{{ currency.symbol }}</span>
    </div>
    <h3 class="text-base font-semibold text-dark dark:text-light mb-4">{{ currency.name }}</h3>
    <div class="space-y-2">
      <div class="flex justify-between text-sm">
        <span class="text-gray dark:text-gray-light">Страна:</span>
        <span class="font-medium text-dark dark:text-light">{{ currency.country }}</span>
      </div>
      <div v-if="currency.rate" class="flex justify-between text-sm">
        <span class="text-gray dark:text-gray-light">Курс:</span>
        <span class="font-mono font-semibold text-primary">{{ formatRate(currency.rate) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatRate } from '@/utils/formatters'

defineProps({
  currency: {
    type: Object,
    required: true
  }
})
</script>
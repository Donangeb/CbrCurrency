<template>
  <div class="currencies-view">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold">Курсы валют ЦБ РФ</h1>
        <p class="text-secondary mt-2">
          Официальные курсы валют к российскому рублю
        </p>
      </div>

      <!-- Filters -->
      <div class="filters-grid">
        <DatePicker
          v-model="selectedDate"
          label="Дата"
          :max-date="maxDate"
          @update:model-value="loadRates"
        />
        <SearchInput
          v-model="searchQuery"
          label="Поиск валюты"
          placeholder="Введите код или название валюты..."
          :results-count="filteredRatesCount"
        />
      </div>

      <!-- Currency Table -->
      <CurrencyTable
        :rates="filteredRates"
        :loading="ratesStore.loading"
        :error="ratesStore.error"
        :selected-date="selectedDate"
        @view-history="viewHistory"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRatesStore } from '@/stores/rates'
import CurrencyTable from '@/components/currency/CurrencyTable.vue'
import DatePicker from '@/components/filters/DatePicker.vue'
import SearchInput from '@/components/filters/SearchInput.vue'

const router = useRouter()
const ratesStore = useRatesStore()

const selectedDate = ref(new Date().toISOString().split('T')[0])
const searchQuery = ref('')
const maxDate = new Date().toISOString().split('T')[0]

const filteredRates = computed(() => {
  if (!searchQuery.value) return ratesStore.rates

  const q = searchQuery.value.toLowerCase()
  return ratesStore.rates.filter(r =>
    r.charCode.toLowerCase().includes(q) ||
    r.name.toLowerCase().includes(q)
  )
})

const filteredRatesCount = computed(() => {
  return filteredRates.value.length
})

const loadRates = async () => {
  await ratesStore.fetchRates(selectedDate.value)
}

const viewHistory = (currencyCode) => {
  router.push({
    name: 'history',
    query: { code: currencyCode }
  })
}

onMounted(() => {
  loadRates()
})
</script>

<style scoped>
.currencies-view {
  min-height: 100vh;
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.currencies-view h1 {
  color: var(--text-primary);
}

.text-secondary {
  color: var(--text-secondary);
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .filters-grid {
    grid-template-columns: 1fr;
  }
}
</style>
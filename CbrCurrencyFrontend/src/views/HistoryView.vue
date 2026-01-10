<template>
  <div class="history-view">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold">История курсов</h1>
        <p class="text-secondary mt-2">Динамика изменения курса валюты</p>
      </div>
      
      <!-- Filters -->
      <div class="filters-card">
        <div class="filters-grid">
          <div class="filter-item">
            <label class="filter-label">
              Валюта
            </label>
            <select
              v-model="selectedCode"
              @change="loadHistory"
              class="currency-select"
            >
              <option value="">Выберите валюту</option>
              <option v-for="currency in currenciesStore.currencies" :key="currency.code" :value="currency.code">
                {{ currency.code }} - {{ currency.name }}
              </option>
            </select>
          </div>
          
          <div class="filter-item date-range-item">
            <DateRangePicker
              v-model:from-date="fromDate"
              v-model:to-date="toDate"
              label="Период"
              @update:from-date="loadHistory"
              @update:to-date="loadHistory"
            />
          </div>
        </div>
      </div>

      <!-- Chart -->
      <CurrencyChart
        :history="ratesStore.history"
        :currency-code="selectedCode"
        :loading="ratesStore.loading"
        :error="ratesStore.error"
        :from-date="fromDate"
        :to-date="toDate"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRatesStore } from '@/stores/rates'
import { useCurrenciesStore } from '@/stores/currencies'
import CurrencyChart from '@/components/currency/CurrencyChart.vue'
import DateRangePicker from '@/components/filters/DateRangePicker.vue'

const route = useRoute()
const ratesStore = useRatesStore()
const currenciesStore = useCurrenciesStore()

const selectedCode = ref(route.query.code || '')
const toDate = ref(new Date().toISOString().split('T')[0])
const fromDate = ref(
  (() => {
    const date = new Date()
    date.setMonth(date.getMonth() - 1)
    return date.toISOString().split('T')[0]
  })()
)

const loadHistory = async () => {
  if (!selectedCode.value) return
  await ratesStore.fetchHistory(selectedCode.value, fromDate.value, toDate.value)
}

onMounted(async () => {
  await currenciesStore.fetchCurrencies()
  if (selectedCode.value) {
    await loadHistory()
  }
})
</script>

<style scoped>
.history-view {
  min-height: 100vh;
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.history-view h1 {
  color: var(--text-primary);
}

.text-secondary {
  color: var(--text-secondary);
}

.filters-card {
  background-color: var(--bg-secondary);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: background-color 0.3s ease;
}

.filters-card label {
  color: var(--text-primary);
}

.filter-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0;
}

.filters-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  align-items: start;
}

@media (max-width: 768px) {
  .filters-grid {
    grid-template-columns: 1fr;
  }
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.date-range-item {
  display: flex;
  flex-direction: column;
}

.currency-select {
  display: block;
  width: 100%;
  padding: 11px 16px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid rgb(209, 213, 219);
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  min-height: 48px;
  box-sizing: border-box;
}

.dark .currency-select {
  border-color: rgb(55, 65, 81);
}

.currency-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 153, 153, 0.1);
}

.currency-select option {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}
</style>
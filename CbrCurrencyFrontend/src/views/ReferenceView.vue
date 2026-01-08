<template>
  <div class="reference-view container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Справочник валют</h1>
      <p class="text-secondary mt-2">Полный список валют в системе</p>
    </div>

    <!-- Search -->
    <div class="mb-6">
      <SearchInput
        v-model="searchQuery"
        placeholder="Поиск по коду или названию..."
        :results-count="filteredCurrencies.length"
      />
    </div>

    <!-- Loading -->
    <div v-if="currenciesStore.loading" class="loading-card">
      <div class="spinner"></div>
      <p class="mt-4 text-secondary">Загрузка справочника...</p>
    </div>

    <!-- Error -->
    <div v-else-if="currenciesStore.error" class="error-message">
      <p>{{ currenciesStore.error }}</p>
    </div>

    <!-- Currency Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="currency in filteredCurrencies"
        :key="currency.code"
        class="currency-card"
        @click="viewHistory(currency.code)"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-2xl font-bold">{{ currency.code }}</span>
          <button class="history-button">
            История →
          </button>
        </div>
        <p class="text-secondary">{{ currency.name }}</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!currenciesStore.loading && filteredCurrencies.length === 0" class="empty-state">
      <p>Валюты не найдены</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCurrenciesStore } from '@/stores/currencies'
import SearchInput from '@/components/filters/SearchInput.vue'

const router = useRouter()
const currenciesStore = useCurrenciesStore()
const searchQuery = ref('')

const filteredCurrencies = computed(() => {
  if (!searchQuery.value) return currenciesStore.currencies
  
  const query = searchQuery.value.toLowerCase()
  return currenciesStore.currencies.filter(c =>
    c.code.toLowerCase().includes(query) ||
    c.name.toLowerCase().includes(query)
  )
})

const viewHistory = (code) => {
  router.push({
    name: 'history',
    query: { code }
  })
}

onMounted(() => {
  currenciesStore.fetchCurrencies()
})
</script>

<style scoped>
.reference-view {
  color: var(--text-primary);
}

.reference-view h1 {
  color: var(--text-primary);
}

.text-secondary {
  color: var(--text-secondary);
}

/* Loading Card */
.loading-card {
  background-color: var(--bg-secondary);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 3rem;
  text-align: center;
}

.spinner {
  display: inline-block;
  width: 3rem;
  height: 3rem;
  border: 2px solid transparent;
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Currency Card */
.currency-card {
  background-color: var(--bg-secondary);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-primary);
}

.currency-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.currency-card span {
  color: var(--text-primary);
}

/* History Button */
.history-button {
  color: var(--primary-color);
  font-size: 0.875rem;
  transition: color 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;
}

.history-button:hover {
  color: var(--primary-hover);
}

/* Error Message */
.error-message {
  background-color: #fef2f2;
  border-left: 4px solid #ef4444;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.error-message p {
  color: #991b1b;
}

/* Empty State */
.empty-state {
  background-color: var(--bg-secondary);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 3rem;
  text-align: center;
  color: var(--text-secondary);
}

/* Dark theme adjustments */
:global(.dark) .error-message {
  background-color: rgba(239, 68, 68, 0.1);
  border-left-color: #f87171;
}

:global(.dark) .error-message p {
  color: #fca5a5;
}

:global(.dark) .currency-card:hover {
  box-shadow: 0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05);
}
</style>
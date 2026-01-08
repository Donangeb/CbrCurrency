<template>
  <div class="stats-view container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Статистика</h1>
      <p class="text-secondary mt-2">Общая информация о данных в системе</p>
    </div>

    <!-- Loading -->
    <div v-if="statsStore.loading" class="loading-card">
      <div class="spinner"></div>
      <p class="mt-4 text-secondary">Загрузка статистики...</p>
    </div>

    <!-- Error -->
    <div v-else-if="statsStore.error" class="error-message">
      <p>{{ statsStore.error }}</p>
    </div>

    <!-- Stats Cards -->
    <div v-else-if="statsStore.stats" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Валют в системе"
        :value="statsStore.stats.currenciesCount"
        :icon="['fas', 'money-bill-wave']"
        color="blue"
      />
      
      <StatsCard
        title="Курсов загружено"
        :value="statsStore.stats.ratesCount"
        :icon="['fas', 'database']"
        color="green"
      />
      
      <StatsCard
        title="Первая дата"
        :value="statsStore.stats.firstDate"
        :icon="['fas', 'calendar-alt']"
        color="orange"
      />
      
      <StatsCard
        title="Последняя дата"
        :value="statsStore.stats.lastDate"
        :icon="['fas', 'calendar-alt']"
        color="purple"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStatsStore } from '@/stores/stats'
import StatsCard from '@/components/stats/StatsCard.vue'

const statsStore = useStatsStore()

onMounted(() => {
  statsStore.fetchStats()
})
</script>

<style scoped>
.stats-view {
  color: var(--text-primary);
}

.stats-view h1 {
  color: var(--text-primary);
}

.text-secondary {
  color: var(--text-secondary);
}

.loading-card {
  background-color: var(--bg-secondary);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 3rem;
  text-align: center;
  transition: background-color 0.3s ease;
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

.error-message {
  background-color: #fef2f2;
  border-left: 4px solid #ef4444;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.error-message p {
  color: #991b1b;
}

:global(.dark) .error-message {
  background-color: rgba(239, 68, 68, 0.1);
  border-left-color: #f87171;
}

:global(.dark) .error-message p {
  color: #fca5a5;
}
</style>
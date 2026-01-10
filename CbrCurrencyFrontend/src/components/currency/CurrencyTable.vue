<template>
  <div class="currency-table-wrapper">
    <table class="currency-table">
      <thead>
        <tr>
          <th @click="sortBy('code')" class="sortable">
            Код
            <span class="sort-icon">{{ getSortIcon('code') }}</span>
          </th>
          <th @click="sortBy('name')" class="sortable">
            Название
            <span class="sort-icon">{{ getSortIcon('name') }}</span>
          </th>
          <th @click="sortBy('rate')" class="sortable">
            Курс
            <span class="sort-icon">{{ getSortIcon('rate') }}</span>
          </th>
          <th @click="sortBy('change')" class="sortable">
            Изменение
            <span class="sort-icon">{{ getSortIcon('change') }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rate in sortedRates" :key="rate.code">
          <td class="code">{{ rate.code }}</td>
          <td>{{ rate.name }}</td>
          <td class="rate">{{ formatRate(rate.rate) }}</td>
          <td class="px-4 py-2 text-right">
            <span
              v-if="rate.change !== 0"
              :class="rate.change > 0 ? 'change-up' : 'change-down'"
            >
              <span class="arrow">
                {{ rate.change > 0 ? '▲' : '▼' }}
              </span>
              {{ Math.abs(rate.change).toFixed(4) }}
            </span>
            <span v-else class="change-neutral">—</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!sortedRates.length" class="no-data">
      Нет данных для отображения
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatRate } from '@/utils/formatters'

const props = defineProps({
  rates: {
    type: Array,
    required: true
  }
})

const sortField = ref('code')
const sortDirection = ref('asc')

const sortBy = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const getSortIcon = (field) => {
  if (sortField.value !== field) return '⇅'
  return sortDirection.value === 'asc' ? '↑' : '↓'
}

const sortedRates = computed(() => {
  return [...props.rates].sort((a, b) => {
    let aVal = a[sortField.value]
    let bVal = b[sortField.value]
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = bVal.toLowerCase()
    }
    
    if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })
})
</script>

<style scoped>
.currency-table-wrapper {
  background: var(--bg-secondary);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: background-color 0.3s ease;
}

.currency-table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: var(--bg-secondary);
  filter: brightness(0.95);
}

th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--text-primary);
  border-bottom: 2px solid rgba(209, 213, 219, 0.3);
}

th.sortable {
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
}

th.sortable:hover {
  opacity: 1;
  filter: brightness(0.9);
}

.sort-icon {
  margin-left: 0.5rem;
  color: var(--text-secondary);
}

td {
  padding: 1rem;
  border-bottom: 1px solid rgba(209, 213, 219, 0.3);
  color: var(--text-primary);
}

tr:last-child td {
  border-bottom: none;
}

tbody tr {
  transition: background-color 0.2s;
}

tbody tr:hover {
  background: var(--bg-secondary);
  filter: brightness(0.95);
}

.code {
  font-weight: 600;
  color: var(--primary-color);
}

.rate {
  font-weight: 500;
  font-family: 'Courier New', monospace;
}

.change-up {
  color: #16a34a;
  font-weight: 600;
}

.change-down {
  color: #dc2626;
  font-weight: 600;
}

.change-neutral {
  color: var(--text-secondary);
}

.arrow {
  margin-right: 4px;
}

.no-data {
  padding: 3rem;
  text-align: center;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  th, td {
    padding: 0.75rem 0.5rem;
    font-size: 0.9rem;
  }
}
</style>
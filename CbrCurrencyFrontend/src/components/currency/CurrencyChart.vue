<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { useThemeStore } from '@/stores/theme'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
)

const props = defineProps({
  history: {
    type: Array,
    default: () => []
  }
})

const themeStore = useThemeStore()

const chartData = computed(() => ({
  labels: props.history.map(p =>
    new Date(p.date).toLocaleDateString('ru-RU')
  ),
  datasets: [
    {
      label: 'Курс',
      data: props.history.map(p => p.value),
      borderColor: '#009999',
      backgroundColor: 'rgba(0, 153, 153, 0.1)',
      tension: 0.3,
      pointBackgroundColor: '#009999',
      pointBorderColor: themeStore.isDark ? '#2d2d2d' : '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      labels: {
        color: themeStore.isDark ? '#d1d5db' : '#0f172a',
        font: {
          size: 14
        }
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: themeStore.isDark ? '#2d2d2d' : '#ffffff',
      titleColor: themeStore.isDark ? '#f8fafc' : '#0f172a',
      bodyColor: themeStore.isDark ? '#d1d5db' : '#64748b',
      borderColor: '#009999',
      borderWidth: 1
    }
  },
  scales: {
    x: {
      ticks: {
        color: themeStore.isDark ? '#d1d5db' : '#64748b'
      },
      grid: {
        color: themeStore.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      }
    },
    y: {
      ticks: {
        color: themeStore.isDark ? '#d1d5db' : '#64748b',
        callback: value => value.toFixed(2)
      },
      grid: {
        color: themeStore.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      }
    }
  }
}))
</script>

<style scoped>
.chart-container {
  background-color: var(--bg-secondary);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  transition: background-color 0.3s ease;
}
</style>
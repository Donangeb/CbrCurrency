import { defineStore } from 'pinia'
import statsApi from '@/api/stats'

export const useStatsStore = defineStore('stats', {
  state: () => ({
    stats: null, // StatsDto
    loading: false,
    error: null
  }),

  actions: {
    async fetchStats() {
      this.loading = true
      this.error = null
      try {
        const response = await statsApi.getStats()
        this.stats = response.data
      } catch (error) {
        this.error = error.message
        console.error('Error fetching stats:', error)
      } finally {
        this.loading = false
      }
    }
  }
})
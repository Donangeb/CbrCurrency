import { defineStore } from 'pinia'
import api from '@/api'

export const useRatesStore = defineStore('rates', {
  state: () => ({
    rates: [],
    history: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchRates(date) {
      this.loading = true
      this.error = null

      try {
        const todayRes = await api.get('/api/rates', {
          params: { date }
        })

        const prevDate = new Date(date)
        prevDate.setDate(prevDate.getDate() - 1)

        const prevRes = await api.get('/api/rates', {
          params: {
            date: prevDate.toISOString().split('T')[0]
          }
        })

        const prevMap = new Map(
          prevRes.data.map(r => [r.charCode, r])
        )

        this.rates = todayRes.data.map(rate => {
          const prev = prevMap.get(rate.charCode)

          return {
            ...rate,
            change: prev ? rate.rate - prev.rate : 0
          }
        })
      } catch (e) {
        this.error = 'Ошибка загрузки курсов'
      } finally {
        this.loading = false
      }
    },

    async fetchHistory(code, from, to) {
      this.loading = true
      this.error = null

      try {
        const res = await api.get('/api/rates/history', {
          params: { code, from, to }
        })

        // нормализуем под график
        this.history = res.data.map(item => ({
          date: item.date,
          value: item.rate
        }))
      } catch (e) {
        this.error = 'Ошибка загрузки истории'
        this.history = []
      } finally {
        this.loading = false
      }
    }
  }
})

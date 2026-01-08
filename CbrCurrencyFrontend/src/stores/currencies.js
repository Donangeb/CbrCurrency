import { defineStore } from 'pinia'
import currenciesApi from '@/api/currencies'

export const useCurrenciesStore = defineStore('currencies', {
  state: () => ({
    currencies: [], // CurrencyDto[]
    loading: false,
    error: null
  }),

  actions: {
    async fetchCurrencies() {
      this.loading = true
      this.error = null
      try {
        const response = await currenciesApi.getAll()
        this.currencies = response.data
      } catch (error) {
        this.error = error.message
        console.error('Error fetching currencies:', error)
      } finally {
        this.loading = false
      }
    }
  }
})
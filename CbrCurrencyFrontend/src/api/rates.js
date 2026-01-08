import apiClient from './index'

export default {
  // GET /api/rates?date=YYYY-MM-DD -> ExchangeRateDto[]
  getRatesByDate(date) {
    return apiClient.get('/api/rates', { 
      params: { date } 
    })
  },
  
  // GET /api/rates/history?code=XXX&from=YYYY-MM-DD&to=YYYY-MM-DD -> ExchangeRateHistoryDto[]
  getRatesHistory(code, from, to) {
    return apiClient.get('/api/rates/history', {
      params: { code, from, to }
    })
  }
}
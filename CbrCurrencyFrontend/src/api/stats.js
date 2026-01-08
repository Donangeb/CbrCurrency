import apiClient from './index'

export default {
  getStats() {
    return apiClient.get('/api/stats')
  }
}
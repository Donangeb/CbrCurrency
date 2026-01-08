import apiClient from './index'

export default {
  init() {
    return apiClient.post('/api/admin/init')
  },
  
  update() {
    return apiClient.post('/api/admin/update')
  }
}
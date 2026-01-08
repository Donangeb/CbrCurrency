import { createRouter, createWebHistory } from 'vue-router'
import CurrenciesView from '@/views/CurrenciesView.vue'
import HistoryView from '@/views/HistoryView.vue'
import ReferenceView from '@/views/ReferenceView.vue'
import StatsView from '@/views/StatsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/currencies'
    },
    {
      path: '/currencies',
      name: 'currencies',
      component: CurrenciesView,
      meta: { title: 'Курсы валют' }
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView,
      meta: { title: 'История курсов' }
    },
    {
      path: '/reference',
      name: 'reference',
      component: ReferenceView,
      meta: { title: 'Справочник валют' }
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView,
      meta: { title: 'Статистика' }
    },
  ]
})

export default router
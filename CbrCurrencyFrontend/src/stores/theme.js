import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  // Инициализация темы из localStorage или системных настроек
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      // Проверяем системные настройки
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  // Применение темы к document
  const applyTheme = () => {
    const root = document.documentElement
    
    if (isDark.value) {
      root.classList.add('dark')
      // Устанавливаем CSS-переменные для тёмной темы
      root.style.setProperty('--color-bg-light', '#1a1a1a')
      root.style.setProperty('--color-text-dark', '#f8fafc')
      root.style.setProperty('--bg-secondary', '#2d2d2d')
      root.style.setProperty('--text-primary', '#f8fafc')
      root.style.setProperty('--text-secondary', '#d1d5db')
      root.style.setProperty('--primary-color', '#00b3b3')
      root.style.setProperty('--primary-hover', '#00cccc')
    } else {
      root.classList.remove('dark')
      // Устанавливаем CSS-переменные для светлой темы
      root.style.setProperty('--color-bg-light', '#f8fafc')
      root.style.setProperty('--color-text-dark', '#0f172a')
      root.style.setProperty('--bg-secondary', '#ffffff')
      root.style.setProperty('--text-primary', '#0f172a')
      root.style.setProperty('--text-secondary', '#64748b')
      root.style.setProperty('--primary-color', '#009999')
      root.style.setProperty('--primary-hover', '#007a7a')
    }
  }

  // Переключение темы
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  // Сохранение темы при изменении
  watch(isDark, (newValue) => {
    localStorage.setItem('theme', newValue ? 'dark' : 'light')
    applyTheme()
  })

  return {
    isDark,
    initTheme,
    toggleTheme,
  }
})
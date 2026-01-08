<template>
  <div class="app min-h-screen flex flex-col">
    <AppHeader />

    <main class="flex-1 main-content">
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'

const themeStore = useThemeStore()

onMounted(() => {
  // Инициализация темы при загрузке приложения
  themeStore.initTheme()
})
</script>

<style>
:root {
  /* Значения по умолчанию (светлая тема) */
  --color-bg-light: #f8fafc;
  --color-text-dark: #0f172a;
  --bg-secondary: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --primary-color: #009999;
  --primary-hover: #007a7a;
}

.app {
  background-color: var(--color-bg-light);
  color: var(--color-text-dark);
  font-family: Inter, Roboto, 'Helvetica Neue', Arial, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
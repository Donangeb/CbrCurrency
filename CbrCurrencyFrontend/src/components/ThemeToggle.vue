<template>
  <button
    @click="themeStore.toggleTheme()"
    class="theme-toggle"
    :title="themeStore.isDark ? 'Дневной режим' : 'Ночной режим'"
  >
    <span v-if="themeStore.isDark" class="icon">
      <FontAwesomeIcon icon="sun" />
    </span>
    <span v-else class="icon">
      <FontAwesomeIcon icon="moon" />
    </span>
  </button>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<style scoped>
.theme-toggle {
  background: transparent;
  border: 2px solid currentColor;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: inherit;
}

.theme-toggle:hover {
  background: rgba(0, 153, 153, 0.1);
  transform: scale(1.1);
}

.icon {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
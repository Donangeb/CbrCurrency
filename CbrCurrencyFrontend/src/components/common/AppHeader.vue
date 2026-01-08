<template>
  <header class="bg-primary dark:bg-dark text-light dark:text-light shadow-lg transition-colors duration-300">
    <div class="container max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center gap-3">
        <span class="text-4xl">
          <FontAwesomeIcon icon="exchange-alt" />
        </span>
        <h1 class="text-2xl font-bold">Курсы валют</h1>
      </div>
      
      <nav class="flex items-center gap-6">
        <RouterLink to="/currencies" active-class="active" class="nav-link">
          Курсы
        </RouterLink>
        <RouterLink to="/history" active-class="active" class="nav-link">
          История
        </RouterLink>
        <RouterLink to="/reference" active-class="active" class="nav-link">
          Справочник
        </RouterLink>
        <RouterLink to="/stats" active-class="active" class="nav-link">
          Статистика
        </RouterLink>
        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>

<style scoped>
.nav-link {
  @apply text-light dark:text-light font-medium px-4 py-2 rounded-lg transition-all duration-300;
}

.nav-link:hover {
  @apply bg-white/20;
}

.nav-link.active {
  @apply bg-white/30 shadow-md;
}

@media (max-width: 768px) {
  .container {
    @apply flex-col gap-4;
  }

  nav {
    @apply flex-wrap justify-center gap-2;
  }

  .nav-link {
    @apply text-sm px-3 py-1.5;
  }
}
</style>
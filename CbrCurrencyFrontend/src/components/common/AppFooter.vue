<template>
  <footer class="bg-dark dark:bg-black text-gray dark:text-gray-light py-8 mt-auto transition-colors duration-300">
    <div class="container max-w-7xl mx-auto px-4 text-center">
      <p class="text-base mb-2">&copy; {{ currentYear }} Курсы валют. Все права защищены.</p>
      <p class="text-sm text-gray-dark dark:text-gray">Powered by <FontAwesomeIcon :icon="['fab', 'vuejs']" /> Vue.js</p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
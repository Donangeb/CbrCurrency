import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// Импорт FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Импорт иконок
import { 
  faUserSecret, 
  faHome, 
  faSearch,
  faSun, 
  faMoon,
  faExchangeAlt,
  faMoneyBillWave,  // для валют
  faDatabase,        // для курсов
  faCalendarAlt,     // для дат
  faChartLine        // для графиков
} from '@fortawesome/free-solid-svg-icons'
import { faVuejs, faGithub } from '@fortawesome/free-brands-svg-icons'

// Добавление иконок в библиотеку
library.add(
  faUserSecret, 
  faHome, 
  faSearch, 
  faVuejs, 
  faGithub, 
  faSun, 
  faMoon,
  faExchangeAlt,
  faMoneyBillWave,
  faDatabase,
  faCalendarAlt,
  faChartLine
)

const app = createApp(App)

// Регистрация глобального компонента
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)
app.mount('#app')
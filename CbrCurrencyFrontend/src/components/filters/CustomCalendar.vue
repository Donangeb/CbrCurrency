<template>
  <div class="custom-calendar" ref="calendarRef">
    <!-- Header с месяцем и годом -->
    <div class="calendar-header">
      <button @click="previousMonth" class="nav-button" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <div class="month-year">
        {{ monthNames[currentMonth] }} {{ currentYear }}
      </div>
      
      <button @click="nextMonth" class="nav-button" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>

    <!-- Дни недели -->
    <div class="calendar-weekdays">
      <div v-for="day in weekDays" :key="day" class="weekday">
        {{ day }}
      </div>
    </div>

    <!-- Дни месяца -->
    <div class="calendar-days">
      <button
        v-for="day in calendarDays"
        :key="`${day.date}-${day.month}`"
        @click="selectDate(day)"
        :disabled="day.disabled"
        :class="[
          'calendar-day',
          {
            'other-month': day.isOtherMonth,
            'selected': isSelected(day),
            'in-range': isInRange(day),
            'range-start': isRangeStart(day),
            'range-end': isRangeEnd(day),
            'today': isToday(day),
            'disabled': day.disabled
          }
        ]"
        type="button"
      >
        {{ day.date }}
      </button>
    </div>

    <!-- Футер с кнопками (для range picker) -->
    <div v-if="mode === 'range'" class="calendar-footer">
      <button @click="clearDates" class="footer-button clear" type="button">
        Очистить
      </button>
      <button @click="applyDates" class="footer-button apply" type="button">
        Выбрать
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Object],
    default: null
  },
  mode: {
    type: String,
    default: 'single',
    validator: (value) => ['single', 'range'].includes(value)
  },
  minDate: {
    type: String,
    default: null
  },
  maxDate: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const calendarRef = ref(null)
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const rangeStart = ref(null)
const rangeEnd = ref(null)

const monthNames = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

// Парсинг даты из строки
const parseDate = (dateStr) => {
  if (!dateStr) return null
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// Форматирование даты в строку
const formatDate = (date) => {
  if (!date) return null
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Инициализация выбранных дат
watch(() => props.modelValue, (newValue) => {
  if (props.mode === 'range' && newValue) {
    rangeStart.value = newValue.from ? parseDate(newValue.from) : null
    rangeEnd.value = newValue.to ? parseDate(newValue.to) : null
    if (rangeStart.value) {
      currentMonth.value = rangeStart.value.getMonth()
      currentYear.value = rangeStart.value.getFullYear()
    }
  } else if (props.mode === 'single' && newValue) {
    const date = parseDate(newValue)
    if (date) {
      currentMonth.value = date.getMonth()
      currentYear.value = date.getFullYear()
    }
  }
}, { immediate: true })

// Генерация дней календаря
const calendarDays = computed(() => {
  const days = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  
  // Получаем день недели (0 = воскресенье, 6 = суббота)
  // Конвертируем в европейский формат (0 = понедельник, 6 = воскресенье)
  let firstDayOfWeek = firstDay.getDay()
  firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
  
  // Дни предыдущего месяца
  const prevMonthLastDay = new Date(currentYear.value, currentMonth.value, 0)
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = prevMonthLastDay.getDate() - i
    const fullDate = new Date(currentYear.value, currentMonth.value - 1, date)
    days.push({
      date,
      month: currentMonth.value - 1,
      year: currentYear.value,
      isOtherMonth: true,
      fullDate,
      disabled: isDisabled(fullDate)
    })
  }
  
  // Дни текущего месяца
  for (let date = 1; date <= lastDay.getDate(); date++) {
    const fullDate = new Date(currentYear.value, currentMonth.value, date)
    days.push({
      date,
      month: currentMonth.value,
      year: currentYear.value,
      isOtherMonth: false,
      fullDate,
      disabled: isDisabled(fullDate)
    })
  }
  
  // Дни следующего месяца
  const remainingDays = 42 - days.length // 6 недель по 7 дней
  for (let date = 1; date <= remainingDays; date++) {
    const fullDate = new Date(currentYear.value, currentMonth.value + 1, date)
    days.push({
      date,
      month: currentMonth.value + 1,
      year: currentYear.value,
      isOtherMonth: true,
      fullDate,
      disabled: isDisabled(fullDate)
    })
  }
  
  return days
})

// Проверка, отключена ли дата
const isDisabled = (date) => {
  if (props.minDate) {
    const min = parseDate(props.minDate)
    if (min && date < min) return true
  }
  if (props.maxDate) {
    const max = parseDate(props.maxDate)
    if (max && date > max) return true
  }
  return false
}

// Проверка, является ли день сегодняшним
const isToday = (day) => {
  const today = new Date()
  return day.date === today.getDate() &&
         day.month === today.getMonth() &&
         day.year === today.getFullYear()
}

// Проверка, выбран ли день
const isSelected = (day) => {
  if (props.mode === 'single') {
    if (!props.modelValue) return false
    const selected = parseDate(props.modelValue)
    return selected && 
           day.date === selected.getDate() &&
           day.month === selected.getMonth() &&
           day.year === selected.getFullYear()
  } else {
    return isRangeStart(day) || isRangeEnd(day)
  }
}

// Проверка, является ли день началом диапазона
const isRangeStart = (day) => {
  if (!rangeStart.value) return false
  return day.date === rangeStart.value.getDate() &&
         day.month === rangeStart.value.getMonth() &&
         day.year === rangeStart.value.getFullYear()
}

// Проверка, является ли день концом диапазона
const isRangeEnd = (day) => {
  if (!rangeEnd.value) return false
  return day.date === rangeEnd.value.getDate() &&
         day.month === rangeEnd.value.getMonth() &&
         day.year === rangeEnd.value.getFullYear()
}

// Проверка, находится ли день в диапазоне
const isInRange = (day) => {
  if (!rangeStart.value || !rangeEnd.value) return false
  const dayDate = day.fullDate
  return dayDate > rangeStart.value && dayDate < rangeEnd.value
}

// Выбор даты
const selectDate = (day) => {
  if (day.disabled) return
  
  if (props.mode === 'single') {
    const dateStr = formatDate(day.fullDate)
    emit('update:modelValue', dateStr)
    emit('close')
  } else {
    // Range mode
    if (!rangeStart.value || (rangeStart.value && rangeEnd.value)) {
      // Начинаем новый выбор
      rangeStart.value = day.fullDate
      rangeEnd.value = null
    } else {
      // Заканчиваем выбор
      if (day.fullDate < rangeStart.value) {
        rangeEnd.value = rangeStart.value
        rangeStart.value = day.fullDate
      } else {
        rangeEnd.value = day.fullDate
      }
    }
  }
}

// Применить выбранные даты (для range mode)
const applyDates = () => {
  if (rangeStart.value && rangeEnd.value) {
    emit('update:modelValue', {
      from: formatDate(rangeStart.value),
      to: formatDate(rangeEnd.value)
    })
    emit('close')
  }
}

// Очистить выбранные даты
const clearDates = () => {
  rangeStart.value = null
  rangeEnd.value = null
  if (props.mode === 'range') {
    emit('update:modelValue', { from: null, to: null })
  } else {
    emit('update:modelValue', null)
  }
}

// Навигация по месяцам
const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}
</script>

<style scoped>
.custom-calendar {
  background-color: var(--bg-secondary);
  border: 1px solid;
  border-color: rgb(209, 213, 219);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  min-width: 320px;
  user-select: none;
}

.dark .custom-calendar {
  border-color: rgb(55, 65, 81);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

/* Header */
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.month-year {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  color: var(--text-secondary);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-button:hover {
  background-color: rgba(0, 153, 153, 0.1);
  color: var(--primary-color);
}

/* Weekdays */
.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}

.weekday {
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 8px 0;
}

/* Days */
.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  color: var(--text-primary);
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.calendar-day:hover:not(.disabled) {
  background-color: rgba(0, 153, 153, 0.1);
}

.calendar-day.other-month {
  color: var(--text-secondary);
  opacity: 0.4;
}

.calendar-day.today {
  font-weight: 700;
  color: var(--primary-color);
}

.calendar-day.selected {
  background-color: var(--primary-color);
  color: white;
  font-weight: 600;
}

.calendar-day.selected:hover {
  background-color: var(--primary-hover);
}

.calendar-day.range-start,
.calendar-day.range-end {
  background-color: var(--primary-color);
  color: white;
  font-weight: 600;
}

.calendar-day.in-range {
  background-color: rgba(0, 153, 153, 0.15);
  color: var(--text-primary);
}

.calendar-day.disabled {
  color: var(--text-secondary);
  opacity: 0.3;
  cursor: not-allowed;
}

.calendar-day.disabled:hover {
  background-color: transparent;
}

/* Footer */
.calendar-footer {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid;
  border-color: rgb(229, 231, 235);
}

.dark .calendar-footer {
  border-color: rgb(55, 65, 81);
}

.footer-button {
  flex: 1;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.footer-button.clear {
  background-color: transparent;
  color: var(--text-secondary);
  border: 1px solid rgb(229, 231, 235);
}

.dark .footer-button.clear {
  border-color: rgb(55, 65, 81);
}

.footer-button.clear:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark .footer-button.clear:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.footer-button.apply {
  background-color: var(--primary-color);
  color: white;
}

.footer-button.apply:hover {
  background-color: var(--primary-hover);
}
</style>
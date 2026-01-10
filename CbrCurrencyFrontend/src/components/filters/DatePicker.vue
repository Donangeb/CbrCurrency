<template>
  <div class="date-picker-wrapper" ref="pickerRef">
    <label v-if="label" class="date-picker-label">
      {{ label }}
    </label>
    
    <div class="date-input-container">
      <input
        type="text"
        readonly
        class="date-input"
        :value="displayValue"
        :placeholder="placeholder"
        @click="toggleCalendar"
      />
      <button 
        type="button" 
        class="calendar-icon-button" 
        @click="toggleCalendar"
        tabindex="-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </button>
    </div>

    <Teleport to="body">
      <div 
        v-if="isCalendarOpen" 
        class="calendar-dropdown"
        :style="dropdownStyle"
      >
        <CustomCalendar
          :model-value="modelValue"
          mode="single"
          :min-date="minDate"
          :max-date="maxDate"
          @update:model-value="handleDateSelect"
          @close="closeCalendar"
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import CustomCalendar from './CustomCalendar.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Выберите дату'
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

const emit = defineEmits(['update:modelValue'])

const pickerRef = ref(null)
const isCalendarOpen = ref(false)
const dropdownStyle = ref({})

const displayValue = computed(() => {
  if (!props.modelValue) return ''
  const [year, month, day] = props.modelValue.split('-')
  return `${day}.${month}.${year}`
})

const toggleCalendar = () => {
  isCalendarOpen.value = !isCalendarOpen.value
  if (isCalendarOpen.value) {
    nextTick(() => {
      calculateDropdownPosition()
    })
  }
}

const closeCalendar = () => {
  isCalendarOpen.value = false
}

const handleDateSelect = (value) => {
  emit('update:modelValue', value)
  closeCalendar()
}

const calculateDropdownPosition = () => {
  if (!pickerRef.value) return
  
  const rect = pickerRef.value.getBoundingClientRect()
  const spaceBelow = window.innerHeight - rect.bottom
  const spaceAbove = rect.top
  const dropdownHeight = 400
  
  let top, left
  
  if (spaceBelow >= dropdownHeight || spaceBelow > spaceAbove) {
    top = rect.bottom + window.scrollY + 4
  } else {
    top = rect.top + window.scrollY - dropdownHeight - 4
  }
  
  left = rect.left + window.scrollX
  
  const calendarWidth = 320
  if (left + calendarWidth > window.innerWidth) {
    left = window.innerWidth - calendarWidth - 10
  }
  
  dropdownStyle.value = {
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
    zIndex: '1000'
  }
}

const handleClickOutside = (event) => {
  if (!isCalendarOpen.value) return
  if (!pickerRef.value) return
  
  const dropdown = document.querySelector('.calendar-dropdown')
  if (
    !pickerRef.value.contains(event.target) &&
    (!dropdown || !dropdown.contains(event.target))
  ) {
    closeCalendar()
  }
}

const handleScroll = () => {
  if (isCalendarOpen.value) {
    calculateDropdownPosition()
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  window.addEventListener('scroll', handleScroll, true)
  window.addEventListener('resize', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  window.removeEventListener('scroll', handleScroll, true)
  window.removeEventListener('resize', handleScroll)
})
</script>

<style scoped>
.date-picker-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  width: 100%;
}

.date-picker-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.date-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.date-input {
  display: block;
  width: 100%;
  padding: 11px 40px 11px 16px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid rgb(209, 213, 219);
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  min-height: 48px;
  line-height: 1.5;
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.dark .date-input {
  border-color: rgb(55, 65, 81);
}

.date-input:hover {
  border-color: var(--primary-color);
}

.date-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 153, 153, 0.1);
}

.date-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}

.calendar-icon-button {
  position: absolute;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  pointer-events: all;
}

.calendar-icon-button:hover {
  background-color: rgba(0, 153, 153, 0.1);
  color: var(--primary-color);
}

.calendar-dropdown {
  position: absolute;
  z-index: 1000;
}
</style>
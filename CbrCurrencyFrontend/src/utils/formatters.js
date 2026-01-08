/**
 * Форматирует курс валюты
 * @param {number} rate - курс валюты
 * @param {number} decimals - количество знаков после запятой
 * @returns {string}
 */
export const formatRate = (rate, decimals = 4) => {
  if (!rate && rate !== 0) return '-'
  return parseFloat(rate).toFixed(decimals)
}

/**
 * Форматирует изменение курса
 * @param {number} change - изменение курса
 * @returns {string}
 */
export const formatChange = (change) => {
  if (!change && change !== 0) return '-'
  const sign = change > 0 ? '+' : ''
  return `${sign}${change.toFixed(4)}`
}

/**
 * Форматирует изменение в процентах
 * @param {number} change - изменение в процентах
 * @returns {string}
 */
export const formatPercentage = (change) => {
  if (!change && change !== 0) return '-'
  const sign = change > 0 ? '+' : ''
  return `${sign}${change.toFixed(2)}%`
}

/**
 * Форматирует дату
 * @param {string|Date} date - дата
 * @returns {string}
 */
export const formatDate = (date) => {
  if (!date) return '-'
  const d = new Date(date)
  return d.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Форматирует короткую дату
 * @param {string|Date} date - дата
 * @returns {string}
 */
export const formatShortDate = (date) => {
  if (!date) return '-'
  const d = new Date(date)
  return d.toLocaleDateString('ru-RU', {
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Получает текущую дату в формате YYYY-MM-DD
 * @returns {string}
 */
export const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0]
}

/**
 * Получает дату N дней назад
 * @param {number} days - количество дней
 * @returns {string}
 */
export const getDateDaysAgo = (days) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString().split('T')[0]
}

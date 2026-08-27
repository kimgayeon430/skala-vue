import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { CITY_LOCATIONS, fetchCurrentWeather } from '@/services/weatherApi'

export const useWeatherStore = defineStore('weather', () => {
  const weatherList = ref([])
  const isLoading = ref(false)
  const errorMessage = ref('')
  const lastUpdatedAt = ref(null)

  const hasWeatherData = computed(() => weatherList.value.length > 0)

  const fetchWeatherList = async (force = false) => {
    if (hasWeatherData.value && !force) {
      return
    }

    isLoading.value = true
    errorMessage.value = ''

    try {
      weatherList.value = await Promise.all(CITY_LOCATIONS.map(fetchCurrentWeather))
      lastUpdatedAt.value = new Date()
    } catch (error) {
      console.error('OpenWeatherMap 데이터 요청 실패:', error)
      errorMessage.value = '실시간 날씨 데이터를 가져오지 못했습니다.'
    } finally {
      isLoading.value = false
    }
  }

  const findWeatherById = (cityId) => {
    return weatherList.value.find((city) => city.id === cityId) ?? null
  }

  return {
    weatherList,
    isLoading,
    errorMessage,
    lastUpdatedAt,
    hasWeatherData,
    fetchWeatherList,
    findWeatherById,
  }
})

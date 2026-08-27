<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import { useWeatherStore } from '@/stores/weatherStore'
import { getWeatherIconUrl } from '@/services/weatherApi'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()
const weatherStore = useWeatherStore()
const { isLoading, errorMessage } = storeToRefs(weatherStore)

const selectedWeather = computed(() => {
  return weatherStore.findWeatherById(route.params.cityId)
})

const convertTemperature = (temperature) => {
  if (temperature == null) {
    return ''
  }

  if (configStore.unit === 'fahrenheit') {
    return Math.round((temperature * 9) / 5 + 32)
  }

  return temperature
}

const displayTemp = computed(() => {
  return convertTemperature(selectedWeather.value?.temp)
})

const displayFeelsLike = computed(() => {
  return convertTemperature(selectedWeather.value?.feelsLike)
})

const weatherIconUrl = computed(() => {
  const iconCode = selectedWeather.value?.iconCode
  return iconCode ? getWeatherIconUrl(iconCode) : ''
})

onMounted(() => {
  weatherStore.fetchWeatherList()
})
</script>

<template>
  <div class="practice-container">
    <h1>Weather Dashboard</h1>
    <hr />

    <div class="practice-section">
      <h2>📊 지역별 상세 기상 관측 정보</h2>

      <p v-if="isLoading && !selectedWeather" class="loading-message">
        OpenWeatherMap에서 상세 날씨를 불러오는 중입니다.
      </p>

      <p v-else-if="errorMessage" class="missing-city">{{ errorMessage }}</p>

      <div v-else-if="selectedWeather" class="detail-panel">
        <div class="detail-heading">
          <img
            v-if="weatherIconUrl"
            :src="weatherIconUrl"
            :alt="`${selectedWeather.status} 날씨 아이콘`"
          />
          <strong>📍 지정 지역: {{ selectedWeather.name }}</strong>
        </div>
        <p>실시간 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
        <p>체감 온도: {{ displayFeelsLike }}{{ configStore.unitSymbol }}</p>
        <p>기상 현황: {{ selectedWeather.status }}</p>
        <p>대기 습도: {{ selectedWeather.humidity }}%</p>
        <p>현재 풍속: {{ selectedWeather.windSpeed }}m/s</p>
      </div>

      <p v-else class="missing-city">해당 도시의 기상 정보를 찾을 수 없습니다.</p>

      <button @click="router.push('/weather-router')">← 메인 대시보드로 돌아가기</button>
    </div>
  </div>
</template>

<style scoped>
.detail-panel {
  padding: 18px;
  margin-bottom: 14px;
  border-radius: 8px;
  background-color: #f1f3f8;
}

.detail-panel p {
  margin: 5px 0;
}

.detail-heading {
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-heading img {
  width: 64px;
  height: 64px;
}

.loading-message {
  padding: 18px;
  background-color: #f1f5f8;
  text-align: center;
}

.missing-city {
  padding: 18px;
  color: #c0392b;
  background-color: #fff5f5;
}
</style>

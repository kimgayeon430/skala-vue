<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import { useWeatherStore } from '@/stores/weatherStore'

const router = useRouter()
const configStore = useConfigStore()
const weatherStore = useWeatherStore()
const { weatherList, isLoading, errorMessage } = storeToRefs(weatherStore)

const loadFavoriteIds = () => {
  try {
    const savedFavorites = JSON.parse(localStorage.getItem('weatherRouterFavorites') ?? '[]')
    return Array.isArray(savedFavorites) ? savedFavorites : []
  } catch {
    return []
  }
}

// 과제 4 대시보드에서 저장한 즐겨찾기 ID만 활용하는 추가 View입니다.
const favoriteWeatherList = computed(() => {
  const favoriteIds = loadFavoriteIds()
  return weatherList.value
    .filter((city) => favoriteIds.includes(city.id))
    .map((city) => ({
      ...city,
      displayTemp:
        configStore.unit === 'fahrenheit'
          ? Math.round((city.temp * 9) / 5 + 32)
          : city.temp,
    }))
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
      <h2>⭐ 즐겨찾기 지역</h2>

      <p v-if="isLoading && weatherList.length === 0" class="empty-message">
        OpenWeatherMap에서 즐겨찾기 날씨를 불러오는 중입니다.
      </p>

      <p v-else-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <div v-else-if="favoriteWeatherList.length" class="favorite-list">
        <button
          v-for="city in favoriteWeatherList"
          :key="city.id"
          class="favorite-city"
          @click="router.push(`/weather-router/${city.id}`)"
        >
          <strong>{{ city.name }}</strong>
          <span>{{ city.displayTemp }}{{ configStore.unitSymbol }} · {{ city.status }}</span>
        </button>
      </div>

      <p v-else class="empty-message">과제 4에서 즐겨찾기한 도시가 없습니다.</p>

      <button class="home-button" @click="router.push('/weather-router')">
        대시보드 홈으로 이동
      </button>
    </div>
  </div>
</template>

<style scoped>
.favorite-list {
  display: grid;
  gap: 10px;
  margin-bottom: 14px;
}

.favorite-city {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #fffdf2;
}

.empty-message {
  padding: 18px;
  color: #8a6200;
  background-color: #fffdf2;
  text-align: center;
}

.error-message {
  padding: 18px;
  color: #c0392b;
  background-color: #fff2f2;
  text-align: center;
}

.home-button {
  width: 100%;
}
</style>

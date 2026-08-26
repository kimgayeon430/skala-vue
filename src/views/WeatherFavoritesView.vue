<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const weatherList = [
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '제주', temp: 23, status: '바람' },
]

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
  return weatherList.filter((city) => favoriteIds.includes(city.id))
})
</script>

<template>
  <div class="practice-container">
    <h1>Weather Router</h1>
    <hr />

    <div class="practice-section">
      <h2>⭐ 즐겨찾기 지역</h2>

      <div v-if="favoriteWeatherList.length" class="favorite-list">
        <button
          v-for="city in favoriteWeatherList"
          :key="city.id"
          class="favorite-city"
          @click="router.push(`/weather-router/${city.id}`)"
        >
          <strong>{{ city.name }}</strong>
          <span>{{ city.temp }}℃ · {{ city.status }}</span>
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

.home-button {
  width: 100%;
}
</style>

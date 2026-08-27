<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '@/components/weather/BaseDashboardCard.vue'
import SearchBar from '@/components/weather/SearchBar.vue'
import WeatherCard from '@/components/weather/WeatherCard.vue'
import UnitToggler from '@/components/weather/UnitToggler.vue'

const router = useRouter()

// 과제 4의 메인 View가 날씨 데이터와 화면 상태를 관리합니다.
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', displayTemp: 28, unit: '℃' },
  { id: 'city_02', name: '수원', temp: 24, status: '비', displayTemp: 24, unit: '℃' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', displayTemp: 26, unit: '℃' },
  { id: 'city_04', name: '제주', temp: 23, status: '바람', displayTemp: 23, unit: '℃' },
])

const searchQuery = ref('')
const selectedCityInfo = ref(null)

const loadRouterFavorites = () => {
  try {
    const savedFavorites = JSON.parse(localStorage.getItem('weatherRouterFavorites') ?? '[]')
    return Array.isArray(savedFavorites) ? savedFavorites : []
  } catch {
    return []
  }
}

// 과제 3과 별개로 과제 4에서 선택한 즐겨찾기만 관리합니다.
const favoriteCities = ref(loadRouterFavorites())

const filteredWeatherList = computed(() => {
  const keyword = searchQuery.value.trim()

  if (!keyword) {
    return weatherList.value
  }

  return weatherList.value.filter((city) => city.name.includes(keyword))
})

const updateQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const selectCity = (city) => {
  selectedCityInfo.value = city
}

const toggleFavorite = (cityId) => {
  const favoriteIndex = favoriteCities.value.indexOf(cityId)

  if (favoriteIndex === -1) {
    favoriteCities.value.push(cityId)
    return
  }

  favoriteCities.value.splice(favoriteIndex, 1)
}

watch(
  favoriteCities,
  (newFavorites) => {
    localStorage.setItem('weatherRouterFavorites', JSON.stringify(newFavorites))
  },
  { deep: true },
)

// alert 대신 도시 ID를 포함한 동적 상세 경로로 이동합니다.
const moveToDetail = (city) => {
  router.push(`/weather-router/${city.id}`)
}
</script>

<template>
  <div class="practice-container">
    <h1>Weather Dashboard</h1>
    <hr />

    <div class="practice-section">
      <h2>🌤️ 과제 5: 스토어 적용</h2>

      <div class="navigation-row">
        <nav class="weather-nav" aria-label="날씨 서비스 메뉴">
          <RouterLink to="/weather-router">🌦️ 날씨 대시보드</RouterLink>
          <RouterLink to="/weather-router/about">ℹ️ 서비스 소개</RouterLink>
          <RouterLink to="/weather-router/favorites">⭐ 즐겨찾기 지역</RouterLink>
        </nav>

        <UnitToggler />
      </div>

      <BaseDashboardCard title="🔍 도시 검색">
        <SearchBar :search-query="searchQuery" @update-query="updateQuery" />
      </BaseDashboardCard>

      <BaseDashboardCard title="🌆 지역별 날씨 현황">
        <WeatherCard
          v-for="city in filteredWeatherList"
          :key="city.id"
          :city="city"
          :is-favorite="favoriteCities.includes(city.id)"
          @select-card="selectCity"
          @click-detail="moveToDetail"
          @toggle-favorite="toggleFavorite"
        />

        <p v-if="filteredWeatherList.length === 0">
          검색 결과와 일치하는 도시가 없습니다.
        </p>
      </BaseDashboardCard>

      <p class="selected-message">
        <template v-if="selectedCityInfo">
          {{ selectedCityInfo.name }}이 선택되었습니다.
        </template>
        <template v-else>카드를 클릭하거나 검색해 보세요.</template>
      </p>
    </div>
  </div>
</template>

<style scoped>
.navigation-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  padding: 14px;
  margin-bottom: 14px;
  border-radius: 8px;
  background-color: #f8fafc;
}

.weather-nav {
  display: flex;
  flex: 1;
  justify-content: center;
  gap: 18px;
}

.weather-nav a {
  color: #52616b;
  font-weight: 700;
  text-decoration: none;
}

.weather-nav a.router-link-exact-active {
  color: #3498db;
  border-bottom: 2px solid #3498db;
}

.selected-message {
  padding: 12px;
  margin-bottom: 0;
  border-radius: 6px;
  background-color: #e7f6ea;
  color: #26863b;
  text-align: center;
}
</style>

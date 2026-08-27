<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '@/components/weather/BaseDashboardCard.vue'
import SearchBar from '@/components/weather/SearchBar.vue'
import WeatherCard from '@/components/weather/WeatherCard.vue'
import UnitToggler from '@/components/weather/UnitToggler.vue'
import { useWeatherStore } from '@/stores/weatherStore'

const router = useRouter()
const weatherStore = useWeatherStore()
const { weatherList, isLoading, errorMessage, lastUpdatedAt } = storeToRefs(weatherStore)

const searchQuery = ref('')
const selectedCityInfo = ref(null)

const formattedUpdatedAt = computed(() => {
  return lastUpdatedAt.value?.toLocaleTimeString('ko-KR') ?? ''
})

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

onMounted(() => {
  weatherStore.fetchWeatherList()
})
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
        <div class="api-status">
          <span>
            {{ formattedUpdatedAt ? `OpenWeatherMap 갱신: ${formattedUpdatedAt}` : '실시간 데이터 준비 중' }}
          </span>
          <button :disabled="isLoading" @click="weatherStore.fetchWeatherList(true)">
            {{ isLoading ? '불러오는 중...' : '날씨 새로고침' }}
          </button>
        </div>

        <p v-if="errorMessage" class="data-message error-message">
          {{ errorMessage }}
        </p>
        <p v-else-if="isLoading && weatherList.length === 0" class="data-message">
          OpenWeatherMap에서 날씨를 불러오는 중입니다.
        </p>

        <template v-else>
          <WeatherCard
            v-for="city in filteredWeatherList"
            :key="city.id"
            :city="city"
            :is-favorite="favoriteCities.includes(city.id)"
            @select-card="selectCity"
            @click-detail="moveToDetail"
            @toggle-favorite="toggleFavorite"
          />
        </template>

        <p v-if="!isLoading && !errorMessage && filteredWeatherList.length === 0">
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

.api-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  color: #66727c;
  font-size: 13px;
}

.data-message {
  padding: 16px;
  border-radius: 6px;
  background-color: #f1f5f8;
  text-align: center;
}

.error-message {
  background-color: #fff2f2;
  color: #c0392b;
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

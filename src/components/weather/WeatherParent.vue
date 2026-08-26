<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import WeatherSummary from './WeatherSummary.vue'

// 과제 요구사항에 따라 모든 반응형 데이터는 부모가 관리합니다.
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '제주', temp: 23, status: '바람' },
])

const loadFavoriteCities = () => {
  try {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCities') ?? '[]')
    return Array.isArray(savedFavorites) ? savedFavorites : []
  } catch {
    return []
  }
}

const searchQuery = ref('')
const selectedCityInfo = ref(null)
const temperatureUnit = ref('celsius')
const favoriteCities = ref(loadFavoriteCities())

// 과제 2의 도시 검색 기능을 그대로 유지합니다.
const filteredWeatherList = computed(() => {
  const keyword = searchQuery.value.trim()

  if (!keyword) {
    return weatherList.value
  }

  return weatherList.value.filter((city) => city.name.includes(keyword))
})

// 원본 섭씨 온도는 유지하고 선택한 단위에 맞는 표시용 데이터를 만듭니다.
const displayedWeatherList = computed(() => {
  return filteredWeatherList.value.map((city) => {
    if (temperatureUnit.value === 'fahrenheit') {
      return {
        ...city,
        displayTemp: Math.round(((city.temp * 9) / 5 + 32) * 10) / 10,
        unit: '℉',
      }
    }

    return {
      ...city,
      displayTemp: city.temp,
      unit: '℃',
    }
  })
})

const favoriteWeatherList = computed(() => {
  return weatherList.value.filter((city) => favoriteCities.value.includes(city.id))
})

const favoriteAvgTemp = computed(() => {
  if (favoriteWeatherList.value.length === 0) {
    return 0
  }

  const totalTemp = favoriteWeatherList.value.reduce((sum, city) => sum + city.temp, 0)
  return Math.round((totalTemp / favoriteWeatherList.value.length) * 10) / 10
})

watchEffect(() => {
  const keyword = searchQuery.value.trim() || '전체'
  const matchedCities = filteredWeatherList.value.map((city) => city.name)

  console.log(
    `[watchEffect 자동 호출] 현재 검색어: ${keyword} / 매칭된 API 데이터: ${matchedCities.join(', ') || '없음'}`,
  )
})

const selectCity = (city) => {
  selectedCityInfo.value = city
}

const handleSearch = (newQuery) => {
  searchQuery.value = newQuery
}

const showDetail = (city) => {
  window.alert(`${city.name}의 현재 날씨는 [${city.status}] 상태입니다.`)
}

watch(selectedCityInfo, (newCity, oldCity) => {
  const oldCityName = oldCity?.name ?? '선택 없음'
  const newCityName = newCity?.name ?? '선택 없음'

  console.log(`[watch 감지] ${oldCityName}에서 ${newCityName}(으)로 선택이 변경되었습니다.`)
})

watch(temperatureUnit, (newUnit, oldUnit) => {
  const unitNames = {
    celsius: '섭씨',
    fahrenheit: '화씨',
  }

  console.log(`[온도 단위 변경] ${unitNames[oldUnit]}에서 ${unitNames[newUnit]}(으)로 변경`)
})

watch(
  favoriteCities,
  (newFavorites) => {
    localStorage.setItem('favoriteCities', JSON.stringify(newFavorites))

    const favoriteNames = favoriteWeatherList.value.map((city) => city.name)
    console.log(
      `[즐겨찾기 변경 및 저장] 현재 즐겨찾기: ${favoriteNames.join(', ') || '없음'} / 저장된 ID: ${newFavorites.join(', ') || '없음'}`,
    )
  },
  { deep: true },
)

const toggleFavorite = (cityId) => {
  const favoriteIndex = favoriteCities.value.indexOf(cityId)

  if (favoriteIndex === -1) {
    favoriteCities.value.push(cityId)
    return
  }

  favoriteCities.value.splice(favoriteIndex, 1)
}
</script>

<template>
  <div class="practice-section">
    <h2>🌤️ 과제 3: 날씨 (Component)</h2>

    <!-- 공통 박스 안에 SearchBar를 Slot으로 주입합니다. -->
    <BaseDashboardCard title="🔍 도시 검색">
      <SearchBar :search-query="searchQuery" @update-query="handleSearch" />

      <div class="unit-controls">
        <span>온도 단위:</span>
        <button
          :class="{ active: temperatureUnit === 'celsius' }"
          @click="temperatureUnit = 'celsius'"
        >
          섭씨(℃)
        </button>
        <button
          :class="{ active: temperatureUnit === 'fahrenheit' }"
          @click="temperatureUnit = 'fahrenheit'"
        >
          화씨(℉)
        </button>
      </div>
    </BaseDashboardCard>

    <!-- 공통 박스 안에 WeatherCard 목록을 Slot으로 주입합니다. -->
    <BaseDashboardCard title="🌆 지역별 날씨 현황">
      <WeatherCard
        v-for="city in displayedWeatherList"
        :key="city.id"
        :city="city"
        :is-favorite="favoriteCities.includes(city.id)"
        @select-card="selectCity"
        @click-detail="showDetail"
        @toggle-favorite="toggleFavorite"
      />

      <p v-if="filteredWeatherList.length === 0">
        검색 결과와 일치하는 도시가 없습니다.
      </p>
    </BaseDashboardCard>

    <!-- 과제 조건 7번을 위해 요약 영역을 추가 컴포넌트로 분리했습니다. -->
    <BaseDashboardCard title="⭐ 즐겨찾기 요약">
      <WeatherSummary
        :favorite-weather-list="favoriteWeatherList"
        :favorite-avg-temp="favoriteAvgTemp"
        :selected-city-info="selectedCityInfo"
      />
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.unit-controls {
  display: flex;
  align-items: center;
  margin-top: 12px;
}

.unit-controls button {
  padding: 6px 10px;
  margin-left: 8px;
  border: 1px solid #adb5bd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}

.unit-controls button.active {
  border-color: #42b883;
  background-color: #42b883;
  color: white;
}
</style>

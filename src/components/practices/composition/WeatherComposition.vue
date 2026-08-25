<script setup>
import { computed, ref, watch, watchEffect } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  // 과제 요구사항에 맞춰 직접 추가한 날씨 데이터
  { id: 'city_04', name: '제주', temp: 23, status: '바람' },
])

// 검색창에 입력한 도시 이름을 저장하는 반응형 상태
const searchQuery = ref('')

// 사용자가 클릭한 도시의 전체 정보를 저장 (아직 선택하지 않았으므로 null)
const selectedCityInfo = ref(null)

// 5번 추가 기능: 사용자가 선택한 온도 단위
const temperatureUnit = ref('celsius')

// 3. computed 검색 기능
// searchQuery 또는 weatherList가 바뀌면 조건에 맞는 도시 목록을 다시 계산함
// 아무것도 입력하지 않았을 때는 전체 날씨 목록을 반환함
const filteredWeatherList = computed(() => {
  const keyword = searchQuery.value.trim()

  if (!keyword) {
    return weatherList.value
  }

  return weatherList.value.filter((city) => city.name.includes(keyword))
})

// 검색된 도시 목록에 현재 온도 단위에 맞는 표시용 온도와 기호를 추가함
// 원본 temp는 더움/선선함 판단을 위해 그대로 유지함
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

// 5. watchEffect 검색어 자동 감시
// 콜백 안에서 읽은 searchQuery와 filteredWeatherList를 의존성으로 자동 추적함
// watch와 달리 감시 대상을 첫 번째 인자로 직접 지정하지 않으며 처음에도 즉시 한 번 실행됨
watchEffect(() => {
  const keyword = searchQuery.value.trim() || '전체'
  const matchedCities = filteredWeatherList.value.map((city) => city.name)

  console.log(
    `[watchEffect 자동 호출] 현재 검색어: ${keyword} / 매칭된 API 데이터: ${matchedCities.join(', ') || '없음'}`,
  )
})

// 날씨 카드를 클릭하면 도시 이름만이 아니라 도시 객체 전체를 저장
const selectCity = (city) => {
  selectedCityInfo.value = city
}

// 4. watch 선택 도시 감시
// selectedCityInfo가 다른 도시 객체로 변경될 때마다 콜백이 실행됨
watch(selectedCityInfo, (newCity, oldCity) => {
  const oldCityName = oldCity?.name ?? '선택 없음'
  const newCityName = newCity?.name ?? '선택 없음'

  console.log(`[watch 감지] ${oldCityName}에서 ${newCityName}(으)로 선택이 변경되었습니다.`)
})

// 온도 단위가 실제로 변경될 때마다 이전 단위와 새 단위를 콘솔에 기록함
watch(temperatureUnit, (newUnit, oldUnit) => {
  const unitNames = {
    celsius: '섭씨',
    fahrenheit: '화씨',
  }

  console.log(`[온도 단위 변경] ${unitNames[oldUnit]}에서 ${unitNames[newUnit]}(으)로 변경`)
})

// 한글 조합 중에도 입력값을 바로 반영
const handleSearch = (event) => {
  searchQuery.value = event.target.value
}

// 상세보기 버튼을 누르면 해당 도시의 날씨를 알림으로 표시
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="practice-section">
    <h2>🌤️ 과제 2: 날씨 (Composition)</h2>

    <!-- 검색 영역 -->
    <section class="weather-box">
      <h3>🔍 도시 검색</h3>
      <input
        class="search-input"
        type="text"
        :value="searchQuery"
        @input="handleSearch"
        placeholder="검색할 도시 이름 입력"
      />
      <p>검색 중인 도시: {{ searchQuery }}</p>

      <!-- 직접 추가한 반응형 상태: 선택한 단위에 따라 computed 온도가 변경됨 -->
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
    </section>

    <!-- 날씨 목록 영역 -->
    <section class="weather-box">
      <h3>🌆 지역별 날씨 현황</h3>

      <div
        v-for="city in displayedWeatherList"
        :key="city.id"
        class="weather-card"
        @click="selectCity(city)"
      >
        <div>
          <strong>{{ city.name }} ({{ city.status }})</strong>
          <p>현재 기온: {{ city.displayTemp }}{{ city.unit }}</p>

          <span v-if="city.temp >= 25" class="temperature-label hot">
            🔥 더움 (25도 이상)
          </span>
          <span v-else class="temperature-label cool">❄️ 선선함 (25도 미만)</span>
        </div>

        <button @click.stop="showDetail(city.name, city.status)">상세보기</button>
      </div>

      <!-- 검색어와 일치하는 도시가 없을 때 안내 문구 표시 -->
      <p v-if="filteredWeatherList.length === 0">검색 결과와 일치하는 도시가 없습니다.</p>
    </section>

    <!-- 선택한 도시가 있으면 도시 이름을, 없으면 안내 문구를 표시 -->
    <p class="selected-message">
      <template v-if="selectedCityInfo">{{ selectedCityInfo.name }}이 선택되었습니다.</template>
      <template v-else>카드를 클릭하거나 검색해 보세요.</template>
    </p>
  </div>
</template>

<style scoped>
.weather-box {
  padding: 16px;
  margin-bottom: 14px;
  border: 1px solid #dfe5eb;
  border-radius: 8px;
  background-color: #f8fafc;
}

.weather-box h3 {
  margin-top: 0;
}

.search-input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border: 1px solid #bcc6d0;
  border-radius: 5px;
}

.unit-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}

.unit-controls button {
  padding: 6px 10px;
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

.weather-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  margin-bottom: 10px;
  border: 1px solid #dfe5eb;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
}

.weather-card:last-child {
  margin-bottom: 0;
}

.weather-card:hover {
  background-color: #f0f7ff;
}

.weather-card p {
  margin: 6px 0;
}

.temperature-label {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  font-size: 13px;
}

.hot {
  background-color: #ff6b6b;
}

.cool {
  background-color: #4dabf7;
}

.weather-card button {
  padding: 7px 12px;
  border: 1px solid #adb5bd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
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

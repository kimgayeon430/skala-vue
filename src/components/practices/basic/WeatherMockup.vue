<script setup>
import { ref } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  // 과제 요구사항에 맞춰 직접 추가한 날씨 데이터
  { id: 'city_04', name: '제주', temp: 23, status: '바람' },
])

// 검색창에 입력한 도시 이름을 저장
const searchCity = ref('')

// 사용자가 클릭한 도시 이름을 저장
const selectedCity = ref('')

// 날씨 카드를 클릭하면 해당 도시 이름을 저장
const selectCity = (cityName) => { selectedCity.value = cityName }

// 한글 조합 중에도 입력값을 바로 반영
const handleSearch = (event) => { searchCity.value = event.target.value }

// 상세보기 버튼을 누르면 해당 도시의 날씨를 알림으로 표시
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="practice-section">
    <h2>🌤️ 과제 1: 날씨 (Mockup)</h2>

    <!-- 검색 영역 -->
    <section class="weather-box">
      <h3>🔍 도시 검색</h3>
      <input
        class="search-input"
        type="text"
        :value="searchCity"
        @input="handleSearch"
        placeholder="검색할 도시 이름 입력"
      />
      <p>검색 중인 도시: {{ searchCity }}</p>
    </section>

    <!-- 날씨 목록 영역 -->
    <section class="weather-box">
      <h3>🌆 지역별 날씨 현황</h3>

      <div
        v-for="city in weatherList"
        :key="city.id"
        class="weather-card"
        @click="selectCity(city.name)"
      >
        <div>
          <strong>{{ city.name }} ({{ city.status }})</strong>
          <p>현재 기온: {{ city.temp }}℃</p>

          <span v-if="city.temp >= 25" class="temperature-label hot">
            🔥 더움 (25도 이상)
          </span>
          <span v-else class="temperature-label cool">❄️ 선선함 (25도 미만)</span>
        </div>

        <button @click.stop="showDetail(city.name, city.status)">상세보기</button>
      </div>
    </section>

    <!-- 선택한 도시가 있으면 도시 이름을, 없으면 안내 문구를 표시 -->
    <p class="selected-message">
      <template v-if="selectedCity">{{ selectedCity }}이 선택되었습니다.</template>
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

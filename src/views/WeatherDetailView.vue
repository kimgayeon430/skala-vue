<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const selectedWeather = ref(null)

// 실제 API 대신 도시 코드별 상세 Mock Data를 사용합니다.
const weatherDetails = [
  {
    id: 'city_01',
    name: '대한민국 서울특별시',
    temp: 28,
    status: '맑음',
    humidity: 55,
    windSpeed: 2.5,
  },
  {
    id: 'city_02',
    name: '대한민국 경기도 수원시',
    temp: 24,
    status: '비',
    humidity: 78,
    windSpeed: 3.8,
  },
  {
    id: 'city_03',
    name: '대한민국 부산광역시',
    temp: 26,
    status: '구름',
    humidity: 64,
    windSpeed: 4.1,
  },
  {
    id: 'city_04',
    name: '대한민국 제주특별자치도',
    temp: 23,
    status: '바람',
    humidity: 61,
    windSpeed: 6.2,
  },
]

// Mount 시점에 동적 경로의 cityId로 해당 도시 객체를 선택합니다.
onMounted(() => {
  selectedWeather.value = weatherDetails.find((city) => city.id === route.params.cityId) ?? null
})
</script>

<template>
  <div class="practice-container">
    <h1>Weather Router</h1>
    <hr />

    <div class="practice-section">
      <h2>📊 지역별 상세 기상 관측 정보</h2>

      <div v-if="selectedWeather" class="detail-panel">
        <p>📍 지정 지역: {{ selectedWeather.name }}</p>
        <p>실시간 기온: {{ selectedWeather.temp }}℃</p>
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

.missing-city {
  padding: 18px;
  color: #c0392b;
  background-color: #fff5f5;
}
</style>

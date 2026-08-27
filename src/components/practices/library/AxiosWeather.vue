
<script setup>
import { ref } from 'vue'
import axios from 'axios'

const weatherData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const handleFetchWeather = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          lat: 35.158582,
          lon: 126.804975,
          appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
          units: 'metric',
          lang: 'kr',
        },
      },
    )

    weatherData.value = response.data
  } catch (error) {
    console.error('날씨 데이터 요청 실패:', error)
    errorMessage.value = '날씨 데이터를 가져오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <!-- 날씨 API 요청 코드를 작성할 실습 영역 -->
  <section class="practice-section">
    <h2>⚡ Axios 통신 검증</h2>

    <button class="fetch-button" :disabled="isLoading" @click="handleFetchWeather">
      {{ isLoading ? '데이터 로딩 중...' : '실시간 날씨 데이터 가져오기' }}
    </button>

    <p v-if="errorMessage" class="status-message error-message">{{ errorMessage }}</p>

    <div v-else-if="weatherData" class="weather-result">
      <p>📍 위치: {{ weatherData.name }}</p>
      <p>🌡️ 현재 기온: {{ weatherData.main.temp }}℃</p>
      <p>🌤️ 날씨 상태: {{ weatherData.weather[0].description }}</p>
      <p>💧 습도: {{ weatherData.main.humidity }}%</p>
    </div>

    <p v-else class="status-message">아직 가져온 데이터가 없습니다.</p>
  </section>
</template>

<style scoped>
.practice-section {
  padding: 18px 22px 22px;
  margin: 12px 0 20px;
  border: 1px solid #e4e9e7;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 8px rgb(44 62 80 / 4%);
}

.fetch-button {
  color: white;
  background-color: #3498db;
  border-color: #3498db;
}

.weather-result {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  padding: 16px;
  margin-top: 14px;
  border: 1px solid #dce8f1;
  border-radius: 8px;
  background-color: #f5faff;
}

.weather-result p {
  margin: 0;
}

.status-message {
  padding: 12px;
  margin: 14px 0 0;
  border-radius: 7px;
  background-color: #f5f7f8;
  color: #66727c;
}

.error-message {
  background-color: #fff2f2;
  color: #c0392b;
}

@media (max-width: 600px) {
  .weather-result {
    grid-template-columns: 1fr;
  }
}
</style>

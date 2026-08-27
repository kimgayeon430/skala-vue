<script setup>
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'

const router = useRouter()
const configStore = useConfigStore()
</script>

<template>
  <div class="practice-container">
    <h1>날씨 종합 대시보드</h1>
    <hr />

    <div class="practice-section">
      <h2>ℹ️ 서비스 소개</h2>

      <div class="intro-panel">
        <strong>Vue.js 날씨 종합실습</strong>
        <p>
          Vue.js 수업에서 배운 컴포넌트, Router, Pinia, Axios를 하나의 날씨
          대시보드에 적용했습니다.
        </p>
      </div>

      <div class="about-grid">
        <section class="about-card">
          <h3>🛠️ 사용 기술</h3>
          <p>Vue 3 · Vue Router · Pinia · Axios · Element Plus</p>
        </section>

        <section class="about-card">
          <h3>🌦️ 주요 기능</h3>
          <ul>
            <li>7개 도시의 실시간 날씨와 대기질 조회</li>
            <li>도시 검색, 즐겨찾기, 상세 페이지</li>
            <li>온도 단위와 상태 라벨 설정</li>
            <li>Color Picker를 이용한 버튼 색상 변경</li>
          </ul>
        </section>

        <section class="about-card highlight-card">
          <h3>✨ 차별화 포인트</h3>
          <ul>
            <li>자주 확인하는 도시를 저장하는 즐겨찾기</li>
            <li>Element Plus로 대시보드 버튼 색상 변경</li>
            <li>최신 데이터를 다시 요청하는 날씨 새로고침</li>
            <li>온도와 대기질 상태 라벨 숨기기 및 보이기</li>
            <li>AQI, PM10, PM2.5 대기질 정보 추가</li>
          </ul>
        </section>

        <section class="about-card">
          <h3>🔗 데이터 출처</h3>
          <p>날씨: OpenWeatherMap</p>
          <p>대기질: Open-Meteo / CAMS</p>
        </section>
      </div>

      <button
        class="home-button"
        :style="configStore.buttonStyle"
        @click="router.push('/weather-router')"
      >
        대시보드 홈으로 이동
      </button>
    </div>
  </div>
</template>

<style scoped>
.intro-panel {
  padding: 18px;
  margin-bottom: 14px;
  border-left: 4px solid #42b883;
  border-radius: 8px;
  background-color: #f8fafc;
}

.intro-panel p {
  margin: 8px 0 0;
  color: #52616b;
}

.about-grid {
  display: grid;
  gap: 12px;
  margin-bottom: 14px;
}

.about-card {
  padding: 16px;
  border: 1px solid #dfe5eb;
  border-radius: 8px;
  background-color: white;
}

.about-card h3 {
  margin: 0 0 10px;
}

.about-card p {
  margin: 6px 0;
}

.about-card ul {
  margin: 0;
  padding-left: 20px;
}

.about-card li {
  margin: 5px 0;
}

.highlight-card {
  border-color: #a9dfc4;
  background-color: #f3fbf7;
}

.home-button {
  width: 100%;
  color: white;
  background-color: #3498db;
}
</style>

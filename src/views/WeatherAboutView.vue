<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="practice-container">
    <h1>날씨 종합 대시보드</h1>
    <hr />

    <div class="practice-section">
      <h2>ℹ️ 서비스 소개</h2>

      <div class="about-panel">
        <p>Vue.js 수업에서 배운 내용을 모아 만든 최종 날씨 대시보드입니다.</p>
        <ul>
          <li>Vue Router를 이용한 화면 이동과 도시 상세 페이지</li>
          <li>Pinia를 이용한 날씨 데이터와 화면 설정 관리</li>
          <li>Axios를 이용한 실제 날씨 및 대기질 데이터 조회</li>
        </ul>
      </div>

      <button class="home-button" @click="router.push('/weather-router')">
        대시보드 홈으로 이동
      </button>
    </div>
  </div>
</template>

<style scoped>
.about-panel {
  padding: 18px;
  margin-bottom: 14px;
  border-radius: 8px;
  background-color: #f8fafc;
}

.home-button {
  width: 100%;
  color: white;
  background-color: #3498db;
}
</style>

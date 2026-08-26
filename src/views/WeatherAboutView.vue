<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="practice-container">
    <h1>Weather Router</h1>
    <hr />

    <div class="practice-section">
      <h2>ℹ️ 서비스 소개</h2>

      <div class="about-panel">
        <p>Vue 3와 Vue Router로 제작한 실습용 기상 관측 대시보드입니다.</p>
        <ul>
          <li>컴포넌트로 분리한 검색창과 날씨 카드 활용</li>
          <li>상세보기 버튼을 통한 동적 경로 이동</li>
          <li>URL의 도시 ID를 이용한 상세 기상 정보 표시</li>
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

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="not-found-page">
    <div class="not-found-card">
      <div class="icon">☀️❓</div>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>요청하신 주소가 존재하지 않거나 아직 개발되지 않았습니다.</p>
      <button @click="router.push('/weather-router')">날씨 메인으로 이동</button>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  display: grid;
  min-height: calc(100vh - 80px);
  place-items: center;
  padding: 24px;
  background-color: #f8fafc;
}

.not-found-card {
  max-width: 480px;
  padding: 48px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 8px 24px rgb(15 23 42 / 10%);
  text-align: center;
}

.icon {
  font-size: 64px;
}

.not-found-card h1 {
  margin: 20px 0 10px;
}

.not-found-card p {
  margin-bottom: 24px;
  color: #64748b;
}

.not-found-card button {
  color: white;
  background-color: #1687f8;
}
</style>

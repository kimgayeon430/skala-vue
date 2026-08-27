<script setup>
// ESLint의 멀티워드 컴포넌트 이름 규칙을 만족하는 명시적 이름
defineOptions({ name: 'PracticeThree' })

// 각 주제의 실습 코드를 독립된 컴포넌트로 분리하여 불러옴
import StoreCounter from '@/components/practices/library/StoreCounter.vue'
import AxiosWeather from '@/components/practices/library/AxiosWeather.vue'
import AxiosJson from '@/components/practices/library/AxiosJson.vue'
import ElementPlus from '@/components/practices/library/ElementPlus.vue'
import EcmaScript from '@/components/practices/library/EcmaScript.vue'
</script>

<template>
  <div class="practice-container">
    <!-- Pinia를 이용한 전역 상태 관리 실습 -->
    <h1>1. Store</h1>
    <hr />
    <StoreCounter />

    <!-- Axios를 이용한 외부 API 및 JSON 요청 실습 -->
    <h1>2. Axios</h1>
    <hr />
    <AxiosWeather />
    <AxiosJson />

    <!-- Element Plus UI 컴포넌트 사용 실습 -->
    <h1>3. Element Plus</h1>
    <hr />
    <ElementPlus />

    <!-- 최신 JavaScript 문법 실습 -->
    <h1>4. Modern JavaScript</h1>
    <hr />
    <EcmaScript />
  </div>
</template>

<style>
/* ⚠️ 외부 스타일 파일(예: 버튼 디자인 뭉치)을 이 방 안으로 쏙 가리켜 가져옵니다 */
@import '@/assets/practice.css';
</style>

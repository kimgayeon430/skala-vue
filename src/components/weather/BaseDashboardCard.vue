<script setup>
// 검색 영역과 날씨 목록 영역에서 공통으로 사용할 제목입니다.
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="weather-box">
    <h3>{{ title }}</h3>

    <!-- 실제 검색창이나 날씨 목록은 부모가 이 위치에 주입합니다. -->
    <slot></slot>
  </section>
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
</style>

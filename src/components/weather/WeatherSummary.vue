<script setup>
// 부모가 계산한 즐겨찾기 결과와 현재 선택 도시를 표시만 합니다.
defineProps({
  favoriteWeatherList: {
    type: Array,
    required: true,
  },
  favoriteAvgTemp: {
    type: Number,
    required: true,
  },
  selectedCityInfo: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <div class="favorite-summary">
    <template v-if="favoriteWeatherList.length">
      <p>도시: {{ favoriteWeatherList.map((city) => city.name).join(', ') }}</p>
      <p>평균 기온(섭씨): {{ favoriteAvgTemp }}℃</p>
    </template>
    <p v-else>즐겨찾기한 도시가 없습니다.</p>
  </div>

  <p class="selected-message">
    <template v-if="selectedCityInfo">
      {{ selectedCityInfo.name }}이 선택되었습니다.
    </template>
    <template v-else>카드를 클릭하거나 검색해 보세요.</template>
  </p>
</template>

<style scoped>
.favorite-summary {
  padding: 10px;
  border-radius: 6px;
  background-color: #fffdf2;
}

.favorite-summary p:last-child {
  margin-bottom: 0;
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

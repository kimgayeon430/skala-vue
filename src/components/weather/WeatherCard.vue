<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { getWeatherIconUrl } from '@/services/weatherApi'

// 부모가 반복 중인 도시 객체 하나와 즐겨찾기 여부를 Props로 전달받습니다.
const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  showFavorite: {
    type: Boolean,
    default: true,
  },
})

// 상태 변경은 부모가 담당하므로 자식은 필요한 이벤트와 payload만 보냅니다.
const emit = defineEmits(['select-card', 'click-detail', 'toggle-favorite'])

const selectCard = () => {
  emit('select-card', props.city)
}

const clickDetail = () => {
  emit('click-detail', props.city)
}

const toggleFavorite = () => {
  emit('toggle-favorite', props.city.id)
}

const configStore = useConfigStore()
const displayTemp = computed(() => {
  const rawTemp = props.city.temp

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }

  return rawTemp
})

const weatherIconUrl = computed(() => {
  return props.city.iconCode ? getWeatherIconUrl(props.city.iconCode) : ''
})

const airQualityClass = computed(() => {
  if (props.city.aqi <= 50) return 'air-good'
  if (props.city.aqi <= 100) return 'air-normal'
  if (props.city.aqi <= 150) return 'air-caution'
  if (props.city.aqi <= 200) return 'air-bad'
  return 'air-very-bad'
})
</script>

<template>
  <div class="weather-card" @click="selectCard">
    <div class="weather-content">
      <img
        v-if="weatherIconUrl"
        class="weather-icon"
        :src="weatherIconUrl"
        :alt="`${city.status} 날씨 아이콘`"
      />

      <div>
        <strong>{{ city.name }} ({{ city.status }})</strong>
        <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

        <!-- Store의 전역 설정에 따라 모든 카드의 상태 라벨을 함께 표시하거나 숨깁니다. -->
        <template v-if="configStore.showTemperatureLabel">
          <span class="air-quality" :class="airQualityClass">
            대기질 {{ city.airQualityStatus }}
          </span>
          <span v-if="city.temp >= 25" class="temperature-label hot">
            🔥 더움 (25도 이상)
          </span>
          <span v-else class="temperature-label cool">❄️ 선선함 (25도 미만)</span>
        </template>
      </div>
    </div>

    <div class="card-actions">
      <!-- .stop으로 버튼 클릭 시 카드 선택 이벤트가 함께 실행되지 않게 합니다. -->
      <button
        v-if="showFavorite"
        class="favorite-button"
        :class="{ active: isFavorite }"
        :style="configStore.buttonStyle"
        @click.stop="toggleFavorite"
      >
        {{ isFavorite ? '★ 즐겨찾기 해제' : '☆ 즐겨찾기' }}
      </button>
      <button :style="configStore.buttonStyle" @click.stop="clickDetail">상세보기</button>
    </div>
  </div>
</template>

<style scoped>
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

.weather-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.weather-icon {
  width: 56px;
  height: 56px;
}

.weather-card p {
  margin: 6px 0;
}

.air-quality {
  display: inline-block;
  padding: 4px 8px;
  margin-right: 6px;
  border-radius: 4px;
  color: white;
  font-size: 13px;
}

.air-good {
  background-color: #3498db;
}

.air-normal {
  background-color: #2eae67;
}

.air-caution {
  background-color: #f39c12;
}

.air-bad {
  background-color: #e74c3c;
}

.air-very-bad {
  background-color: #8e44ad;
}

.card-actions {
  display: flex;
  gap: 8px;
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

.weather-card .favorite-button.active {
  border-color: #f5b301;
  background-color: #fff8db;
  color: #8a6200;
}
</style>

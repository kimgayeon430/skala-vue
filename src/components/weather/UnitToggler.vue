<script setup>
import { useConfigStore } from '@/stores/configStore'

// configStore를 통해 현재 단위를 표시하고 단위 변경 action을 실행합니다.
const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span>날씨 단위: {{ configStore.unitSymbol }}</span>
    <button @click="configStore.toggleUnit">단위 변경</button>
    <button @click="configStore.toggleTemperatureLabel">
      {{ configStore.temperatureLabelButtonText }}
    </button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>

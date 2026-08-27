<script setup>
import { useConfigStore } from '@/stores/configStore'

// configStore를 통해 현재 단위를 표시하고 단위 변경 action을 실행합니다.
const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <div class="setting-group">
      <span class="setting-label">🌡️ 날씨 단위</span>
      <strong class="setting-value">{{ configStore.unitSymbol }}</strong>
      <button :style="configStore.buttonStyle" @click="configStore.toggleUnit">
        단위 변경
      </button>
    </div>

    <div class="setting-group">
      <span class="setting-label">🎨 버튼 색상</span>
      <el-color-picker
        :model-value="configStore.buttonColor"
        size="small"
        @active-change="configStore.setButtonColor"
        @change="configStore.setButtonColor"
      />
    </div>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.setting-group {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border: 1px solid #dfe5eb;
  border-radius: 7px;
  background-color: white;
}

.setting-label {
  color: #52616b;
  font-size: 13px;
  font-weight: 700;
}

.setting-value {
  min-width: 22px;
  color: #3498db;
  font-size: 16px;
  text-align: center;
}
</style>

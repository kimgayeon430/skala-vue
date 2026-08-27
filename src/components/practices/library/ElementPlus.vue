<script setup>
import { ref } from 'vue'

// Color Picker에서 선택한 색상을 저장함
const selectedColor = ref('#42b883')
</script>

<template>
  <!-- Element Plus UI 컴포넌트를 작성할 실습 영역 -->
  <section class="practice-section">
    <h2>Element Plus 색상 선택 실습</h2>

    <div class="color-picker-area">
      <span>색상 선택:</span>
      <!-- v-model로 선택한 색상과 selectedColor를 연결함 -->
      <el-color-picker v-model="selectedColor" />
      <span>{{ selectedColor }}</span>
    </div>

    <!-- 선택한 색상을 style 바인딩으로 적용함 -->
    <div class="color-preview" :style="{ backgroundColor: selectedColor }">
      선택한 색상 미리보기
    </div>
  </section>
</template>

<style scoped>
.practice-section {
  padding: 18px 22px 22px;
  margin: 12px 0 20px;
  border: 1px solid #e4e9e7;
  border-radius: 10px;
  background-color: white;
}

.color-picker-area {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.color-preview {
  padding: 18px;
  border-radius: 6px;
  color: white;
  text-align: center;
}
</style>

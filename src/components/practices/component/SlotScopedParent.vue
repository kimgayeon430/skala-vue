<script setup>
import SlotScopedChild from './SlotScopedChild.vue'
</script>

<template>
  <div class="practice-section">
    <h2>Scoped Slot 주입 실습</h2>
    <h3>상위 컴포넌트 (Parent)</h3>

    <!--
      v-slot="slotBag"으로 자식 <slot>이 전달한 모든 slot props를 객체로 받습니다.
      자식의 :text와 :count는 각각 slotBag.text와 slotBag.count로 접근합니다.
    -->
    <SlotScopedChild v-slot="slotBag">
      <div class="display-panel">
        <p>알림 메시지: {{ slotBag.text }}</p>
        <p>접속자 수: {{ slotBag.count }}명</p>
      </div>
    </SlotScopedChild>

    <!-- 슬롯 내용을 제공하지 않아 자식에 정의된 fallback 화면이 표시됩니다. -->
    <SlotScopedChild> </SlotScopedChild>
  </div>
</template>

<style scoped>
.display-panel {
  background-color: #fdf2e9;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 10px;
}
</style>

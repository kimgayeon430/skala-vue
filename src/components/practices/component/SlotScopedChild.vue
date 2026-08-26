<script setup>
import { ref } from 'vue'

// 이 상태들은 자식이 소유하므로 부모 템플릿에서 바로 접근할 수 없습니다.
const message = ref('현재 서버 상태 정상')
const userCount = ref(150)
</script>

<template>
  <div class="base-card">
    <h3>하위 컴포넌트 (Child)</h3>

    <!--
      :text와 :count는 자식의 데이터를 슬롯 속성(slot props)으로 부모에게 전달합니다.
      일반 Props가 부모 → 자식 방향이라면, Scoped Slot의 데이터는 자식 → 부모 슬롯 내용
      방향으로 제공됩니다. 부모는 데이터를 받아 실제 출력 마크업을 자유롭게 구성합니다.
    -->
    <slot :text="message" :count="userCount">
      <!-- 부모가 슬롯 템플릿을 제공하지 않으면 대신 표시됩니다. -->
      <p>부모가 마크업을 주입하지 않았을 때의 디폴트 화면</p>
    </slot>
  </div>
</template>

<style scoped>
.base-card {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>

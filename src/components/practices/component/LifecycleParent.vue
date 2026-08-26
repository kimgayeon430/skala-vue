<script setup>
import { ref } from 'vue'
import LifecycleChild from '@/components/practices/component/LifecycleChild.vue'

// 자식 컴포넌트를 화면에 표시할지 결정하는 반응형 상태입니다.
// ref의 값이 바뀌면 Vue가 이 값을 사용하는 템플릿 부분을 다시 렌더링합니다.
const isShow = ref(true)
</script>

<template>
  <div class="practice-section">
    <h2>Lifecycle Hook</h2>

    <!--
      클릭할 때마다 isShow를 true/false로 전환합니다.
      템플릿에서는 ref의 .value를 생략할 수 있으므로 isShow.value가 아닌 isShow로 사용합니다.
    -->
    <button @click="isShow = !isShow" class="toggle-btn">
      {{ isShow ? '🛑 실습 컴포넌트 파괴하기 (v-if="false")' : '🟢 실습 컴포넌트 다시 살리기' }}
    </button>
    <hr />

    <!--
      v-if는 단순히 화면을 숨기는 것이 아니라 조건에 따라 컴포넌트를 생성하거나 제거합니다.
      isShow가 false가 되면 자식의 onUnmounted가 실행되고,
      다시 true가 되면 새로운 자식 인스턴스가 생성되어 setup → onMounted 순서를 다시 거칩니다.
      따라서 자식을 다시 살릴 때 count도 초기값 0부터 시작합니다.
    -->
    <LifecycleChild v-if="isShow" />
  </div>
</template>

<style scoped>
.toggle-btn {
  padding: 10px 15px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-bottom: 15px;
}
</style>

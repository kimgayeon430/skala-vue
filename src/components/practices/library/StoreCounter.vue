<script setup>
// 1. 정의한 카운터 스토어 플러그인 import
import { useCounterStore } from '@/stores/counter.js'

// 2. 인스턴스 가동 (전역 저장소 포인터 확보)
const counterStore = useCounterStore()
</script>

<template>
  <div class="practice-section">
    <h2>Counter Store 활용 실습</h2>

    <p>
      <!-- Store의 반응형 state를 화면에 출력 -->
      원본 카운트 데이터(state): <strong>{{ counterStore.count }}</strong>
    </p>
    <p>
      <!-- count를 기반으로 계산된 getter 값을 출력 -->
      2배 연산 데이터(getters): <span>{{ counterStore.doubleCount }}</span>
    </p>

    <!-- 클릭하면 Store에 정의된 action이 실행됨 -->
    <button @click="counterStore.increment">숫자 1 증가 (actions)</button>
  </div>
</template>

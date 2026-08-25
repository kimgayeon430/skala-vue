<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
// dummy도 화면에 출력되므로 값이 바뀌면 컴포넌트는 다시 렌더링됨
// 하지만 아래 두 계산식에서는 dummy를 사용하지 않으므로 계산 결과와는 무관함
const dummy = ref(0)

// 1. 일반 함수
// 템플릿에서 getMethodResult()로 직접 호출하므로 컴포넌트가 렌더링될 때마다 실행됨
const getMethodResult = () => {
  console.log('❌ 일반 함수 실행됨!')

  // dummy가 바뀌어 함수가 다시 실행돼도 count가 그대로라면 계산 결과도 그대로임
  // 즉, "함수가 다시 실행됨"과 "결과값이 변경됨"은 서로 다른 의미임
  return count.value * 2
}

// 2. computed
// 실행 중 사용한 반응형 값인 count를 의존성으로 기억하고 계산 결과도 캐싱함
const doubleCount = computed(() => {
  console.log('✅ Computed 연산 실행됨!')

  // count가 변경되면 다시 계산하고, dummy만 변경되면 저장된 이전 결과를 재사용함
  return count.value * 2
})
</script>

<template>
  <div class="practice-section">
    <h2>computed() 캐싱 동작 비교</h2>

    <!-- count 또는 dummy가 변경되면 이 표현식을 갱신하기 위해 컴포넌트가 다시 렌더링됨 -->
    <p>count: {{ count }} | dummy: {{ dummy }}</p>

    <!-- count는 두 계산식에서 사용하므로 일반 함수와 computed 결과가 모두 새로 계산됨 -->
    <button @click="count++">count 증가 (의존성 변경)</button>

    <!-- dummy는 화면만 다시 렌더링할 뿐, count * 2의 입력값에는 영향을 주지 않음 -->
    <button @click="dummy++">dummy 증가 (무관한 변경)</button>

    <!--
      dummy 증가 시:
      - 일반 함수: 렌더링 과정에서 다시 호출되지만 count가 같아서 결과도 같음
      - computed: 의존성 count가 바뀌지 않아 재실행하지 않고 캐시된 결과를 사용함
      콘솔에서 일반 함수 로그만 새로 출력되는지 확인
    -->
    <p>일반 함수 결과: {{ getMethodResult() }}</p>
    <!-- computed는 함수 호출이 아니라 계산된 값처럼 사용하므로 괄호를 붙이지 않음 -->
    <p>Computed 결과: {{ doubleCount }}</p>
  </div>
</template>

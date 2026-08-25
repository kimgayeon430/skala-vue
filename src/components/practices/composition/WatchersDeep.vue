<script setup>
import { ref, watch } from 'vue'

// 객체 전체를 ref 안에 저장한 반응형 상태
const user = ref({
  name: '홍길동',
  age: 20,
})

const logDeep = ref('아직 반응 없음')
const logTarget = ref('아직 반응 없음')

// watch(user, callback)만 사용하면 user.value에 새로운 객체를 대입하는 변경은 감지하지만,
// user.value.name이나 user.value.age 같은 객체 내부 속성 변경은 기본적으로 감지하지 못함

// 방법 1: deep 옵션으로 객체 내부의 모든 중첩 속성을 깊게 감시
watch(
  user,
  (newVal) => {
    // name 또는 age 중 어느 값이 변경돼도 실행됨
    logDeep.value = `[deep 감지] 누군가 변경됨! 현재 이름: ${newVal.name}, 나이: ${newVal.age}`
  },
  { deep: true },
)

// 방법 2: getter 함수로 필요한 속성 하나만 선택하여 감시
// 전체 객체를 탐색하지 않고 age가 바뀔 때만 실행되며 이전 값도 명확하게 비교할 수 있음
watch(
  () => user.value.age,
  (newAge, oldAge) => {
    logTarget.value = `[타겟 감지] 나이가 ${oldAge}세 ➡️ ${newAge}세로 변경됨!`
  },
)
</script>

<template>
  <div class="practice-section">
    <h2>ref 객체/배열 감시</h2>
    <h3>👨‍💻 회원 데이터 조작 panel</h3>
    <p>이름: {{ user.name }} / 나이: {{ user.age }}세</p>
    <!-- 이름 변경: deep 감시만 실행되고 age 타겟 감시는 실행되지 않음 -->
    <button @click="user.name = '이순신'">이름만 변경</button> &nbsp;
    <!-- 나이 변경: deep 감시와 age 타겟 감시가 모두 실행됨 -->
    <button @click="user.age++">나이만 변경 (age++)</button>

    <div class="monitor">
      <p>👁️‍🗨️ 1) deep: true 모니터 (전체 감시)</p>
      <!-- 객체 내부의 name 또는 age가 바뀌면 갱신 -->
      <p>{{ logDeep }}</p>
    </div>

    <div class="monitor target">
      <p>🎯 2) 화살표 함수 모니터 (나이만 타겟 감시)</p>
      <!-- getter가 반환하는 age 값이 바뀔 때만 갱신 -->
      <p>{{ logTarget }}</p>
    </div>
  </div>
</template>

<style scoped>
.monitor {
  border-color: #0984e3;
  background: #e3fafc;
  font-weight: bold;
}
.target {
  border-color: #6c5ce7;
  background: #efe5ff;
}
</style>

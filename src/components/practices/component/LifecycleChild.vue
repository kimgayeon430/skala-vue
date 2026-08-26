<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

// count는 반응형 상태입니다. 값을 변경하면 템플릿의 {{ count }}가 자동으로 갱신됩니다.
const count = ref(0)

// setInterval이 반환하는 ID를 보관합니다.
// 컴포넌트가 제거될 때 같은 타이머를 찾아 중지하기 위해 컴포넌트 범위에 선언합니다.
let timerId = null

// 1) 생성(Setup)
// <script setup>의 최상위 코드는 컴포넌트 인스턴스가 만들어질 때 즉시 실행됩니다.
// 아직 실제 DOM에 부착되기 전이므로 이 시점에는 해당 컴포넌트의 DOM을 다룰 수 없습니다.
console.log('1. [setup] 컴포넌트가 메모리에 생성되었습니다. (DOM 접근 불가능)')

// 2) 부착(Mounting)
// 첫 렌더링이 끝나고 컴포넌트의 DOM이 화면에 연결된 뒤 한 번 실행됩니다.
// DOM 접근, 최초 데이터 요청, 타이머 또는 이벤트 리스너 등록 등에 주로 사용합니다.
onMounted(() => {
  console.log('2. [onMounted] 화면에 완벽히 부착되었습니다! (API 호출/DOM 조작 적기)')

  // 3초마다 count를 변경합니다. ref는 script 안에서 값을 읽고 쓸 때 .value가 필요합니다.
  timerId = setInterval(() => {
    count.value++
  }, 3000)
})

// 3) 갱신(Updating)
// count처럼 템플릿 렌더링에 사용된 반응형 값이 바뀌고,
// Vue가 변경 내용을 실제 DOM에 반영한 뒤 실행됩니다.
// 타이머뿐 아니라 아래 버튼으로 count를 변경해도 호출됩니다.
onUpdated(() => {
  console.log(`3. [onUpdated] 데이터가 변경되어 화면을 새로 그렸습니다. (현재 count: ${count.value})`)
})

// 4) 소멸(Unmounting)
// 부모의 v-if가 false가 되어 이 컴포넌트가 DOM과 Vue의 컴포넌트 트리에서 제거된 뒤 실행됩니다.
onUnmounted(() => {
  // 등록했던 타이머를 정리하지 않으면 컴포넌트가 사라진 뒤에도 콜백이 계속 실행될 수 있습니다.
  // 타이머, 이벤트 리스너, 외부 구독 등은 보통 이 단계에서 해제해 메모리 누수를 방지합니다.
  clearInterval(timerId)
  console.log('4. [onUnmounted] 컴포넌트가 소멸했습니다. 타이머 청소 완료!')
})
</script>

<template>
  <h3>⏱️ 라이프사이클 훅 흐름 탐색기</h3>
  <div class="counter-display">
    <!-- 템플릿에서는 ref가 자동으로 언래핑되므로 count.value 대신 count를 사용합니다. -->
    <p>실시간 타이머 카운트: {{ count }}</p>

    <!-- 이벤트 표현식에서도 ref가 자동으로 언래핑되어 count++만으로 값을 변경할 수 있습니다. -->
    <button @click="count++">수동으로 숫자 올리기</button>
  </div>
</template>

<style scoped>
.counter-display {
  background: #e3fafc;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #99e9f2;
  text-align: center;
}
</style>

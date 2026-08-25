<script setup>
import { ref, watch } from 'vue'

// watch가 감시할 반응형 상태
const currentCity = ref('서울')
// watch 실행 결과를 화면에서 확인하기 위한 메시지 상태
const logMessage = ref('아직 감시 시스템이 작동하지 않았습니다.')

// watch(감시 대상, 값이 변경된 후 실행할 콜백)
// currentCity의 값이 실제로 달라질 때만 콜백이 실행됨
watch(currentCity, (newValue, oldValue) => {
  // newValue: 변경된 새 도시, oldValue: 변경되기 전 도시
  logMessage.value = `📍 감시자 발동! [${oldValue}]에서 [${newValue}]로 변경됨.`

  // watch는 API 요청, 로그 기록, 저장처럼 상태 변경 후 실행할 작업에 적합함
  console.log(`🤖 [서버 요청 완료] 기상청 서버에서 ${newValue}의 날씨 API를 다시 조회합니다...`)
})
</script>

<template>
  <div class="practice-section">
    <h2>감시자 watch()의 원리와 실무 활용</h2>
    <h3>🏙️ 지역 선택 제어판</h3>
    <p>현재 선택된 도시: {{ currentCity }}</p>
    <!-- 버튼 클릭 자체가 아니라 클릭으로 인해 currentCity가 변경됐는지를 watch가 감시함 -->
    <!-- 이미 선택된 도시를 다시 누르면 값이 같으므로 watch 콜백은 실행되지 않음 -->
    <button @click="currentCity = '서울'">서울 선택</button> &nbsp; <button @click="currentCity = '수원'">수원 선택</button> &nbsp;
    <button @click="currentCity = '부산'">부산 선택</button>

    <div class="monitor">
      <h3>👁️‍🗨️ 파수꾼(watch) 모니터링 시스템</h3>
      <!-- watch 콜백에서 변경한 logMessage가 반응형이므로 화면도 자동 갱신됨 -->
      <p>{{ logMessage }}</p>
      <small style="color: gray">(버튼을 누른 후 브라우저 콘솔창 F12를 확인해 보세요)</small>
    </div>
  </div>
</template>

<style scoped>
.monitor {
  border-color: #0984e3;
  background: #e3fafc;
}
</style>

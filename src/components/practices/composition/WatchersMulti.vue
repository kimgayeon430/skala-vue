<script setup>
import { ref, watch } from 'vue'

// 서로 관련된 검색 조건을 각각의 반응형 상태로 관리
const city = ref('서울')
const dateType = ref('오늘')
// watch 실행 결과를 화면에 표시하기 위한 상태
const apiStatus = ref('대기 중...')

// 여러 상태를 하나의 배열로 전달하면 그중 하나만 변경돼도 콜백이 실행됨
watch([city, dateType], ([newCity, newDate], [oldCity, oldDate]) => {
  // 새 값과 이전 값도 감시 대상 배열과 같은 [city, dateType] 순서로 전달됨
  apiStatus.value = `[변경 감지] ${oldCity}(${oldDate}) ➡️ ${newCity}(${newDate})`

  // 실무에서는 여러 검색 조건 중 하나가 바뀔 때 동일한 API를 다시 요청할 수 있음
  console.log(`🤖 [통합 API 호출] ${newCity}의 ${newDate} 날씨를 불러옵니다...`)
})
</script>

<template>
  <div class="practice-section">
    <h2>여러 개의 변수 동시 감시 (watch)</h2>
    <h3>날씨 조건 설정</h3>
    <label>도시: </label>
    <!-- 도시를 선택하면 v-model이 city를 변경하고 watch가 실행됨 -->
    <select v-model="city">
      <option value="서울">서울</option>
      <option value="수원">수원</option>
      <option value="부산">부산</option>
    </select>

    <br />

    <label>날짜: </label>
    <!-- 라디오를 선택하면 dateType이 변경되어 같은 watch 콜백이 실행됨 -->
    <label><input type="radio" value="오늘" v-model="dateType" /> 오늘</label> &nbsp; <label><input type="radio" value="내일" v-model="dateType" /> 내일</label> &nbsp;
    <label><input type="radio" value="주간예보" v-model="dateType" /> 주간예보</label>

    <div class="monitor">
      <h3>통합 모니터링 로그</h3>
      <!-- 어떤 조건이 바뀌었든 새 도시와 날짜 조합을 한곳에서 확인 -->
      <p>현재 상태: {{ apiStatus }}</p>
    </div>
  </div>
</template>

<style scoped>
.monitor {
  border-color: #00b894;
  background: #e8f5e9;
}
</style>

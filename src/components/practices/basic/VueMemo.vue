<script setup>
import { ref } from 'vue'

const name = ref('홍길동')
const age = ref(20)

// ref 값은 script에서 변경할 때 .value를 사용함
// 이름과 나이를 처음 상태로 한 번에 되돌리는 함수
const resetProfile = () => {
  name.value = '홍길동'
  age.value = 20
}
</script>

<template>
  <div class="practice-section">
    <h2>v-memo 디렉티브 학습 (기능 추가)</h2>

    <div style="margin-bottom: 12px">
      <label>
        이름:
        <!-- trim 수식어는 입력값 앞뒤의 불필요한 공백을 제거함 -->
        <input v-model.trim="name" type="text" placeholder="이름을 입력하세요" />
      </label>
      &nbsp;
      <label>
        나이:
        <!-- number 수식어는 입력값을 문자열이 아닌 숫자로 변환함 -->
        <input v-model.number="age" type="number" min="0" />
      </label>
    </div>

    <!-- name 또는 age가 바뀔 때만 이 영역을 다시 렌더링함 -->
    <!-- 기존의 [name]에서는 age만 변경하면 렌더링을 건너뛰었으므로 age도 의존성에 추가함 -->
    <div v-memo="[name, age]" style="padding: 20px; border: 1px solid #42b883; margin-bottom: 10px">
      <p>📦 v-memo 적용 영역 (기준: name, age)</p>
      <p>이름: {{ name }}</p>
      <p>나이: {{ age }}</p>
    </div>

    <!-- 템플릿에서는 ref의 .value를 생략하고 직접 값을 변경할 수 있음 -->
    <button @click="age++">나이 한 살 추가</button>
    &nbsp;
    <!-- 여러 값을 변경할 때는 함수를 이벤트 핸들러로 연결 -->
    <button @click="resetProfile">초기화</button>
  </div>
</template>

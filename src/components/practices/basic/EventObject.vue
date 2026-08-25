<script setup>
import { ref } from 'vue'

const position = ref('')
const tagName = ref('')
const targetInfo = ref('')

// 함수 이름만 이벤트 핸들러로 전달하면 이벤트 객체가 첫 번째 인자로 자동 전달됨
const getOnlyEvent = (e) => {
  position.value = `좌표: X=${e.clientX}, Y=${e.clientY}`
}

// 일반 인자와 이벤트 객체를 함께 받을 때는 템플릿에서 $event를 명시함
const getWithParam = (name, e) => {
  tagName.value = `대상: ${name} / 클릭된 태그: ${e.target.tagName}`
}

const checkTarget = (e) => {
  // target: 사용자가 실제로 클릭한 요소
  // currentTarget: @click 이벤트 핸들러가 등록된 요소
  targetInfo.value = `target: ${e.target.tagName}, currentTarget: ${e.currentTarget.tagName}`
}
</script>

<template>
  <div class="practice-section">
    <h2>v-on 이벤트 객체($event) 활용</h2>
    <p>좌표: {{ position }}</p>
    <p>태그: {{ tagName }}</p>
    <!-- 함수 이름만 전달하면 클릭 이벤트 객체가 자동으로 넘어감 -->
    <button @click="getOnlyEvent">클릭 좌표 알아내기</button>
    <!-- 다른 인자와 이벤트 객체를 함께 전달하려면 $event를 사용 -->
    <button @click="getWithParam('회원A', $event)">회원 정보와 태그 확인</button>

    <h3>(추가) target과 currentTarget 비교</h3>
    <p>{{ targetInfo }}</p>
    <!-- 부모 영역을 클릭하면 둘 다 DIV, 자식 버튼을 클릭하면 target만 BUTTON이 됨 -->
    <div @click="checkTarget" style="padding: 20px; background-color: #eee">
      부모 영역
      <button>자식 버튼</button>
    </div>
  </div>
</template>

<script setup>
// reactive는 객체 또는 배열 전체를 반응형 상태로 만들 때 사용함
import { reactive } from 'vue'

// 1. 객체형 reactive 상태
// ref와 달리 script 영역에서도 .value 없이 객체 속성에 직접 접근함
const userReactive = reactive({
  name: '이순신',
  age: 30,
})

const celebrateReactive = () => {
  // reactive 객체의 속성을 변경하면 이 값을 사용하는 화면이 자동으로 갱신됨
  userReactive.age++
}

// 2. 배열형 reactive 상태
// 배열 역시 객체이므로 reactive로 감쌀 수 있음
const items = reactive(['사과', '바나나'])

// push로 원본 배열에 새 요소를 추가하면 Vue가 목록을 다시 렌더링함
const addItem = () => {
  items.push(`과일 ${items.length + 1}`)
}

// splice(시작 위치, 삭제 개수)로 클릭한 위치의 요소 한 개를 제거함
const removeItem = (index) => {
  items.splice(index, 1)
}
</script>

<template>
  <div class="practice-section">
    <h2>반응형 상태 reactive() 특징 및 주의점</h2>
    <h3>1) 객체(Object) reactive</h3>
    <!-- reactive 객체는 템플릿과 script 모두에서 .value 없이 속성에 접근 -->
    <p>이름: {{ userReactive.name }} / 나이: {{ userReactive.age }}세</p>
    <button @click="celebrateReactive">reactive 나이 한 살 추가</button>

    <h3>2) 배열(Array) reactive</h3>
    <ul>
      <!-- v-for로 배열의 값(item)과 위치(index)를 하나씩 꺼내 반복 렌더링 -->
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
        <!-- 현재 항목의 index를 전달하여 해당 위치의 과일만 삭제 -->
        <button @click="removeItem(index)" style="margin-left: 8px; padding: 2px 6px">삭제</button>
      </li>
    </ul>
    <button @click="addItem">과일 항목 추가</button>
  </div>
</template>

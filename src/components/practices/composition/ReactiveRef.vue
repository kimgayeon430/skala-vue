<script setup>
// ref는 숫자, 문자열, Boolean, 배열, 객체 등 모든 종류의 값을 반응형 상태로 만듦
// 반응형 상태가 변경되면 Vue가 그 값을 사용하는 화면을 자동으로 갱신함
import { ref } from 'vue'

// ref(초깃값): 초깃값을 가진 반응형 상태 생성
const count = ref(0)
const name = ref('홍길동')
const isActive = ref(true)
const items = ref(['사과', '배'])

// 객체도 ref에 저장할 수 있으며 객체 내부 속성의 변경도 화면에 반영됨
const user = ref({
  name: '이순신',
  age: 30,
})

const increaseRef = () => {
  // script 영역에서 ref의 실제 값을 읽거나 변경할 때는 .value가 필요함
  count.value++
}

const changeUserName = () => {
  // ref 안의 객체에 접근: user.value가 객체이고 .name은 객체의 속성
  user.value.name = '장보고'
}
</script>

<template>
  <div class="practice-section">
    <h2>반응형 상태 ref() 기초</h2>
    <p>
      <!-- 템플릿에서는 Vue가 ref를 자동으로 풀어 주므로 count.value가 아닌 count로 사용 -->
      Ref 카운트: <strong>{{ count }}</strong>
    </p>
    <!-- v-model은 입력창의 값과 name을 양방향으로 연결하여 입력 즉시 name을 변경함 -->
    <p>이름: <input v-model="name" />{{ name }}</p>
    <!-- ref 값도 일반 값처럼 조건식에서 사용할 수 있음 -->
    <p>활성 상태: {{ isActive ? '활성' : '비활성' }}</p>
    <!-- 템플릿에서는 ref 안의 배열 메서드도 바로 호출할 수 있음 -->
    <p>과일 목록: {{ items.join(', ') }}</p>
    <!-- ref 안의 객체도 템플릿에서는 user.value.name이 아닌 user.name으로 접근 -->
    <p>사용자 정보: 이름 - {{ user.name }}, 나이 - {{ user.age }}</p>

    <!-- 미리 정의한 함수를 클릭 이벤트 핸들러로 실행 -->
    <button @click="increaseRef">Ref 변수 증가</button>
    <!-- 템플릿에서는 .value 없이 ref 값을 직접 변경할 수 있음 -->
    <button @click="isActive = !isActive">토글</button>
    <!-- push로 배열을 변경하면 Vue가 변경을 감지하고 과일 목록을 갱신함 -->
    <button @click="items.push('귤')">과일 추가</button>
    <button @click="changeUserName">사용자 이름 변경</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 1. 상위 컴포넌트로부터 주입받을 데이터의 자료형 및 필수 여부 정의
defineProps({
  parentData: {
    type: String,
    required: true,
  },
})

// 2. 상위 컴포넌트로 송신할 커스텀 이벤트 식별자 등록
const emit = defineEmits(['update-request'])
const inputMessage = ref('')

// 3. 내부 이벤트 발생 시 페이로드를 실어 상위로 이벤트를 디스패치하는 함수
const sendNotification = () => {
  //const payload = 'Child에서 가공한 새로운 데이터'
  emit('update-request', inputMessage.value)
  inputMessage.value=''
}


</script>

<template>
  <div class="child-container">
    <h2>하위 컴포넌트 (Child)</h2>
    <p>
      수신된 Props 데이터: <strong>{{ parentData }}</strong>
    </p>
    <br />
    <!-- 자식에서 보낼 값 입력 -->
    <input v-model="inputMessage" placeholder="부모에게 보낼 메시지" />
    <button @click="sendNotification">상위 컴포넌트로 갱신 요청 (Emit)</button>
  </div>
</template>

<style scoped>
.child-container {
  border: 2px dashed #3498db;
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;
}
</style>

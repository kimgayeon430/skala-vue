<script setup>
import SlotNamedChild from './SlotNamedChild.vue'

// 슬롯에 전달한 버튼은 부모 템플릿에서 작성했으므로 부모의 함수를 사용할 수 있습니다.
const showMessage = () => {
  window.alert('부모가 넣은 슬롯 버튼입니다.')
}
</script>

<template>
  <div class="practice-section">
    <h2>Named Slot 주입 실습</h2>
    <SlotNamedChild>
      <!-- v-slot:header는 자식의 <slot name="header">에 전달할 내용을 지정합니다. -->
      <template v-slot:header>
        <h3>Child 주입 제목</h3>
      </template>

      <!-- 별도의 v-slot 이름이 없는 내용은 자식의 기본 <slot>에 전달됩니다. -->
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt..."</p>

      <template v-slot:footer>
        <button @click="showMessage">footerBtn</button>
      </template>
    </SlotNamedChild>

    <!-- footer를 전달하지 않았으므로 자식의 기본 footer가 표시됩니다. -->
    <SlotNamedChild>
      <p>Footer fallback 확인용 카드입니다.</p>
    </SlotNamedChild>
    <!-- footer slot에 전달된 내용이 없기 때문에 fallback으로 "기본 footer입니다" 출력됩니다. -->
  </div>
</template>

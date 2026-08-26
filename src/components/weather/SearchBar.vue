<script setup>
// 부모가 관리하는 현재 검색어를 Props로 전달받습니다.
defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

// 입력된 검색어를 부모에게 전달할 커스텀 이벤트입니다.
const emit = defineEmits(['update-query'])

const handleInput = (event) => {
  emit('update-query', event.target.value)
}
</script>

<template>
  <input
    class="search-input"
    type="text"
    :value="searchQuery"
    @input="handleInput"
    placeholder="검색할 도시 이름 입력"
  />
  <p>검색 중인 도시: {{ searchQuery }}</p>
</template>

<style scoped>
.search-input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border: 1px solid #bcc6d0;
  border-radius: 5px;
}
</style>

<script setup>
import { useConfigStore } from '@/stores/configStore'

// 부모가 관리하는 현재 검색어를 Props로 전달받습니다.
defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

// 입력된 검색어를 부모에게 전달할 커스텀 이벤트입니다.
const emit = defineEmits(['update-query', 'search'])
const configStore = useConfigStore()

const handleInput = (event) => {
  emit('update-query', event.target.value)
}

const searchCity = () => {
  emit('search')
}
</script>

<template>
  <form class="search-form" @submit.prevent="searchCity">
    <input
      class="search-input"
      type="text"
      :value="searchQuery"
      @input="handleInput"
      placeholder="검색할 도시 이름 입력"
    />
    <button
      type="submit"
      :disabled="!searchQuery.trim()"
      :style="configStore.buttonStyle"
    >
      검색
    </button>
  </form>
</template>

<style scoped>
.search-form {
  display: flex;
  gap: 8px;
}

.search-input {
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  padding: 10px;
  border: 1px solid #bcc6d0;
  border-radius: 5px;
}

.search-form button {
  min-width: 70px;
}
</style>

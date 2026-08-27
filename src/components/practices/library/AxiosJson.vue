<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

const items = ref([])
const textInput = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

// READ: 게시글 3개 조회
const handleRead = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        _limit: 3,
      },
    })

    items.value = response.data
  } catch (error) {
    console.error('GET 실패:', error)
    errorMessage.value = '데이터를 가져오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}

// CREATE: 새 게시글 추가
const handleCreate = async () => {
  const title = textInput.value.trim()

  if (!title) {
    return
  }

  try {
    const response = await axios.post(BASE_URL, {
      title,
      body: 'Axios POST 실습',
      userId: 1,
    })

    items.value.unshift(response.data)
    textInput.value = ''
  } catch (error) {
    console.error('POST 실패:', error)
    errorMessage.value = '데이터를 추가하지 못했습니다.'
  }
}

// UPDATE: 선택한 게시글 수정
const handleUpdate = async (item) => {
  const updatedTitle = window.prompt('수정할 제목을 입력하세요.', item.title)

  if (!updatedTitle?.trim()) {
    return
  }

  try {
    const response = await axios.put(`${BASE_URL}/${item.id}`, {
      ...item,
      title: updatedTitle.trim(),
    })

    const targetIndex = items.value.findIndex((currentItem) => currentItem.id === item.id)
    items.value[targetIndex] = response.data
  } catch (error) {
    console.error('PUT 실패:', error)
    errorMessage.value = '데이터를 수정하지 못했습니다.'
  }
}

// DELETE: 선택한 게시글 삭제
const handleDelete = async (itemId) => {
  try {
    await axios.delete(`${BASE_URL}/${itemId}`)

    items.value = items.value.filter((item) => item.id !== itemId)
  } catch (error) {
    console.error('DELETE 실패:', error)
    errorMessage.value = '데이터를 삭제하지 못했습니다.'
  }
}

// 컴포넌트가 화면에 나타나면 게시글을 자동 조회
onMounted(handleRead)
</script>

<template>
  <section class="practice-section">
    <h2>⚡ Axios CRUD 프로토타입 훈련</h2>

    <div class="create-form">
      <input
        v-model="textInput"
        type="text"
        placeholder="저장할 텍스트를 입력하세요"
        @keyup.enter="handleCreate"
      />
      <button class="create-button" @click="handleCreate">POST (추가)</button>
    </div>

    <p v-if="isLoading" class="status-message">데이터를 불러오는 중입니다.</p>
    <p v-if="errorMessage" class="status-message error-message">{{ errorMessage }}</p>

    <div class="post-list">
      <article v-for="item in items" :key="item.id" class="post-card">
        <div class="post-content">
          <span class="post-id">ID: {{ item.id }}</span>
          <p>{{ item.title }}</p>
        </div>

        <div class="post-actions">
          <button class="update-button" @click="handleUpdate(item)">PUT (수정)</button>
          <button class="delete-button" @click="handleDelete(item.id)">DEL (삭제)</button>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.practice-section {
  padding: 18px 22px 22px;
  margin: 12px 0 20px;
  border: 1px solid #e4e9e7;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 8px rgb(44 62 80 / 4%);
}

.create-form {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
}

.create-form input {
  flex: 1;
}

.create-button {
  color: white;
  background-color: #42b883;
  border-color: #42b883;
}

.post-list {
  display: grid;
  gap: 10px;
}

.post-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px;
  border: 1px solid #e0e6ea;
  border-radius: 8px;
  background-color: #fafcfd;
}

.post-content {
  min-width: 0;
}

.post-content p {
  margin: 5px 0 0;
  overflow-wrap: anywhere;
}

.post-id {
  color: #77838d;
  font-size: 13px;
  font-weight: 700;
}

.post-actions {
  display: flex;
  flex-shrink: 0;
  gap: 6px;
}

.update-button {
  color: #805b00;
  background-color: #fff8dd;
  border-color: #f0c85a;
}

.delete-button {
  color: #c0392b;
  background-color: #fff2f2;
  border-color: #efb3ad;
}

.status-message {
  padding: 12px;
  border-radius: 7px;
  background-color: #f5f7f8;
  color: #66727c;
}

.error-message {
  background-color: #fff2f2;
  color: #c0392b;
}

@media (max-width: 600px) {
  .create-form,
  .post-card {
    align-items: stretch;
    flex-direction: column;
  }

  .post-actions button {
    flex: 1;
  }
}
</style>

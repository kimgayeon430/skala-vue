<template>
  <header class="app-header">
    <nav class="app-nav" aria-label="주요 메뉴">
      <RouterLink to="/practice">기본 실습</RouterLink>
      <RouterLink to="/practice2">Composition API</RouterLink>
      <RouterLink to="/weather">날씨 과제</RouterLink>
    </nav>
  </header>

  <!-- 현재 URL과 일치하는 View 컴포넌트가 이 위치에 렌더링됨 -->
  <RouterView />
</template>

<style>
@import '@/assets/practice.css';

.app-header {
  position: sticky;
  z-index: 10;
  top: 0;
  padding: 12px 24px;
  border-bottom: 1px solid #dfe5eb;
  background: rgb(255 255 255 / 95%);
}

.app-nav {
  display: flex;
  gap: 8px;
  max-width: 1200px;
  margin: 0 auto;
}

.app-nav a {
  padding: 8px 14px;
  border-radius: 6px;
  color: #34495e;
  font-weight: 700;
  text-decoration: none;
}

.app-nav a:hover {
  background-color: #eef5f2;
}

.app-nav a.router-link-active {
  background-color: #42b883;
  color: white;
}
</style>

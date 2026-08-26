<template>
  <div class="base-card">
    <header>
      <!-- name이 있는 슬롯은 부모의 같은 이름을 가진 template과 연결됩니다. -->
      <slot name="header"></slot>
    </header>
    <main>
      <!-- 이름이 없는 콘텐츠는 이 기본 슬롯에 렌더링됩니다. -->
      <slot></slot>
    </main>
    <footer>
      <!-- 부모가 footer 슬롯을 전달하지 않으면 아래 fallback 콘텐츠가 표시됩니다. -->
      <slot name="footer">
        <p>기본 footer입니다.</p>
      </slot>
    </footer>
  </div>
</template>

<style scoped>
.base-card {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>

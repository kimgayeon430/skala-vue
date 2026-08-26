<template>
  <div class="base-card">
    <!--
      이름이 없는 <slot>은 기본 슬롯(Default Slot)입니다.
      부모가 컴포넌트 태그 사이에 작성한 마크업이 이 위치에 렌더링됩니다.
      자식은 카드의 공통 틀을 만들고, 부모는 슬롯 영역의 내용을 결정합니다.
    -->
    <slot>
      <!-- 부모가 슬롯 내용을 전달하지 않았을 때만 표시되는 fallback 콘텐츠입니다. -->
      <p>기본 콘텐츠 영역입니다.</p>
    </slot>
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

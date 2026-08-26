<script setup>
import SlotDefaultChild from '@/components/practices/component/SlotDefaultChild.vue'
</script>

<template>
  <div class="practice-section">
    <h2>Default Slot 레이아웃 주입 실습</h2>

    <!-- 컴포넌트 태그 사이의 <p>가 자식의 기본 <slot> 위치에 들어갑니다. -->
    <SlotDefaultChild>
      <p>단순한 텍스트 문장을 주입합니다.</p>
    </SlotDefaultChild>

    <!-- 같은 자식을 사용해도 부모가 서로 다른 태그와 내용을 전달할 수 있습니다. -->
    <SlotDefaultChild>
      <h2 style="color: #e74c3c">🔥 경고 상태</h2>
      <button>확인</button>
    </SlotDefaultChild>

    <!-- 전달한 내용이 없으므로 자식 <slot> 안의 fallback 콘텐츠가 표시됩니다. -->
    <SlotDefaultChild> </SlotDefaultChild>
  </div>
</template>

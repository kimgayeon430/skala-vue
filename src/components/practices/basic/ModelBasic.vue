<script setup>
import { ref } from 'vue'

// ref로 만든 값이 변경되면 이 값을 사용하는 화면도 자동으로 다시 갱신됨
const text1 = ref('') // v-model 축약 문법 실습용
const text2 = ref('') // v-model의 내부 동작 원리 실습용
</script>

<template>
  <div class="practice-section">
    <h2>v-model 양방향 데이터 바인딩</h2>
    <h3>1) v-model 축약 문법 (양방향)</h3>
    <!--
      v-model은 입력 요소의 값과 text1을 양방향으로 연결함
      1. text1 변경 -> 입력창의 value 변경
      2. 입력창에 타이핑 -> text1 변경
    -->
    <input type="text" v-model="text1" placeholder="여기에 입력하세요" />
    <p>
      <!-- 템플릿에서는 ref의 .value를 생략하고 text1처럼 사용함 -->
      입력된 값: <strong>{{ text1 }}</strong>
    </p>

    <h3>2) v-model의 내부 작동 원리 (단방향 + 이벤트)</h3>
    <!--
      아래 코드는 text 입력창에서 v-model="text2"가 하는 일을 직접 작성한 것
      :value는 데이터(text2)를 입력창에 보여주는 단방향 바인딩
      @input은 타이핑할 때 발생하며 입력창의 최신 값을 text2에 저장함
    -->
    <input
      type="text"
      :value="text2"
      @input="(e) => (text2 = e.target.value)"
      placeholder="원리 파악용 입력창"
    />
    <p>
      입력된 값: <strong>{{ text2 }}</strong>
    </p>

    <!-- 핵심: v-model은 :value와 @input을 합쳐 편리하게 작성한 문법임 -->
  </div>
</template>

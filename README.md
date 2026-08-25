# SKALA Vue Practice

Vue 3의 기본 문법을 작은 예제로 직접 실행해 보고, 배운 내용을 날씨 Mockup 과제로 종합한 학습 프로젝트입니다.

각 예제는 하나의 주제에 집중하도록 컴포넌트로 분리되어 있습니다. 단순히 문법을 작성하는 데서 끝내지 않고, 데이터가 화면에 반영되는 과정과 브라우저 이벤트가 Vue 상태를 변경하는 원리를 확인하는 것을 목표로 합니다.

## 주요 내용

- 일반 변수와 Vue 반응형 상태의 차이 비교
- Vue 디렉티브를 이용한 텍스트, HTML, 속성, 조건 및 반복 렌더링
- DOM 이벤트 객체와 이벤트 전파 과정 실습
- `v-model`의 양방향 바인딩 원리와 폼 요소별 동작 비교
- scoped CSS와 동적 클래스 및 스타일 바인딩
- 학습한 문법을 조합한 날씨 Mockup 구현
- 실습 내용이 많아짐에 따라 Vue Router로 학습 페이지 분리

## 기술 스택

- Vue 3 Composition API
- JavaScript
- Vite
- Vue Router
- Pinia
- Element Plus
- ESLint, Oxlint, Prettier

## 프로젝트 실행

### 요구 환경

- Node.js `^20.19.0` 또는 `>=22.12.0`
- npm

### 설치 및 개발 서버 실행

```sh
npm install
npm run dev
```

터미널에 표시되는 로컬 주소를 브라우저에서 열면 전체 실습 예제를 확인할 수 있습니다.

### 기타 명령어

```sh
# 프로덕션 빌드
npm run build

# 빌드 결과 미리 보기
npm run preview

# 코드 검사 및 자동 수정
npm run lint

# src 폴더 코드 포맷팅
npm run format
```

## 프로젝트 구조

```text
src/
├── App.vue
├── assets/
│   └── practice.css
├── components/
│   └── practices/
│       ├── basic/
│       │   ├── SampleOne.vue
│       │   ├── Vue*.vue
│       │   ├── Event*.vue
│       │   ├── Model*.vue
│       │   ├── StyleScoped.vue
│       │   └── WeatherMockup.vue
│       ├── composition/
│       │   ├── Reactive*.vue
│       │   ├── ComputedBasic.vue
│       │   └── Watchers*.vue
│       └── component/
│           ├── Lifecycle*.vue
│           ├── PropsEmits*.vue
│           └── Slot*.vue
├── router/
│   └── index.js
└── views/
    ├── BasicPracticeView.vue
    ├── Practice2.vue
    ├── WeatherView.vue
    └── WeatherCompositionView.vue
```

실습 내용이 많아져 모든 컴포넌트를 `App.vue` 한 화면에 계속 추가하기 어려워졌습니다. 이를 해결하기 위해 Vue Router를 사용해 주제별 페이지로 분리했습니다. `App.vue`는 공통 메뉴와 `RouterView`만 담당하고, 각 View 컴포넌트가 필요한 실습 컴포넌트를 묶어서 렌더링합니다.

| URL | View | 내용 |
| --- | --- | --- |
| `/` | 리다이렉트 | `/practice`로 자동 이동 |
| `/practice` | `BasicPracticeView.vue` | 디렉티브, 이벤트, 폼, 스타일 기본 실습 |
| `/practice2` | `Practice2.vue` | Composition API, Watcher, 생명주기, Props/Emits, Slot 실습 |
| `/weather` | `WeatherView.vue` | 날씨 Mockup 종합 과제 |
| `/weather-composition` | `WeatherCompositionView.vue` | computed와 watch를 적용한 날씨 Composition 과제 |

라우트 컴포넌트는 동적 `import()`로 불러옵니다. 사용자가 해당 URL에 접근할 때 필요한 페이지 코드를 로드하므로 페이지별 코드도 별도 번들로 분리됩니다.

```js
{
  path: '/practice2',
  name: 'practice2',
  component: () => import('../views/Practice2.vue'),
}
```

새 실습을 추가할 때는 View 파일을 만들고 `src/router/index.js`에 route를 등록한 뒤, `App.vue`의 내비게이션에 `RouterLink`를 추가합니다.

## 학습 내용 정리

### 1. 반응성 기초

`ref()`로 만든 값은 Vue가 변경을 추적하므로 값이 바뀌면 이를 사용하는 화면도 갱신됩니다.

```js
const count = ref(0)

const increase = () => {
  count.value++
}
```

- JavaScript 영역에서는 `ref`의 값을 읽거나 변경할 때 `.value`를 사용합니다.
- Vue 템플릿에서는 `ref`가 자동으로 해제되므로 `.value`를 생략합니다.
- 일반 변수는 값이 바뀌어도 Vue가 변경을 추적하지 않기 때문에 화면 갱신을 보장하지 않습니다.

관련 예제: `SampleOne.vue`, `SampleTwo.vue`

#### 일반 함수와 `computed`

- 일반 함수는 템플릿에서 호출하면 컴포넌트가 다시 렌더링될 때마다 실행됩니다.
- `computed`는 계산에 사용한 반응형 값을 의존성으로 기억하고 결과를 캐싱합니다.
- 의존성이 변경되면 다시 계산하고, 관계없는 상태만 변경되면 이전 결과를 재사용합니다.
- 함수가 다시 실행돼도 계산에 사용한 값이 그대로라면 화면의 결과값은 바뀌지 않습니다.

예를 들어 `count * 2`를 계산할 때 `dummy`만 증가하면 일반 함수는 렌더링 과정에서 다시 실행되지만 `count`가 같아 결과도 같습니다. `computed`는 의존성인 `count`가 바뀌지 않았으므로 재실행하지 않고 캐시된 결과를 사용합니다.

관련 예제: `ComputedBasic.vue`

#### `watch`와 `watchEffect`

`watch`는 지정한 반응형 값이 실제로 변경됐을 때 필요한 작업을 실행합니다. 버튼 클릭을 감시하는 것이 아니라 버튼을 눌러 바뀐 상태를 감시한다는 점이 중요했습니다. 같은 값을 다시 선택하면 상태가 바뀌지 않았기 때문에 콜백도 실행되지 않습니다.

```js
watch(currentCity, (newValue, oldValue) => {
  console.log(`${oldValue}에서 ${newValue}로 변경`)
})
```

- 하나의 `ref`뿐 아니라 `[city, dateType]`처럼 여러 값을 배열로 묶어 감시할 수 있습니다.
- 객체 내부 속성 전체를 감시할 때는 `{ deep: true }`를 사용합니다.
- 객체 전체가 아니라 특정 속성만 필요하면 `() => user.value.age`처럼 getter 함수로 감시하는 편이 명확합니다.
- `watch`는 API 재요청, 로그 기록, 저장처럼 값이 바뀐 뒤 실행해야 하는 작업에 사용하기 좋았습니다.

`watchEffect`는 감시할 값을 따로 적지 않고, 함수 안에서 사용한 반응형 값을 자동으로 추적합니다. `watch`와 달리 처음에도 한 번 바로 실행되고, 추적 중인 값이 바뀔 때마다 다시 실행됩니다.

```js
watchEffect(() => {
  console.log(searchQuery.value)
})
```

관련 예제: `WatchersBasic.vue`, `WatchersMulti.vue`, `WatchersDeep.vue`, `WeatherComposition.vue`

### 2. Vue 디렉티브

#### 텍스트와 HTML 출력

- `{{ value }}`: 가장 기본적인 텍스트 보간법
- `v-text`: 요소의 텍스트 내용을 설정
- `v-html`: 문자열을 HTML로 해석하여 출력

`v-html`에 사용자 입력이나 신뢰할 수 없는 문자열을 넣으면 XSS 공격으로 이어질 수 있으므로 주의해야 합니다.

관련 예제: `VueText.vue`, `VueHtml.vue`, `VueHtmlXss.vue`

#### 속성, 클래스, 스타일 바인딩

`v-bind`는 JavaScript 데이터를 HTML 속성에 연결하며 `:`로 줄여 쓸 수 있습니다.

```vue
<a :href="dynamicUrl">링크</a>
<button :disabled="isButtonDisabled">버튼</button>
<div :class="{ warning: isWarning }"></div>
<div :style="{ color: textColor }"></div>
```

관련 예제: `VueBind.vue`, `VueBindClass.vue`, `VueBindStyle.vue`, `VueBindShorthand.vue`

#### 조건부 렌더링

- `v-if`, `v-else-if`, `v-else`: 조건에 따라 DOM 요소를 생성하거나 제거
- `v-show`: 요소는 유지하고 CSS `display` 속성만 변경

자주 전환되는 UI는 `v-show`, 조건이 자주 바뀌지 않는 UI는 `v-if`를 고려할 수 있습니다.

관련 예제: `VueIf.vue`, `VueShow.vue`

#### 반복 렌더링

`v-for`는 배열이나 객체를 반복하여 화면을 생성합니다.

```vue
<div v-for="item in items" :key="item.id">
  {{ item.name }}
</div>
```

`:key`에는 각 항목을 안정적으로 구분할 수 있는 고유한 값을 사용하는 것이 중요합니다. `v-for`에서 만든 별칭은 해당 요소와 자식 요소 안에서만 사용할 수 있습니다.

관련 예제: `VueFor.vue`, `WeatherMockup.vue`

#### 렌더링 제어

- `v-once`: 최초 한 번만 렌더링하고 이후 변경은 반영하지 않음
- `v-memo`: 의존성 배열의 값이 바뀔 때만 해당 영역을 다시 렌더링
- `v-pre`: 템플릿 컴파일을 건너뛰고 내용을 그대로 표시
- `v-cloak`: Vue 컴파일 전 템플릿이 노출되는 현상을 방지

```vue
<div v-memo="[name, age]">
  {{ name }} / {{ age }}
</div>
```

`v-memo` 영역에서 사용하는 반응형 값을 의존성 배열에서 빠뜨리면 그 값만 바뀌었을 때 화면이 갱신되지 않을 수 있습니다.

관련 예제: `VueOnce.vue`, `VueMemo.vue`, `VuePre.vue`, `VueCloak.vue`

### 3. 이벤트 처리

`v-on`은 DOM 이벤트를 처리하며 `@`로 줄여 씁니다.

```vue
<button @click="count++">증가</button>
<button @click="showAlert">알림</button>
```

#### 이벤트 객체

함수 이름만 이벤트 핸들러로 전달하면 이벤트 객체가 첫 번째 인자로 자동 전달됩니다. 일반 인자와 함께 전달하려면 `$event`를 명시합니다.

```vue
<button @click="getOnlyEvent">이벤트 자동 전달</button>
<button @click="getWithParam('회원A', $event)">인자와 이벤트 전달</button>
```

- `event.target`: 실제로 이벤트가 시작된 요소
- `event.currentTarget`: 이벤트 핸들러가 등록된 요소

#### 이벤트 수식어

- `.prevent`: 링크 이동이나 폼 제출 같은 기본 동작 방지
- `.stop`: 이벤트가 부모 요소로 버블링되는 것을 방지
- `.self`: 이벤트가 등록된 요소 자체를 클릭했을 때만 실행

```vue
<a href="..." @click.prevent="handleLink">링크</a>
<button @click.stop="showDetail">상세보기</button>
<div @click.self="handleBox">부모 영역</div>
```

`.prevent`는 `event.preventDefault()`, `.stop`은 `event.stopPropagation()`을 편리하게 작성한 Vue 문법입니다.

관련 예제: `EventBasic.vue`, `EventObject.vue`, `EventModifier.vue`

### 4. 폼과 `v-model`

텍스트 입력에서 `v-model`은 개념적으로 `:value`와 `@input`을 합친 문법입니다.

```vue
<input v-model="text" />
```

```vue
<input
  :value="text"
  @input="text = $event.target.value"
/>
```

데이터 흐름은 다음과 같습니다.

```text
text ── :value ──> 입력창
text <─ @input ─── 입력창
```

폼 요소에 따라 내부에서 연결되는 값이 달라집니다.

| 폼 요소 | 화면에 연결되는 값 | 상태를 변경하는 이벤트/값 |
| --- | --- | --- |
| text, textarea | `value` | `input`, `event.target.value` |
| 단일 checkbox | `checked` | `change`, `event.target.checked` |
| 다중 checkbox | 배열 포함 여부 | 선택값을 배열에 추가 또는 제거 |
| radio | 현재 값과 `value` 비교 | 선택된 항목의 `value` |
| select | 선택된 `value` | `change`, 선택된 항목의 `value` |

#### 한글 IME 입력

한글은 여러 키 입력을 조합하여 한 글자를 완성합니다. 기본 `v-model`은 조합 중인 미완성 글자를 상태에 바로 반영하지 않고 글자가 확정될 때 갱신합니다.

검색어 자동완성이나 실시간 글자 수처럼 조합 중인 값까지 필요하다면 직접 `:value`와 `@input`을 사용할 수 있습니다.

```vue
<textarea
  :value="comment"
  @input="comment = $event.target.value"
></textarea>
```

일반적인 폼은 `v-model`을 사용하고, 한글 조합 중 실시간 처리가 꼭 필요한 경우에만 직접 이벤트를 연결하는 것이 좋습니다.

#### `v-model` 수식어

- `.lazy`: `input` 대신 `change` 시점에 동기화
- `.number`: 입력값을 숫자로 변환
- `.trim`: 입력값 앞뒤 공백 제거
- 수식어는 `v-model.trim.number`처럼 함께 사용할 수 있음

관련 예제: `ModelBasic.vue`, `ModelForm.vue`, `ModelModifier.vue`

### 5. 스타일 처리

`<style scoped>`를 사용하면 해당 컴포넌트에만 스타일이 적용됩니다. 동적인 UI 상태는 `:class`와 `:style`로 표현할 수 있습니다.

관련 예제: `StyleScoped.vue`, `VueBindClass.vue`, `VueBindStyle.vue`

## 종합 과제: Weather Mockup

`WeatherMockup.vue`는 앞에서 학습한 문법을 함께 사용하는 날씨 화면입니다.

### 구현 기능

- `ref` 배열로 서울, 수원, 부산, 제주도 날씨 데이터 관리
- `v-for`와 고유한 `:key`로 도시 카드 반복 렌더링
- `v-if`, `v-else`로 25℃ 이상/미만 온도 라벨 구분
- `:value`와 `@input`으로 한글 검색어를 조합 중에도 즉시 표시
- 카드 클릭 시 선택된 도시 상태 갱신
- 상세보기 버튼 클릭 시 도시와 날씨 상태를 `window.alert()`로 표시
- `@click.stop`으로 상세보기 클릭 이벤트의 부모 카드 버블링 차단
- scoped CSS로 검색 영역, 도시 카드, 온도 라벨 및 상태 메시지 구성

현재 검색창은 입력한 도시명을 상태에 저장하고 화면에 표시하는 학습용 기능입니다. 실제 목록 필터링은 이후 `computed()`와 `Array.prototype.filter()`를 활용해 확장할 수 있습니다.

## 종합 과제: Weather Composition

기존 날씨 Mockup을 유지하면서 `computed`, `watch`, `watchEffect`를 적용한 두 번째 날씨 페이지를 별도로 만들었습니다.

- `filteredWeatherList` computed로 검색어가 포함된 도시만 화면에 출력
- 검색어가 비어 있으면 전체 목록을 반환하고, 결과가 없으면 안내 문구 표시
- 카드 클릭 시 도시 객체 전체를 `selectedCityInfo`에 저장
- `watch`로 선택 도시가 바뀌기 전과 바뀐 후의 값을 콘솔에 기록
- `watchEffect`로 검색어와 필터 결과를 자동 추적하여 콘솔에 기록
- 직접 추가한 `temperatureUnit` 반응형 상태로 섭씨와 화씨 단위 관리
- `displayedWeatherList` computed로 검색 결과의 표시 온도를 현재 단위에 맞게 변환
- 온도 단위 변경을 `watch`로 감시하여 이전 단위와 새 단위를 콘솔에 기록
- 원본 섭씨 온도는 유지하고 화면에 보여줄 값만 별도로 계산
- `favoriteCities`에는 이름 대신 변경 가능성이 적은 도시 ID를 저장
- `favoriteWeatherList` computed로 전체 날씨 중 즐겨찾기한 도시만 추출
- `favoriteAvgTemp` computed와 `reduce()`로 즐겨찾기 도시의 평균 기온 계산
- 즐겨찾기 버튼에 `.stop`을 사용해 부모 카드의 선택 이벤트가 함께 실행되는 것을 방지
- `{ deep: true }` watcher로 배열 내부의 추가·삭제를 감지하여 localStorage에 자동 저장
- 시작할 때 localStorage 값을 복원하고, 값이 없거나 잘못된 JSON이면 빈 배열로 안전하게 처리
- `/weather-composition` 라우트로 기존 날씨 과제와 분리

실습하면서 `computed`는 화면에 사용할 새로운 값을 만드는 역할이고, `watch`와 `watchEffect`는 상태가 바뀐 뒤 추가 작업을 실행하는 역할이라는 차이를 확인했습니다. 섭씨·화씨 변환에서는 원본 데이터를 직접 수정하지 않고 computed로 표시용 데이터를 만드는 방식을 연습했습니다. 즐겨찾기 기능을 추가하면서 반응형 배열의 변경을 감시하고 브라우저 저장소에 연결하는 흐름도 확인했습니다.

### 즐겨찾기 저장 흐름

```text
즐겨찾기 버튼 클릭
→ favoriteCities 배열에 도시 ID 추가 또는 제거
→ deep watcher가 배열 내부 변경 감지
→ JSON 문자열로 변환해 localStorage에 저장
→ 새로고침 시 저장된 ID 배열 복원
→ computed가 즐겨찾기 목록과 평균 기온 다시 계산
```

localStorage는 배열을 직접 저장할 수 없기 때문에 저장할 때 `JSON.stringify()`를 사용하고, 불러올 때 `JSON.parse()`를 사용했습니다. 즐겨찾기가 하나도 없을 때는 평균 계산 과정에서 0으로 나누지 않도록 `0`을 반환합니다.

## 공부하며 이해한 핵심

1. Vue 화면의 기준은 DOM 자체가 아니라 반응형 상태입니다.
2. 디렉티브는 상태와 DOM 속성, 렌더링, 이벤트를 연결하는 Vue 문법입니다.
3. `v-model`은 마법처럼 별도의 기능이 아니라 값 바인딩과 입력 이벤트 처리를 묶은 편의 문법입니다.
4. 한글 IME처럼 입력 과정에 예외가 있으므로 필요한 반영 시점에 따라 `v-model`과 직접 이벤트 처리를 선택해야 합니다.
5. 이벤트는 자식에서 부모로 버블링되며 `.stop`, `.self`, `.prevent`로 필요한 동작을 명확하게 제어할 수 있습니다.
6. `v-for`의 데이터 별칭에는 유효 범위가 있고, 반복 항목에는 안정적인 고유 `key`가 필요합니다.
7. `v-memo`의 의존성 배열에는 해당 영역의 갱신에 필요한 반응형 값을 빠짐없이 넣어야 합니다.
8. 실습 규모가 커지면 View 단위로 나누고 Vue Router로 URL을 연결해 `App.vue`의 역할을 공통 레이아웃으로 제한할 수 있습니다.
9. `computed`는 파생 값을 만들고 캐싱하며, `watch`는 지정한 상태 변경 이후의 작업을 처리합니다.
10. `watchEffect`는 함수 내부에서 사용한 반응형 값을 자동 추적하고 처음에도 즉시 실행됩니다.
11. 원본 상태를 직접 바꾸지 않고 `computed`로 화면에 필요한 형태를 만들어 사용할 수 있습니다.
12. 배열 내부 변경을 `watch`로 감시하려면 `{ deep: true }`가 필요하며, localStorage에는 JSON 문자열로 변환해서 저장해야 합니다.

## 다음 학습 목표

- 날씨 검색에서 대소문자와 공백 등 다양한 입력 조건 처리
- props와 emit을 사용해 날씨 카드 컴포넌트 분리
- Pinia를 사용한 전역 상태 관리
- 중첩 라우트와 동적 라우트 파라미터 학습
- API 요청을 통한 실제 날씨 데이터 연동
- 컴포넌트 단위 테스트 작성

# SKALA Vue Practice

## 프로젝트 개요

| 구분      | 내용                    |
| --------- | ----------------------- |
| 수업명    | Front-framework: Vue.js |
| 학습 기간 | 2026.08.24 ~ 2026.08.27 |
| 작성일    | 2026.08.27              |
| 작성자    | 김가연                  |

4일 동안 진행한 Vue.js 수업의 실습 내용을 모아 둔 프로젝트다. Vue 기본 문법부터 Composition API, 컴포넌트, Router, Pinia, Axios까지 순서대로 공부했다.

처음에는 간단한 문법 예제와 Mock Data로 날씨 화면을 만들었고, 수업이 진행되면서 검색, 즐겨찾기, 상세 페이지, 온도 단위 설정, 실제 날씨 API까지 하나씩 추가했다.

## 사용 기술

- Vue 3 Composition API
- JavaScript
- Vite
- Vue Router
- Pinia
- Axios
- Element Plus
- ESLint, Oxlint, Prettier

## 실행 방법

```sh
npm install
npm run dev
```

OpenWeatherMap API를 사용하는 화면은 프로젝트 루트에 `.env.local` 파일이 필요하다.

```env
VITE_OPENWEATHER_API_KEY=본인의_API_키
```

환경변수를 추가하거나 수정한 뒤에는 개발 서버를 다시 실행해야 한다. `.env.local`은 Git에 올라가지 않도록 제외되어 있다.

```sh
# 빌드
npm run build

# 린트
npm run lint
```

## 주요 화면

| URL                    | 내용                                        |
| ---------------------- | ------------------------------------------- |
| `/practice`            | Vue 기본 문법 실습                          |
| `/practice2`           | Composition API와 컴포넌트 실습             |
| `/practice3`           | Pinia, Axios, Element Plus 실습             |
| `/weather`             | 날씨 Mockup 과제                            |
| `/weather-composition` | computed와 watch를 적용한 날씨 과제         |
| `/weather-component`   | 컴포넌트로 분리한 날씨 과제                 |
| `/weather-router`      | Router, Pinia, Axios를 적용한 날씨 대시보드 |

## 프로젝트 구조

```text
src/
├── App.vue
├── main.js
├── assets/
│   ├── base.css
│   ├── main.css
│   └── practice.css
├── components/
│   ├── practices/
│   │   ├── basic/
│   │   │   ├── SampleOne.vue
│   │   │   ├── Vue*.vue
│   │   │   ├── Event*.vue
│   │   │   ├── Model*.vue
│   │   │   ├── StyleScoped.vue
│   │   │   └── WeatherMockup.vue
│   │   ├── composition/
│   │   │   ├── Reactive*.vue
│   │   │   ├── ComputedBasic.vue
│   │   │   └── Watchers*.vue
│   │   ├── component/
│   │   │   ├── Lifecycle*.vue
│   │   │   ├── PropsEmits*.vue
│   │   │   └── Slot*.vue
│   │   └── library/
│   │       ├── StoreCounter.vue
│   │       ├── AxiosWeather.vue
│   │       ├── AxiosJson.vue
│   │       ├── ElementPlus.vue
│   │       └── EcmaScript.vue
│   └── weather/
│       ├── BaseDashboardCard.vue
│       ├── SearchBar.vue
│       ├── UnitToggler.vue
│       ├── WeatherCard.vue
│       ├── WeatherParent.vue
│       └── WeatherSummary.vue
├── router/
│   └── index.js
├── services/
│   └── weatherApi.js
├── stores/
│   ├── configStore.js
│   ├── counter.js
│   └── weatherStore.js
└── views/
    ├── BasicPracticeView.vue
    ├── Practice2.vue
    ├── Practice3.vue
    ├── WeatherView.vue
    ├── WeatherCompositionView.vue
    ├── WeatherComponentView.vue
    ├── WeatherHomeView.vue
    ├── WeatherAboutView.vue
    ├── WeatherFavoritesView.vue
    ├── WeatherDetailView.vue
    └── NotFoundView.vue
```

## 공부한 내용

### 1. Vue 기본 문법

`ref()`로 만든 값은 Vue가 변경을 추적하기 때문에 값이 바뀌면 화면도 다시 그려진다. JavaScript에서는 `.value`를 사용하고 템플릿에서는 생략할 수 있다.

```js
const count = ref(0)

const increase = () => {
  count.value++
}
```

함께 실습한 내용은 다음과 같다.

- `v-text`, `v-html`, `v-bind`
- `v-if`, `v-show`, `v-for`
- `v-on`과 이벤트 수식어
- `v-model`과 폼 입력
- 동적 class와 style
- `v-once`, `v-memo`, `v-pre`, `v-cloak`

`v-html`에 신뢰할 수 없는 값을 넣으면 XSS 문제가 생길 수 있고, `v-for`의 `key`에는 각 데이터를 구분할 수 있는 고유 값을 사용해야 한다.

### 2. computed와 watch

`computed`는 기존 상태로 새로운 값을 계산할 때 사용했다. 의존하는 값이 바뀌기 전까지 계산 결과를 재사용한다.

`watch`는 특정 값이 변경된 뒤 실행할 작업에 사용했고, `watchEffect`는 함수 안에서 사용한 반응형 값을 자동으로 추적한다는 차이가 있었다.

```js
const doubleCount = computed(() => count.value * 2)

watch(searchQuery, (newValue, oldValue) => {
  console.log(oldValue, newValue)
})
```

날씨 검색, 온도 단위 변경, 즐겨찾기 localStorage 저장에 이 기능들을 적용했다.

### 3. Props와 Emits

부모가 자식에게 값을 보낼 때는 Props, 자식이 부모에게 변경을 요청할 때는 Emits를 사용했다.

```text
부모 상태 → Props → 자식
부모 함수 ← Emit ← 자식 이벤트
```

자식이 Props를 직접 수정하지 않고 이벤트와 데이터를 부모에게 보내면, 실제 상태 변경은 부모가 처리한다.

### 4. Slot

Slot은 부모가 만든 내용을 자식 컴포넌트의 원하는 위치에 넣는 기능이다.

- Default Slot: 기본 내용 전달
- Named Slot: header, footer처럼 위치를 나눠 전달
- Scoped Slot: 자식 데이터를 부모가 만든 화면에서 사용
- Fallback: 해당 Slot으로 전달된 내용이 없을 때 기본 내용 표시

### 5. Vue Router

실습 내용이 많아져서 View별로 URL을 나눴다. `App.vue`에는 공통 메뉴와 `RouterView`를 두고 각 View에서 필요한 컴포넌트를 불러오도록 구성했다.

날씨 과제에서는 `/weather-router/:cityId` 형태의 동적 라우트를 사용했다. 상세보기 버튼을 누르면 도시 ID가 포함된 주소로 이동하고, 그 ID로 상세 데이터를 찾는다.

존재하지 않는 주소는 Catch-all Route를 사용해 404 화면으로 이동하도록 했다.

### 6. Pinia

Pinia에서는 state, getter, action의 역할을 구분해서 사용했다.

| 구분   | 역할                  | Counter 예제  |
| ------ | --------------------- | ------------- |
| state  | 실제로 저장하는 값    | `count`       |
| getter | state로 계산한 값     | `doubleCount` |
| action | state를 변경하는 함수 | `increment()` |

Counter 실습에서는 버튼을 누를 때 `count`가 1씩 증가하고, `doubleCount`는 현재 count의 2배를 계산했다.

날씨 과제에는 `configStore`를 만들어 섭씨와 화씨 설정을 여러 화면에서 공유했다.

```js
const unit = ref('celsius')
const unitSymbol = computed(() => (unit.value === 'celsius' ? '℃' : '℉'))

function toggleUnit() {
  unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
}
```

추가 기능으로 날씨 카드의 `더움/선선함` 라벨을 한 번에 숨기거나 보이게 하는 설정도 Store에 넣었다.

### 7. Axios

Axios로 OpenWeatherMap과 JSONPlaceholder API를 호출했다. 요청할 때는 `async/await`를 사용하고 로딩과 오류 상태도 따로 관리했다.

```js
try {
  isLoading.value = true
  const response = await axios.get(API_URL, { params })
  data.value = response.data
} catch (error) {
  errorMessage.value = '데이터를 가져오지 못했습니다.'
} finally {
  isLoading.value = false
}
```

API 오류가 났을 때 Postman으로 같은 요청을 보내 봤다. Postman에서도 실패하면 API 키나 서버 문제이고, Postman은 성공하는데 Vue에서만 실패하면 환경변수나 Axios 코드를 확인하면 됐다.

#### JSONPlaceholder CRUD

| 기능 | 메서드 | 요청         |
| ---- | ------ | ------------ |
| 조회 | GET    | `/posts`     |
| 추가 | POST   | `/posts`     |
| 수정 | PUT    | `/posts/:id` |
| 삭제 | DELETE | `/posts/:id` |

JSONPlaceholder는 Fake API라서 성공 응답은 주지만 서버 데이터가 실제로 저장되지는 않는다. POST로 추가한 데이터가 화면에는 보여도 서버에는 없기 때문에 해당 ID로 다시 PUT하면 실패할 수 있다. 새로고침하면 원래 데이터로 돌아오는 것도 정상이다.

### 8. Element Plus

Element Plus의 `el-color-picker`를 사용해 색상을 선택하는 실습을 했다. `v-model`로 선택한 색상을 `ref`에 저장하고, 미리보기 박스의 배경색에 style 바인딩으로 적용했다.

```vue
<el-color-picker v-model="selectedColor" />

<div :style="{ backgroundColor: selectedColor }">
  선택한 색상 미리보기
</div>
```

기능을 많이 넣기보다는 UI 라이브러리 컴포넌트도 Vue의 반응형 상태와 `v-model`로 연결된다는 점을 확인하는 정도로 작성했다.

## 날씨 종합실습

### 1. Mockup

처음에는 서울, 수원, 부산, 제주 날씨를 배열에 직접 작성했다.

- `v-for`로 날씨 카드 출력
- 도시 검색어 입력
- 25℃를 기준으로 더움/선선함 표시
- 카드 선택과 상세보기 이벤트 처리

### 2. Composition API 적용

- computed를 이용한 도시 검색
- watch로 선택 도시와 온도 단위 변경 확인
- watchEffect로 검색 결과 자동 추적
- 섭씨·화씨 변환
- 즐겨찾기와 평균 기온 계산
- localStorage에 즐겨찾기 저장

원본 섭씨 값은 수정하지 않고 화면에 표시할 값만 computed로 계산했다. 이렇게 해야 단위를 여러 번 바꿔도 계산 오차가 쌓이지 않는다.

### 3. 컴포넌트 분리

검색창, 날씨 카드, 공통 박스, 요약 영역을 각각 컴포넌트로 나눴다. 부모가 상태를 관리하고 자식은 Props로 값을 받아 화면을 그리거나 Emit으로 이벤트를 전달하도록 했다.

### 4. Router 적용

- 날씨 대시보드
- 서비스 소개
- 도시 상세
- 즐겨찾기 목록
- 잘못된 주소의 404 페이지

### 5. Store 적용

`configStore`에서 온도 단위와 카드 라벨 설정을 관리했다. 메인에서 단위를 바꾸고 상세 페이지로 이동해도 같은 Store를 사용하기 때문에 설정이 유지된다.

Element Plus 색상 선택 실습을 날씨 화면에도 적용했다. `configStore`에 `buttonColor`를 추가하고, Color Picker에서 선택한 색상을 새로고침, 즐겨찾기, 상세보기 등의 버튼에 공통으로 적용했다.

- 처음 화면에서는 기존 회색 버튼 스타일을 사용한다.
- 색상을 선택한 뒤에만 버튼 색상이 변경된다.
- Color Picker의 색상을 비우면 다시 기본 스타일로 돌아간다.
- 선택 중에도 색상이 보이도록 `active-change` 이벤트를 Store action에 연결했다.

상단 메뉴가 복잡해 보여서 설정 영역도 정리했다. 날씨 단위와 버튼 색상을 작은 설정 박스로 구분하고, 상태 라벨 숨기기 버튼은 날씨 새로고침 버튼 옆으로 옮겼다.

처음에는 Store 인스턴스를 `ConfigStore`로 선언하고 템플릿에서는 `configStore`로 사용해서 버튼이 동작하지 않았다. JavaScript는 대소문자를 구분하기 때문에 이름을 통일해서 해결했다.

### 6. 실제 날씨 API 적용

Mock Data 대신 OpenWeatherMap Current Weather API를 사용했다. 현재는 다음 7개 도시의 데이터를 가져온다.

- 서울
- 수원
- 부산
- 제주
- 인천
- 대전
- 대구

`weatherApi.js`에는 도시 좌표와 API 요청 코드를 두고, `weatherStore.js`에서 요청 결과를 관리한다.

```text
화면 진입
→ weatherStore에서 데이터 요청
→ weatherApi가 7개 도시를 동시에 요청
→ 응답을 화면에서 쓰기 좋은 형태로 변환
→ Store에 저장
→ 메인, 상세, 즐겨찾기 화면 갱신
```

`Promise.all()`을 사용해 7개 도시를 동시에 요청했다. API 응답에서는 다음 값을 사용한다.

- 현재 기온과 체감온도
- 날씨 상태와 아이콘
- 습도
- 풍속
- 관측 시각

메인 화면에는 새로고침 버튼과 마지막 갱신 시각을 추가했다. 이미 Store에 데이터가 있으면 페이지를 이동할 때 다시 요청하지 않고, 새로고침 버튼을 누르면 강제로 최신 데이터를 받는다.

검색과 즐겨찾기는 기존 기능을 유지하면서 실제 API 데이터에 연결했다. 상세 페이지에서도 같은 Store 데이터를 사용한다.

## 실습하면서 알게 된 점

- 반응형 상태를 기준으로 화면을 구성하면 DOM을 직접 수정할 일이 줄어든다.
- computed는 화면에 필요한 값을 만들고, watch는 값이 바뀐 뒤 할 일을 처리한다.
- 컴포넌트의 역할을 나누면 코드가 길어져도 수정할 위치를 찾기 쉽다.
- 공통 상태를 Store에 두면 여러 View에서 같은 값을 사용할 수 있다.
- Element Plus 컴포넌트도 `v-model`과 이벤트를 사용해 일반 Vue 상태처럼 연결할 수 있다.
- API 요청은 성공 화면뿐 아니라 로딩과 오류 화면도 같이 만들어야 한다.
- API 응답 구조와 화면에서 필요한 데이터 구조가 다를 수 있어서 중간에 변환하는 과정이 필요하다.
- API 키 오류는 Postman으로 먼저 확인하면 원인을 찾기 편하다.
- Fake API와 실제로 저장되는 API의 차이를 구분해야 한다.

## 다음에 해볼 것

- OpenWeatherMap 외의 API를 하나 더 연결하기
- 여러 도시 요청 중 일부만 실패했을 때 나머지 도시는 보여 주기
- 온도 변환 중복 코드를 composable로 분리하기
- Pinia 설정을 localStorage에 저장하기
- 컴포넌트 테스트 작성하기

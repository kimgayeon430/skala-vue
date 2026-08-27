import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/weather-router',
    },
    {
      path: '/practice',
      name: 'practice',
      component: () => import('../views/BasicPracticeView.vue'),
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import('../views/WeatherView.vue'),
    },
    {
      path: '/practice2',
      name: 'practice2',
      component: () => import('../views/Practice2.vue'),
    },
    {
      path: '/weather-composition',
      name: 'weather-composition',
      component: () => import('../views/WeatherCompositionView.vue'),
    },
    {
      path: '/weather-component',
      name: 'weather-component',
      component: () => import('../views/WeatherComponentView.vue'),
    },
    {
      path: '/weather-router',
      name: 'weather-router-home',
      component: () => import('../views/WeatherHomeView.vue'),
    },
    {
      path: '/weather-router/about',
      name: 'weather-router-about',
      component: () => import('../views/WeatherAboutView.vue'),
    },
    {
      path: '/weather-router/favorites',
      name: 'weather-router-favorites',
      component: () => import('../views/WeatherFavoritesView.vue'),
    },
    {
      path: '/weather-router/:cityId',
      name: 'weather-detail',
      component: () => import('../views/WeatherDetailView.vue'),
    },
    {
      // Store와 외부 라이브러리 실습 화면
      path: '/practice3',
      name: 'practice3',
      // 해당 경로에 접근할 때 컴포넌트를 지연 로딩함
      component: () => import('../views/Practice3.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/profile',
  },
  {
    path: '/map',
    name: 'map',
    meta: {
      title: '地图轮换',
    },
    component: () => import('@/views/map.vue'),
  },
  {
    path: '/profile/:platform?/:player?',
    name: 'profile',
    meta: {
      title: '战绩查询',
      keepAlive: true,
    },
    component: () => import('@/views/profile.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

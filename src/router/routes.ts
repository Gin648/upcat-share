import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    component: Layout,
    redirect: { name: 'Home' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: {
          title: '主页',
        },
      },
      {
        path: 'ranking',
        name: 'Ranking',
        component: () => import('@/views/ranking/index.vue'),
        meta: {
          title: '排行',
        },
      },
      {
        path: 'friend',
        name: 'Friend',
        component: () => import('@/views/friend/index.vue'),
        meta: {
          title: '朋友',
        },
      },
      {
        path: 'collection',
        name: 'Collection',
        component: () => import('@/views/collection/index.vue'),
        meta: {
          title: '藏品',
        },
      },
      {
        path: 'star',
        name: 'Star',
        component: () => import('@/views/star/index.vue'),
        meta: {
          title: '星星',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
    children: [
      {
        path: '/login-email',
        name: 'LoginEmail',
        component: () => import('@/views/login/LoginEmail.vue'),
        meta: {
          title: '邮箱登录',
        },
      },
    ],
  },
]

export default routes

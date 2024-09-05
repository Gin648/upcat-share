import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'
import Demo from '@/views/demo/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    component: Layout,
    redirect: { name: 'Demo' },
    children: [
      {
        path: 'demo',
        name: 'Demo',
        component: Demo,
        meta: {
          title: '主页',
        },
      },
      {
        path: 'tools',
        name: 'Tools',
        component: () => import('@/views/tools/index.vue'),
        meta: {
          title: '工具',
        },
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/about/index.vue'),
        meta: {
          title: '关于',
          noCache: true,
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

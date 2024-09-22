import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
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
        path: 'my',
        name: 'My',
        component: () => import('@/views/my/index.vue'),
        meta: {
          title: '个人详情',
        },
        children: [
          {
            path: 'secure',
            name: 'MySecure',
            component: () => import('@/views/my/secure.vue'),
            meta: {
              title: '安全密码',
            },
          },
        ],
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

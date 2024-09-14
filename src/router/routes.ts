import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/index.vue'
import Ranking from '@/views/ranking/index.vue'
import Friend from '@/views/friend/index.vue'
import Collection from '@/views/collection/index.vue'

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
        children: [
          {
            path: 'level',
            name: 'LevelBenefit',
            component: () => import('@/views/home/levelbenefit.vue'),
            meta: {
              title: '等级权益',
            },
          },
          {
            path: 'squad',
            name: 'HomeSquad',
            component: () => import('@/views/home/squad.vue'),
            meta: {
              title: '小队',
            },
          },
        ],
      },
      {
        path: 'ranking',
        name: 'Ranking',
        component: () => Ranking,
        meta: {
          title: '排行',
        },
      },
      {
        path: 'friend',
        name: 'Friend',
        component: () => Friend,
        meta: {
          title: '朋友',
        },
        children: [
          {
            path: 'communityDetails',
            name: 'FriendCommunity',
            component: () => import('@/views/friend/communityDetails.vue'),
            meta: {
              title: '小队详情',
            },
          },
        ],
      },
      {
        path: 'secure',
        name: 'Secure',
        component: () => import('@/views/my/secure.vue'),
        meta: {
          title: '安全密码',
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
      {
        path: 'collection',
        name: 'Collection',
        component: () => Collection,
        meta: {
          title: '仓库',
        },
        children: [
          {
            path: 'record',
            name: 'CollectionRecord',
            component: () => import('@/views/collection/record.vue'),
            meta: {
              title: '兑换记录',
            },
          },
        ],
      },
      {
        path: 'star',
        name: 'Star',
        component: () => import('@/views/star/index.vue'),
        meta: {
          title: '星星',
        },
        children: [
          {
            path: 'record',
            name: 'StarRecord',
            component: () => import('@/views/star/record.vue'),
            meta: {
              title: '获奖记录',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/task',
    name: 'Task',
    component: () => import('@/views/task/index.vue'),
    meta: {
      title: '任务',
    },
    children: [
      {
        path: 'record',
        name: 'TaskRecord',
        component: () => import('@/views/task/record.vue'),
        meta: {
          title: '任务记录',
        },
      },
    ],
  },
  {
    path: '/teamInfo',
    name: 'TeamInfo',
    component: () => import('@/views/friend/communityDetails.vue'),
    meta: {
      title: '小队详情',
    },
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

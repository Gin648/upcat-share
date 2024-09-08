import Layout from '@/layout/index.vue'
import type {RouteRecordRaw} from 'vue-router'
import Home from '@/views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'root',
        component: Layout,
        redirect: {name: 'Home'},
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
                ],
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
                path: 'my',
                name: 'PersonalDetails',
                component: () => import('@/views/my/index.vue'),
                meta: {
                    title: '个人详情',
                },
            },
            {
                path: 'collection',
                name: 'Collection',
                component: () => import('@/views/collection/index.vue'),
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

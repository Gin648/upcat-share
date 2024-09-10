import {
  createRouter,
  createWebHashHistory,
  type RouteLocationNormalized,
} from 'vue-router'
import routes from './routes'
import { useCachedViewStoreHook } from '@/store/modules/cachedView'
import NProgress from '@/utils/progress'
import setPageTitle from '@/utils/set-page-title'
import useStore from '@/store'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    title?: string
    noCache?: boolean
  }
}

router.beforeEach((to: toRouteType, from, next) => {
  const { accountStore } = useStore()

  NProgress.start()
  // 路由缓存
  useCachedViewStoreHook().addCachedView(to)
  // 页面 title
  setPageTitle(to.meta.title)
  if (!accountStore.token && to.name !== 'Login' && to.name !== 'LoginEmail') {
    next({ name: 'Login' })
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router

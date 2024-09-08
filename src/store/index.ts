import useReloadStore from './modules/realod'
import useAccountStore from './modules/account'
import useGlobalStore from './modules/global'

export default function useStore() {
  return {
    reloadStore: useReloadStore(),
    accountStore: useAccountStore(),
    globalStore: useGlobalStore(),
  }
}

import { createPinia } from 'pinia'
const store = createPinia()
export { store }

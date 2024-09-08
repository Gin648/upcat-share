import useReloadStore from './modules/realod'
import useAccountStore from './modules/account'
import useGlobalStore from './modules/global'
import useStudyStore from './modules/study'

export default function useStore() {
  return {
    reloadStore: useReloadStore(),
    accountStore: useAccountStore(),
    globalStore: useGlobalStore(),
    studyStore: useStudyStore(),
  }
}

import { createPinia } from 'pinia'
const store = createPinia()
export { store }

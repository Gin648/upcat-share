import { defineStore } from 'pinia'
import { detect } from '@/utils/detect'

const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      // 签到奖励弹窗
      dailyCheck: false,
    }
  },
  getters: {
    environment: () => {
      return detect(navigator)
    },
  },
  actions: {
    changeDailyCheck(val) {
      this.dailyCheck = val
    },
  },
})

export default useGlobalStore

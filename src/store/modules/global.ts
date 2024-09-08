import { defineStore } from 'pinia'

const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      // 签到奖励弹窗
      dailyCheck: true,
    }
  },
  getters: {},
  actions: {
    changeDailyCheck(val) {
      this.dailyCheck = val
    },
  },
})

export default useGlobalStore

import { defineStore } from 'pinia'
import { getUserInfo } from '@/services/user'
const useAccountStore = defineStore('user', {
  // 开启数据持久化
  persist: true,
  state: () => {
    return {
      token: '',
      userInfo: <any>{},
      needGuide: true,
    }
  },
  getters: {},
  actions: {
    changeAccount(account: string) {
      this.account = account
    },
    async changeToken(token: string) {
      this.token = token
    },
    async changeUserInfo() {
      const { success, data } = await getUserInfo()
      if (success) {
        this.userInfo = data
      }
    },
    changeGuideStatus(val: boolean) {
      this.needGuide = val
    },
    //退出登录
  },
})

export default useAccountStore

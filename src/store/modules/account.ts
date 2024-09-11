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
      newcomer: [],
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
    //修改新人大礼包显示
    changeNewcomer(val: any) {
      this.newcomer = val
    },
  },
})

export default useAccountStore

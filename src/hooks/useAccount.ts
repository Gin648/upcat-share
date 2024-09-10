import useStore from '@/store'
import { telegramMiniAuth } from '@/services/telegram'

import { useRoute } from 'vue-router'
import router from '@/router'

export const useAccount = () => {
  const { accountStore, reloadStore } = useStore()

  const onLogout = async () => {
    const route = useRoute()
    accountStore.changeToken('')
    // if (window.Telegram?.WebApp.initData) {
    //   const invitationCode = window.Telegram.WebApp.initDataUnsafe?.start_param
    //   const { code, data }: any = await telegramMiniAuth({
    //     invitationCode: invitationCode,
    //     initData: window.Telegram?.WebApp.initData,
    //   })
    //   if (code === 200) {
    //     accountStore.changeToken(data.token)
    //     accountStore.changeUserInfo()
    //     reloadStore.reload()
    //     if (route.path === '/login') {
    //       router.replace('/home')
    //     }
    //   }
    // } else {
    //   router.replace('/login')
    // }
  }

  return {
    onLogout,
  }
}

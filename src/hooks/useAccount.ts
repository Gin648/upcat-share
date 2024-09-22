import useStore from '@/store'
import router from '@/router'

export const useAccount = () => {
  const { accountStore, reloadStore } = useStore()

  const onLogout = async () => {
    accountStore.changeToken('')
    router.replace('/login')
  }

  return {
    onLogout,
  }
}

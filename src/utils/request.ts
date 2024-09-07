import axios from 'axios'
import { closeToast, showToast } from 'vant'
import { config } from '@/config'
import useStore from '@/store'
import { useAccount } from '@/hooks/useAccount'
import { ApiResponse } from '@/typings/request'
import i18n from '@/locales/index'

axios.defaults.timeout = 50000

const request = <T>(
  method: string,
  url: string,
  params: any,
  needToken: boolean = true,
  headerContentType: string = 'application/json',
  baseURL: string = config.baseUrl,
  showError: boolean = true
): Promise<ApiResponse<T>> => {
  const headers: any = {
    'Content-type': headerContentType,
  }
  const { accountStore } = useStore()
  if (accountStore.token) {
    headers.authorized = accountStore.token
  }
  headers.lang = i18n.global.locale.value
  // headers.authorized = 111
  const { onLogout } = useAccount()

  if (needToken) {
    if (!accountStore.token) {
      onLogout()
      return new Promise((resolve) => {
        resolve({
          code: -1,
          success: false,
          data: null,
          message: 'Network exception',
        })
      })
    }
    headers.authorized = accountStore.token
  }

  return new Promise((resolve, reject) => {
    axios({
      method,
      headers,
      baseURL: baseURL,
      url,
      // timeout: 15000,
      params: method === 'GET' || method === 'DELETE' ? params : null, // 是即将与请求一起发送的 URL 参数
      data: method === 'POST' || method === 'PUT' ? params : null, // 是作为请求主体被发送的数据
    })
      .then((res: any) => {
        closeToast()

        // 412 // telegram 没有绑定邮箱
        if (res.data.code === 200) {
          res.data.success = true
          resolve(res.data)
        } else if (+res.data.code === 401) {
          if (showError) showToast(res.data.message)
          // token失效
          onLogout()
          resolve({
            code: -1,
            success: false,
            data: null,
            message: 'Network exception',
          })
        } else {
          if (showError) showToast(res.data.message)
          resolve({
            code: res.data.code,
            success: false,
            data: null,
            message: 'Network exception',
          })
        }
      })
      .catch((error) => {
        closeToast()
        let messageText = ''
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          messageText = error.response.data.message
        } else {
          messageText = 'Network exception'
        }
        if (showError) showToast(messageText)
        // reject(error)
        resolve({
          code: 500,
          success: false,
          data: null,
          message: 'Network exception',
        })
      })
  })
}

export default request

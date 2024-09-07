import { showToast } from 'vant'
import i18n from '@/locales/index'
const { t } = i18n.global

// 获取svg
export const getSvg = (name) => {
  return new URL(`/src/assets/svg/${name}`, import.meta.url).href
}

export const getImage = (name) => {
  return new URL(`/src/assets/${name}`, import.meta.url).href
}

export const handleCopy = (value: string) => {
  const text = document.createElement('textarea')
  text.value = value
  document.body.appendChild(text)
  text.select() // 选择对象
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    showToast(t('fu-zhi-cheng-gong'))
  }
  // 执行浏览器复制命令
  document.body.removeChild(text)
}

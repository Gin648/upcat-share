import {showToast} from 'vant'
import i18n from '@/locales/index'

const {t} = i18n.global

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

// 货币小数 默认4位
export const formatBalance = (value: string | number, num: number = 4) => {
  if (!value) return 0
  try {
    value = Number(value).toFixed(num + 1)
  } catch (error) {
    console.log(error)
  }
  value = typeof value === 'string' ? value : value.toString()
  const regex = new RegExp(`^\\d+(?:\\.\\d{0,${num}})?`)
  value = Number(value.match(regex))
  return value
}

export const formatNumberUnit = (num: number, count: number = 4) => {
  if (num >= 1000) {
    return formatBalance(num / 1000, count) + 'K'
  } else {
    return formatBalance(num, count)
  }
}

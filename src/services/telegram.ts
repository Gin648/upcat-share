import request from '@/utils/request'

export const telegramMiniAuth = (data) => {
  return request('POST', `/user/telegramMiniAuth`, data, false)
}

// 飞机小程序绑定邮箱
export const telegramMiniBindEmail = (data) => {
  return request('POST', `/user/telegramMiniBindEmail`, data, false)
}

// 查询邮箱是否绑定飞机号
export const telegramQueryEmail = (data) => {
  return request('POST', `/user/telegramQueryEmail`, data, false)
}

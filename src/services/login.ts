import request from '@/utils/request'

// 登錄
export const queryLogin = (data: any) => {
  return request('POST', '/user/login', data, false)
}

// 发送邮箱验证码(失效时间5分钟) 类型0注册1登录 2修改或设置密码 3忘记密码
export const sendEmailCode = (data) => {
  return request('POST', `/user/sendEmail`, data, false)
}

// 注册
export const register = (data) => {
  return request('POST', `/user/register`, data, false)
}

// 填写邀请码(绑定上级)
export const bindingSuperior = (invitationCode) => {
  return request('GET', `/user/bindingSuperior/${invitationCode}`, null, false)
}

// 退出登录
export const logout = () => {
  return request('GET', `/user/logout`, null, false)
}

// 用户修改或设置密码
export const updatePassword = (data) => {
  return request('POST', `/user/updatePassword`, data, false)
}

// 修改邮箱
export const updateEmail = (data) => {
  return request('POST', `/user/updateEmail`, data, false)
}

// 忘记密码(修改密码功能)
export const forgetPassword = (data) => {
  return request('POST', `/user/forgetPassword`, data, false)
}

// 协议
export const agreement = () => {
  return request('GET', `/agreement/list`, null, false)
}

import request from '@/utils/request'
import { ApiResponse, Page } from '@/typings/request'

// 用户信息(pid1(判断是否有上级(NULL或者0表示没有)))
export const getUserInfo = () => {
  return request('GET', '/user/userInfo', null)
}

// 邀请列表 有分页?page=1&size=10
export const getUserTeamPage = (
  params
): Promise<ApiResponse<{ total: number; list: [] }>> => {
  return request('GET', `/user/userTeamPage`, params)
}

// 用户明细统计
export const userAmountStatistics = () => {
  return request('POST', `/user/userAmountStatistics`, null)
}

// 用户修改基础信息
export const updateUserInfo = (data) => {
  return request('POST', `/user/updateUserInfo`, data)
}

// 我的经纪人信息
export const myBrokerInfo = () => {
  return request('POST', `/user/myBrokerInfo`, null)
}

// 上传
export const upload = (params) => {
  return request('POST', '/file/upload', params, true, 'multipart/form-data')
}

//绑定邀请码
export const bindInviteCode = (code) => {
  return request('get', `/user/bindingSuperior/${code}`, null)
}
//修改密码
export const changePassword = (data) => {
  return request('POST', '/user/updatePassword', data)
}
//忘记密码
export const forgetPassword = (data) => {
  return request('POST', '/user/forgetPassword', data)
}
// * 1:阅读文章  2:开盲盒  3:签到  4:领取瓜分猫币奖励  5:领取释放猫币奖励  10:其他
// 看广告(记录看的广告)
// sourceId(看文章时，传参文章id, 开盲盒,传盲盒序号)
export const addLookAd = (data) => {
  return request('POST', '/stUser/addLookAd', data)
}

// 用户钱包信息
export const userWalletInfo = () => {
  return request('GET', '/user/userWalletInfo', null)
}

// 领取已释放的猫币奖励
export const receiveReleasedAmount = () => {
  return request('GET', '/user/receiveReleasedAmount', null)
}

//用户等级信息
export const userLevelInfo = (id) => {
  return request('GET', `/stGradeConfig/gradeByidInfo/${id}`, null)
}
//等级列表
export const getGradePage = (params) => {
  return request('GET', `/stGradeConfig/getGradeConfigList`, params)
}
//用户主动升级
export const userUpgrade = (data) => {
  return request('POST', '/stUser/userUpgrade', data)
}

// 查询邀请赠送的金额
export const getInviterGiveAmount = () => {
  return request('POST', '/user/getInviterGiveAmount', null)
}

// 签到信息
export const signInfo = () => {
  return request('GET', '/signLog/signInfo', null)
}

// 今日签到
export const daySign = () => {
  return request('GET', '/signLog/daySign', null)
}

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

// 用户钱包信息
export const userWalletInfo = () => {
  return request('GET', '/user/userWalletInfo', null)
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

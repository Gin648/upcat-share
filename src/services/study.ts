import request from '@/utils/request'
import { ApiResponse, Page } from '@/typings/request'

// 学习  用户基础信息
export const getStUserInfo = () => {
  return request('GET', '/stUser/getStUserInfo', null)
}

export const getStTaskListPage = (
  params
): Promise<ApiResponse<{ total: number; list: [] }>> => {
  return request('GET', `/stTask/stTaskListPage`, params)
}

// 学习任务购买,sonId
export const addTaskSon = (data) => {
  return request('POST', '/stTask/addTaskSon', data)
}

// 获取用户能量刷新信息
export const getStUserEnergyInfo = () => {
  return request('GET', '/stUser/getStUserEnergyInfo', null)
}

// 刷新能量
export const refreshEnergy = () => {
  return request('GET', '/stUser/refreshEnergy', null)
}

// 查询加速信息配置：加速类型:1学习币 2：能量
export const getStSpeedConfigInfo = (speedType) => {
  return request(
    'GET',
    `/stSpeedConfig/getStSpeedConfigInfo/${speedType}`,
    null
  )
}
// 购买加速配置 id:1学习币 2：能量
export const addStSpeedConfigOrder = (data) => {
  return request('POST', '/stSpeedConfig/addStSpeedConfigOrder', data)
}
// 查询能量
export const queryWaitHourAmount = () => {
  return request('GET', `/stUser/queryWaitHourAmount`, null)
}
// 领取能量
export const receiveWaitHourAmount = () => {
  return request('GET', `/stUser/receiveWaitHourAmount`, null)
}

// 用户点击获得金币  clickNumber
export const userClick = (data) => {
  return request('POST', '/stUser/userClick', data)
}

// 获取用户能量
export const getStUserEnergyAmount = () => {
  return request('GET', '/stUser/getStUserEnergyAmount', null)
}

// 学习分类List
export const getStTaskClass = () => {
  return request('GET', '/stTaskClassif/list', null)
}

// 排行榜等级列表显示
export const getGradeList = () => {
  return request('GET', '/seniority/getSeniorityGradeConfigList', null)
}

// 用户个人排行榜 有分页?page=1&size=10
export const getUserSeniorityPage = (
  params
): Promise<ApiResponse<{ total: number; list: [] }>> => {
  return request('GET', `/seniority/userSeniorityPage`, params)
}

// 用户个人排行榜名次查询
export const getUserSeniority = (params) => {
  return request('GET', '/seniority/userSeniority', params)
}

// 团队排行榜 有分页?page=1&size=10
export const getTeamSeniorityPage = (
  params
): Promise<ApiResponse<{ total: number; list: [] }>> => {
  return request('GET', `/seniority/teamSeniorityPage`, params)
}

// 团队等级排行榜 有分页?page=1&size=10
export const getTeamgradeSeniorityPage = (
  params
): Promise<ApiResponse<{ total: number; list: [] }>> => {
  return request('GET', `/seniority/teamgradeSeniorityPage`, params)
}

// 创建或者加入团队
export const addTeam = (data) => {
  return request('POST', '/stTeam/addTeam', data)
}

// 退出团队
export const outTeam = () => {
  return request('POST', '/stTeam/outTeam', null)
}

// 查询其他团队信息
export const queryTeam = (data) => {
  return request('POST', '/stTeam/queryTeam', data)
}

// 查询个人团队信息
export const queryUserTeamInfo = () => {
  return request('POST', '/stTeam/queryUserTeamInfo', null)
}

// 购买星星单价
export const queryStartPrice = () => {
  return request('POST', '/stLotteryLog/buyPriceInfo', null)
}

// 购买星星
export const buyStar = (data) => {
  return request('POST', '/stLotteryLog/buy', data)
}

// 用户主动升级
export const userUpgrade = () => {
  return request('POST', '/stUser/userUpgrade', null)
}

// 盲盒信息参数
export const getBoxInfo = () => {
  return request('GET', '/box/getBoxInfo', null)
}

// 开启盲盒
export const openBox = (data) => {
  return request('POST', '/box/openBox', data)
}

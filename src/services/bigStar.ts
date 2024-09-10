import request from '@/utils/request'
import { ApiResponse } from '@/typings/request'

// 数藏大星星产品列表
export const getBacteriaConfig = () => {
  return request('GET', '/bacteria/configList', null)
}

// 购买数藏大星星产品
export const buyBacteria = (id) => {
  return request('GET', `/bacteria/buy/${id}`, null)
}

// 星星领取瓜分奖励记录
export const getLotteryPage = (
  params
): Promise<ApiResponse<{ total: number; list: [] }>> => {
  return request('GET', `/stLotteryLog/lotteryPage`, params)
}

// 星星领取统计
export const getLotteryStatistics = () => {
  return request('GET', `/stLotteryLog/lotteryStatistics`, null)
}

// 我的星星信息
export const userLotteryInfo = () => {
  return request('POST', `/stLotteryLog/userLotteryInfo`, null)
}

// 全网星星+全网矿池
export const allLotteryAndMin = () => {
  return request('POST', `/stLotteryLog/allLotteryAndMin`, null)
}

// 领取昨日瓜分奖励
export const receiveYesterdayAward = () => {
  return request('get', `/stLotteryLog/receiveYesterdayAward`, null)
}
// 计算昨日瓜分待领取数量
export const getCarveAmount = () => {
  return request('get', `/stLotteryLog/getCarveAmount`, null)
}

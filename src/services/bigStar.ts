import request from '@/utils/request'

// 数藏大星星产品列表
export const getBacteriaConfig = () => {
  return request('GET', '/bacteria/configList', null)
}

// 购买数藏大星星产品
export const buyBacteria = (id) => {
  return request('GET', `/bacteria/buy/${id}`, null)
}

import request from '@/utils/request'

// 查询个人团队接口
export const getFriendListApi = () => {
  return request('POST', '/stTeam/queryUserTeamInfo', null, false)
}

//查询其他团队信息
export const getOtherTeamInfoApi = (data: any) => {
  return request('POST', '/stTeam/queryTeam', data, false)
}
//创建团队
export const createTeamApi = (data: any) => {
  return request('POST', '/stTeam/addTeam', data, false)
}

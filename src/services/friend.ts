import request from '@/utils/request'


// 查询个人团队接口
export const getFriendListApi = (data: any) => {
    return request('POST', '/stTeam/queryUserTeamInfo', data, false)
}

import request from '@/utils/request'

// 任务列表?page=1&size=10
export const taskListPage = (data) => {
  return request('GET', `/stDailyTask/taskListPage`, data)
}

// 个人完成任务列表?page=1&size=10
export const userTaskListPage = (data) => {
  return request('GET', `/stDailyTask/userTaskListPage`, data)
}

// 任务获得统计
export const taskTatistics = () => {
  return request('GET', `/stDailyTask/taskTatistics`, null)
}

// 做任务
export const addTask = (id) => {
  return request('GET', `/stDailyTask/addUserTask/${id}`, null)
}

// 领取任务奖励
export const receiveSStudyStTask = (data) => {
  return request('GET', `/stDailyTask/receiveSStudyStTask`, data)
}

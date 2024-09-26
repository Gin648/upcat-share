import request from "@/utils/request";

export const subordinateList = (params) => {
    console.log('params', params)
    return request('GET', `/ally/userAllyPage`, params, false)
}

export const allyHomeInfo = () => {
    return request('GET', `/ally/allyHomeInfo`, null, false)
}

export const allyHomeStatisticsInfo = (data) => {
    return request('POST', `/ally/allyHomeStatisticsInfo`, data, false)
}
//

export const resolve = (data) => {
    return request('POST', `/ally/resolve`, data, false)
}
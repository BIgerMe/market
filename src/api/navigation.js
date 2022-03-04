import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/z/nav/getList',
    method: 'get',
    data,
  })
}
export function getGroupList(data) {
  return request({
    url: '/z/nav/getGroupList',
    method: 'get',
    params:data,
  })
}
export function getGroupDetail(data) {
  return request({
    url: '/z/nav/getGroupDetail',
    method: 'get',
    params:data,
  })
}

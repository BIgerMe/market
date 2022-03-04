import request from '@/utils/request'

export function parentLists() {
  return request({
    url: '/z/baby/parentLists',
    method: 'get',
  })
}

export function createParent(data) {
  return request({
    url: '/z/baby/createParent',
    method: 'post',
    data,
  })
}

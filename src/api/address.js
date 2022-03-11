import request from '@/utils/request'
//省市区
export async function pca(){
  return request({
    url: '/z/address/pca',
    method: 'get',
  })
}
//用户地址信息
export function list() {
  return request({
    url: '/z/address/list',
    method: 'get',
  })
}
//用户地址信息
export function add(data) {
  return request({
    url: '/z/address/add',
    method: 'post',
    data
  })
}
//用户地址信息
export function del(data) {
  return request({
    url: '/z/address/del',
    method: 'post',
    data
  })
}


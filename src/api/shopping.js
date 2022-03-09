import request from '@/utils/request'

//商品分类列表
export function categoryList() {
  return request({
    url: '/z/shopping/categoryList',
    method: 'get',
  })
}
//商品列表
export function goodsLists(data) {
  return request({
    url: '/z/shopping/goodsLists',
    method: 'get',
    params:data
  })
}
export function goodsDetail(data) {
  return request({
    url: '/z/shopping/goodsDetail',
    method: 'get',
    params:data
  })
}




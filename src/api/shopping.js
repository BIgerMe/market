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
//加入购物车
export function addCart(data) {
  return request({
    url: '/z/cart/addCart',
    method: 'post',
    data
  })
}
//单独商品购物车详情
export function cartDetail(data) {
  return request({
    url: '/z/cart/cartDetail',
    method: 'get',
    params:data
  })
}
//购物车列表
export function cartList() {
  return request({
    url: '/z/cart/cartList',
    method: 'get',
  })
}




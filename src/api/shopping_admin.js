import request from '@/utils/request'

/*新增商品*/
export function createGoods(data) {
  return request({
    url: '/z/shoppingAdmin/createGoods',
    method: 'post',
    data
  })
}
//更新商品
export function updateGoods(data) {
  return request({
    url: '/z/shoppingAdmin/updateGoods',
    method: 'post',
    data
  })
}
//商品分类列表
export function categoryList() {
  return request({
    url: '/z/shoppingAdmin/categoryList',
    method: 'get',
  })
}
//商品列表
export function goodsLists(data) {
  return request({
    url: '/z/shoppingAdmin/goodsLists',
    method: 'get',
    params:data
  })
}


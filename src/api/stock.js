import request from '@/utils/request'

export function StockBasicDetail(data) {
  return request({
    url: '/z/stock/stockbasicdetail',
    method: 'get',
    params: { data },
  })
}
export function Daily(data) {
  return request({
    url: '/z/stock/daily',
    method: 'get',
    params: { data },
  })
}
export function Weekly(data) {
  return request({
    url: '/z/stock/weekly',
    method: 'get',
    params: { data },
  })
}
export function Monthly(data) {
  return request({
    url: '/z/stock/monthly',
    method: 'get',
    params: { data },
  })
}
export function ShareFloatList(data) {
  return request({
    url: '/z/stock/sharefloatlist',
    method: 'get',
    params: { data },
  })
}
export function StockBasicList(data) {
  return request({
    url: '/z/stock/stockbasiclist',
    method: 'get',
    params: { data },
  })
}
export function stkHolderNumber(data) {
  return request({
    url: '/z/stock/stkholdernumber',
    method: 'get',
    params: { data },
  })
}

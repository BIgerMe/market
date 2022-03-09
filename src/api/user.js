import request from '@/utils/request'

export async function wxLogin(data){
  return request({
    url: '/z/user/wxLogin',
    method: 'post',
    data,
  })
}

export async function login(data) {
  return request({
    url: '/z/user/login',
    method: 'post',
    data,
  })
}

export function getUserInfo(accessToken) {
  return request({
    url: '/z/user/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/z/user/logout',
    method: 'post',
  })
}

export function register() {
  return request({
    url: '/z/user/register',
    method: 'post',
  })
}

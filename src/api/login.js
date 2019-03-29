import request from '@/utils/request'

export function loginByUsername(username, password) {
  return request({
    url: '/login/login',
    method: 'post',
    params: { username, password }
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}


import request from '@/utils/request'

export function queryList({ url, method }, pageParam = { pageSize: 15, pageNum: 1 }, queryParam = {}) {
  return request({
    url: url,
    method: method,
    params: pageParam,
    data: queryParam
  })
}

export function submit(url, formParam) {
  return request({
    url: url,
    method: 'post',
    data: formParam
  })
}
export function deleteByIds(url, ids) {
  return request({
    url: url,
    method: 'post',
    params: { ids: ids + ',' }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
export function isLogin() {
  return request({
    url: '/login',
    method: 'post'
  })
}

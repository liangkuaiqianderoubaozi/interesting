import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function getParamByCookie(key) {
  return Cookies.get(key)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function setCookies(key, token) {
  return Cookies.set(key, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

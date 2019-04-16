import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

const errorCodeMessage = {
  504: '服务器相应超时',
  404: '请求路径不存在',
  400: '请求路径错误',
  401: '用户已退出系统'
}

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (config.url.indexOf('logout') > -1) {
      config.headers['X-Requested-With'] = 'XMLHttpRequest'
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response, error => {
    let message = errorCodeMessage[error.response.status]
    if (!message) {
      message = '发生错误,请查看网络排查具体原因'
    }

    Message({ message: message, type: 'error', duration: 5 * 1000 })

    return Promise.reject(error)
  })

export default service

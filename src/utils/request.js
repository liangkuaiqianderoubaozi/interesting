import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

const errorCodeMessage = {
  504: '服务器相应超时',
  404: '请求路径不存在',
  400: '请求路径错误'
}

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = getToken()
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
    if (!message) { message = '发生错误,请查看网络排查具体原因' }

    Message({ message: message, type: 'error', duration: 5 * 1000 })

    return Promise.reject(error)
  })

export default service

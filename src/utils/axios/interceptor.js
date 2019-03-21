/**
 * axios全局拦截
 * */
export function interceptor(axiosInstance, url) {
  // 请求拦截
  axiosInstance.interceptors.request.use(config => {
    console.info(config)
    return config
  }, error => {
    return Promise.reject(error)
  })
  // 响应拦截
  axiosInstance.interceptors.response.use(res => {
    const { data, status } = res
    return { data, status }
  }, error => {
    console.error(error)
    return Promise.reject(error)
  })
}

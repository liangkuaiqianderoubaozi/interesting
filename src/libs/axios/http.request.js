import axios from "axios"

class HttpRequest {

    /**
     * 拦截
     * */
    interceptors(instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            console.info(config)
            return config
        }, error => {
            console.info(33333)
            return Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use(res => {
            console.info(res)
            return {data, status}
        }, error => {
            return Promise.reject(error)
        })
    }

    go(options) {
        const instance = axios.create()
        this.interceptors(axios, options.url)
        return instance(options)
    }
}

export default HttpRequest

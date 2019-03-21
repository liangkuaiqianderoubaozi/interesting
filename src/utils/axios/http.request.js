import axios from 'axios'
import { interceptor } from './interceptor'

class HttpRequest {
  send(options) {
    const instance = axios.create()
    interceptor(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest

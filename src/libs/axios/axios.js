
import HttpRequest from "./http.request"
import config from 'root/config/index'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro


export default new HttpRequest();


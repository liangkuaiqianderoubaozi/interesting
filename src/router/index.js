import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers.js'

Vue.use(Router)

/*
*  hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。
*
*  history: 依赖 HTML5 History API 和服务器配置。查看 HTML5 History 模式。
*
*  abstract: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式
* */
const router = new Router({
    routes,
    mode: 'history'
})


router.beforeEach((to, from, next) => {
    next()
})

router.afterEach(to => {
})
// 就要用到export default命令，为模块指定默认输出。
export default router

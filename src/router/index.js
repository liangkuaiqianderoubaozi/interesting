import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers.js'

Vue.use(Router)

const router = new Router({
    routes,
    mode: 'history'
})


router.beforeEach((to, from, next) => {
    next()
})

router.afterEach(to => {
    console.info(to)
   console.info(111)
})

export default router

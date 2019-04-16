import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import projectConfig from '@/projectConfig'
import { isLogin } from '@/api/baseApi'

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  isLogin().then(response => {
    if (response.data.success) {
      /* 菜单未加载过*/
      if (!store.routerGenerate) {
        // 根据roles权限生成可访问的路由表
        store.dispatch('GENERATE_ROUTERS').then(accessRoutes => {
          /* 保存路由路径和按钮的关系 */
          store.dispatch('SET_RESOURCES_BUTTON', accessRoutes).then(() => {
            router.addRoutes(accessRoutes) // 动态添加可访问路由表
            NProgress.done()
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        })
      }
    } else {
      store.dispatch('SET_ROUTER_GENERATE', false).then(() => {
        window.location.href = response.data.authenticateUrl + '?authenticateUrl=' + window.location.origin + projectConfig.indexUrl
      })
    }
    next()
  })
})

router.afterEach((to, from) => {
  store.dispatch('SET_RESOURCES_PATH', to.path)
  NProgress.done()
})


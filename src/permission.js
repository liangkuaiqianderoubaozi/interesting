import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import projectConfig from '@/projectConfig' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

var getMenuFlag // 用来获取后台拿到的路由

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  /* 获取url的Jsid*/
  const token = getQueryVariable('jsid')
  if (token && !getToken()) {
    store.dispatch('LoginSuccess', token)
  }
  if (!getToken()) {
    window.location.href = projectConfig.authUrl + '/getCurrentUser?project_url=' + window.location.origin + projectConfig.indexUrl
  } else {
    if (!getMenuFlag) { // 不加这个判断，路由会陷入死循环
      // 根据roles权限生成可访问的路由表
      store.dispatch('GenerateRoutes').then(accessRoutes => {
        /* 保存路由路径和按钮的关系 */
        store.dispatch('setResourceButtons', accessRoutes).then(() => {
          router.addRoutes(accessRoutes) // 动态添加可访问路由表
          NProgress.done()
          getMenuFlag = true
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      })
    } else {
      next()
    }
  }
})

router.afterEach((to, from) => {
  store.dispatch('setRouterPath', to.path)
  NProgress.done() // finish progress bar
})

function getQueryVariable(variable) {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return (false)
}


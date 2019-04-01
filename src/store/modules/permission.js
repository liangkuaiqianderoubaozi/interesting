import { asyncRoutes, constantRoutes } from '@/router'
import request from '@/utils/request'
import Layout from '@/views/layout/Layout'

import projectConfig from '@/projectConfig'

// /**
//  * 通过meta.role判断是否与当前用户权限匹配
//  * @param roles
//  * @param route
//  */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

function findOts(data) {
  if (data.name === projectConfig.name) {
    return data
  }

  if (data.children) {
    let otsProject = null
    data.children.forEach((item) => {
      otsProject = findOts(item)
    })
    return otsProject
  }
}

function registerComponent(data, id) {
  if (!data.url) { data.url = '/' + data.id }

  if (data.pid === id) {
    data.component = Layout
  } else {
    // todo 组件路径必须唯一
    data.component = () => import('@/views/modules/demo/index')
  }
  data.path = data.url
  data.meta = { title: 'demo', icon: 'table' }

  if (data.children) {
    for (var i = data.children.length - 1; i >= 0; i--) {
      if (data.children[i].type !== 'button') {
        registerComponent(data.children[i], id)
      } else {
        if (data.buttons === undefined) { data.buttons = [] }
        data.buttons.push(data.children[i])
        data.children.splice(i, 1)
      }
    }
  }
}
const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        request({
          url: projectConfig.resourcesUrl,
          method: 'post'
        }).then(response => {
          /* 找到ots项目*/
          const otsProject = findOts(response.data.resources[0])
          /* 注册组件*/
          registerComponent(otsProject, otsProject.id)

          let menus = otsProject

          // 是否开启demo
          if (projectConfig.openDemo) {
            menus = otsProject.children.concat(asyncRoutes)
          }

          // 提交到vuex
          commit('SET_ROUTES', menus)
          resolve(menus)
        })
      })
    }
  }
}

export default permission

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

function findOts(data, project) {
  if (!data.children) {
    return
  }
  for (var i = 0; i < data.children.length; i++) {
    if (data.children[i].code === projectConfig.code) {
      project = data.children[i]
      break
    }
    if (data.children[i]) {
      findOts(data.children[i], project)
    }
  }
  return project
}

function registerComponent(data, id) {
  if (!data.url) {
    data.url = '/' + data.id
  }

  if (data.pid === id) {
    data.component = Layout
  } else {
    data.component = () => import(`@/views/modules${data.url}.vue`)
  }
  data.path = data.url
  data.meta = { title: data.name, icon: 'table' }

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
  } else {
    data.children = []
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
    GENERATE_ROUTERS({ commit }) {
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

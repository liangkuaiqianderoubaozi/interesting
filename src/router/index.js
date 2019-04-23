import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/modules/common/layout/Layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/modules/common/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/modules/common/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/modules/common/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export const asyncRoutes = [
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/modules/common/svg-icons/index'),
        name: 'Icons',
        meta: { title: '图标', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/icodddn',
    component: Layout,
    children: [
      {
        path: 'edit2',
        component: () => import('@/views/modules/demo/edit2'),
        name: 'ddddd',
        meta: { title: 'edit2', noCache: true },
        hidden: true
      }
    ],
    hidden: true
  },
  // 捕获所有/ 404未找到路线
  { path: '*', redirect: '/404', hidden: true }
]

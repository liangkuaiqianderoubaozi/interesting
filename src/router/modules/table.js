/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: '表格',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamicTable/index'),
      name: 'DynamicTable',
      meta: { title: '动态表格' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inlineEditTable'),
      name: 'InlineEditTable',
      meta: { title: '表格内编辑' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complexTable'),
      name: 'ComplexTable',
      meta: { title: '综合表格' }
    }
  ]
}
export default tableRouter
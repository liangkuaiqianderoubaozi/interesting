/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const Demo = {
  path: '/demo',
  component: Layout,
  redirect: '/demo/complex-table',
  meta: {
    title: 'demo',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/demo/index'),
      name: 'DynamicTable',
      meta: { title: 'demo' }
    }
  ]
}
export default Demo

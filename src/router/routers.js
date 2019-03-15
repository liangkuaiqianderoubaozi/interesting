import demo from '../views/demo.vue'
import index from '../views/index.vue'


export default [
    {
        path: '/',
        name: 'main',
        component: demo
    },
    {
        path: '/index',
        name: 'index',
        component: index
    }
]
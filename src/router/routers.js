import dictIndex from '../views/modules/dict/index.vue'

import index from '../views/index.vue'


export default [
    {
        path: '/',
        component: index,
        children: [
            {
                path: '/demo',
                name: 'demo',
                component: dictIndex,
            },
        ]
    },
]
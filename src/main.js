import Vue from 'vue'
import router from './router'


import index from './index'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

import componentsConfig from './components/config'

Vue.config.productionTip = false

/*注册iview*/
Vue.use(iView)

/*注册自定义组件*/
Vue.use(componentsConfig)

new Vue({
    el: '#app',
    router,
    render: h => h(index)
})
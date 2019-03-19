import Vue from 'vue'
import router from './router'
import root from './root'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import componentsRegistryFactory from './components/componentsRegistryFactory'

Vue.config.productionTip = false

/*注册iview*/
Vue.use(iView)

/*注册自定义组件*/
Vue.use(componentsRegistryFactory)

new Vue({
    router,
    render: h => h(root)
}).$mount('#app')
import time from 'jt-time'
import consts from '@/utils/consts'
import helpers from '@/utils/helpers/base'
import auth from '@/utils/auth'

import dTable from '@/components/table/d-table'
import dSelect from '@/components/select/d-select'

/*
* 组件注册中心
* */
const components = {
  'd-table': dTable,
  'd-select': dSelect
}

export default {
  install: function(Vue, option) {
    Vue.prototype.$time = time
    Vue.prototype.$consts = consts
    Vue.prototype.$helpers = helpers
    Vue.prototype.$auth = auth

    Vue.filter('time', val => time.getTime(val))
    Vue.filter('date', val => time.getDate(val))

    Object.keys(components).forEach((key) => {
      Vue.component(key, components[key])
    })
  }
}

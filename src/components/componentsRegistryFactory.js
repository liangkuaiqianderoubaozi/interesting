import dTable from "./table/customTable"
import dSelect from "./base/select/index.vue"

/*
* 组件注册中心
* */
const components = {
    'd-table': dTable,
    'd-select': dSelect
};


export default {
    install: function (Vue, option) {
        Object.keys(components).forEach((key) => {
            Vue.component(key, components[key]);
        })
    }
}

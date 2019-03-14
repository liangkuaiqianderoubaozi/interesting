import dTable from "./table/customTable"
import dSelect from "./base/baseSelect.vue"




const components = {
   'd-table': dTable,
   'd-select': dSelect,
};

const install = function (Vue, opts = {}) {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key]);
    })
}

export default install
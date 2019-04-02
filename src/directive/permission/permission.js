
import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    let currentRouterButton = {}
    store.getters.routerButtonsMapping.filter((item) => {
      if (item.routerMapping === store.getters.routerPath) { currentRouterButton = item }
    })

    // 菜单下没有一个按钮，或者当前菜单下面的按钮没有这个时
    if (!currentRouterButton.buttons || (currentRouterButton.buttons.indexOf(binding.value) === -1)) {
      return el.parentNode && el.parentNode.removeChild(el)
    }
  }
}

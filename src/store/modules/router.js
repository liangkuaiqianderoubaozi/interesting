function createButtonsMapping(data, array) {
  if (data.buttons) {
    const buttonMapping = {
      routerMapping: data.path,
      buttons: data.buttons.map((item) => {
        return item.name
      })
    }
    array.push(buttonMapping)
  }

  if (data.children) {
    data.children.forEach((item) => {
      createButtonsMapping(item, array)
    })
  }
}

const router = {
  state: {
    routerButtonsMapping: [],
    routerPath: ''
  },
  mutations: {
    SET_ROUTER_BUTTON_MAPPING: (state, routerButtonsMapping) => {
      state.routerButtonsMapping = routerButtonsMapping
    },
    SET_ROUTER_PATH: (state, routerPath) => {
      state.routerPath = routerPath
    }
  },
  actions: {
    setResourceButtons({ commit }, resources) {
      var buttonsMapping = []
      resources.forEach((item) => {
        createButtonsMapping(item, buttonsMapping)
      })
      commit('SET_ROUTER_BUTTON_MAPPING', buttonsMapping)
    },
    setRouterPath({ commit }, path) {
      commit('SET_ROUTER_PATH', path)
    }
  }
}

export default router

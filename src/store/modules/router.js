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
    routerPath: '',
    routerGenerate: Boolean
  },
  mutations: {
    SET_ROUTER_BUTTON_MAPPING: (state, routerButtonsMapping) => {
      state.routerButtonsMapping = routerButtonsMapping
    },
    SET_ROUTER_PATH: (state, routerPath) => {
      state.routerPath = routerPath
    },
    SET_ROUTER_GENERATE: (state, routerGenerate) => {
      state.routerGenerate = routerGenerate
    }
  },
  actions: {
    SET_RESOURCES_BUTTON({ commit }, resources) {
      var buttonsMapping = []
      resources.forEach((item) => {
        createButtonsMapping(item, buttonsMapping)
      })
      /* 是否生成了菜单*/
      commit('SET_ROUTER_GENERATE', true)
      commit('SET_ROUTER_BUTTON_MAPPING', buttonsMapping)
    },
    SET_ROUTER_GENERATE({ commit }, flag) {
      commit('SET_ROUTER_GENERATE', flag)
    },
    SET_RESOURCES_PATH({ commit }, path) {
      commit('SET_ROUTER_PATH', path)
    }
  }
}

export default router

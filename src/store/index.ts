import { createStore } from 'vuex'

export default createStore({
  state: {
    breadcrumbs: []
  },
  getters: {
  },
  mutations: {
    updateBreadcrumbs(state, value) {
      state.breadcrumbs = value
    }
  },
  actions: {
  },
  modules: {
  }
})

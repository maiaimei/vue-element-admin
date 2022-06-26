import { createStore } from 'vuex'

export default createStore({
  state: {
    breadcrumbs: [],
    isExpandFormItem: false
  },
  getters: {
  },
  mutations: {
    UPDATEBREADCRUMBS(state, value) {
      state.breadcrumbs = value
    },
    UPDATEISEXPANDFORMITEM(state) {
      state.isExpandFormItem = !state.isExpandFormItem
    }
  },
  actions: {
  },
  modules: {
  }
})

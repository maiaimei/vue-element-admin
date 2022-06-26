import { MenuItem } from '@/types'
import { createStore } from 'vuex'

export default createStore({
  state: {
    breadcrumbs: [],
    isExpandFormItem: false,
    activeTab: '1',
    openTabs: [] as Array<{ id: string, title: string, path: string }>
  },
  getters: {
  },
  mutations: {
    UPDATEBREADCRUMBS(state, value) {
      state.breadcrumbs = value
    },
    UPDATEISEXPANDFORMITEM(state) {
      state.isExpandFormItem = !state.isExpandFormItem
    },
    ADDOPENTABS(state, payload: { id: string, title: string, path: string }) {
      state.activeTab = payload.id
      const haveFlag = state.openTabs.some(item => {
        return item.id === payload.id
      })
      if (!haveFlag) {
        state.openTabs.push(payload)
      }
    },
    UPDATEOPENTABS(state, payload: Array<{ id: string, title: string, path: string }>) {
      state.openTabs = payload
    },
    DELETEOPENTABS(state, payload: string) {
      state.openTabs = state.openTabs.filter((item) => {
        return item.id !== payload
      })
    },
    UPDATEACTIVETAB(state, payload: string) {
      state.activeTab = payload
    }
  },
  actions: {
  },
  modules: {
  }
})

import { TabItem } from '@/types'
import { createStore } from 'vuex'

export default createStore({
  state: {
    activeMenu: '',
    breadcrumbs: [],
    activeTab: 'HomeView',
    openTabs: [
      {
        name: 'HomeView',
        title: '首页',
        path: '/'
      }
    ] as Array<TabItem>
  },
  getters: {
  },
  mutations: {
    UPDATEACTIVEMENU(state, value) {
      state.activeMenu = value
    },
    UPDATEBREADCRUMBS(state, value) {
      state.breadcrumbs = value
    },
    ADDOPENTABS(state, payload: TabItem) {
      state.activeTab = payload.name
      const haveFlag = state.openTabs.some(item => {
        return item.name === payload.name
      })
      if (!haveFlag) {
        state.openTabs.push(payload)
      }
    },
    UPDATEOPENTABS(state, payload: Array<TabItem>) {
      state.openTabs = payload
    },
    DELETEOPENTABS(state, payload: string) {
      state.openTabs = state.openTabs.filter((item) => {
        return item.name !== payload
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

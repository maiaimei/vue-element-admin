<template>
  <el-scrollbar :style="{ height: '100vh' }">
    <el-container :style="{ minHeight: '100vh' }">
      <el-aside class="sidebar" v-bind:class="{ 'sidebar-collapse': isCollapseSidebar }">
        <el-header class="logo">
          <img src="@/assets/logo.png">
          <h1>Element Admin</h1>
        </el-header>
        <el-scrollbar class="menu-container">
          <el-menu :router="true" :default-active="activeMenu" :collapse="isCollapseSidebar"
            :collapse-transition="false" :unique-opened="true">
            <menu-tree />
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="float-left toggle-sidebar">
            <el-icon @click="toogleSidebar">
              <Fold v-if="!isCollapseSidebar" />
              <Expand v-if="isCollapseSidebar" />
            </el-icon>
          </div>
          <div class="float-left breadcrumb-container">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="(breadcrumb, index) in breadcrumbs" :key="index"
                :to="{ path: breadcrumb.path }">
                {{ breadcrumb.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="float-right header-toolbar">
            <a href="javascript:" title="全屏" @click="onToggleFullscreen()">
              <i class="iconfont" :class="{ 'icon-fullscreen': !fullscreen, 'icon-fullscreen-exit': fullscreen }"></i>
            </a>
            <el-dropdown @command="onClickAvatar">
              <span class="el-dropdown-link">
                <i class="iconfont icon-avatar"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                  <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <a href="javascript:" @click="drawer = true">
              <i class="iconfont icon-setting"></i>
            </a>
            <el-drawer v-model="drawer" size="20%" :with-header="false">
              <span>Hi there!</span>
            </el-drawer>
          </div>
          <div class="clear"></div>
        </el-header>
        <el-main>
          <el-tabs type="card" v-model="activeTab" @tab-click="clickTab" @tab-remove="removeTab" closable>
            <el-tab-pane v-for="item in openTabs" :key="item.name" :name="item.name" :label="item.title">
            </el-tab-pane>
          </el-tabs>
          <el-scrollbar class="main-container">
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { RouteLocationMatched, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox, TabsPaneContext } from 'element-plus'
import { toggleFullscreen } from '@/utils/dom.util'
import MenuTree from './MenuTree.vue'
import { TabItem } from '@/types'

const store = useStore()
const router = useRouter()

const activeMenu = ref<string>(router.currentRoute.value.path)
const isCollapseSidebar = ref<boolean>(false)
const fullscreen = ref<boolean>(false)
const drawer = ref<boolean>(false)

// 从 vuex 中读取 breadcrumbs
const breadcrumbs = computed(() => store.state.breadcrumbs)

// 获取面包屑
const initBreadcrumbs = () => {
  const arr = []
  const matched: RouteLocationMatched[] = router.currentRoute.value.matched
  arr.push({ path: '/', title: '首页' })
  for (let i = 0; i < matched.length; i++) {
    const item = matched[i]
    if (item.name !== 'MasterLayout' && item.name !== 'HomeView') {
      arr.push({ path: item.path, title: item.meta.title })
    }
  }
  if (arr.length !== 1) {
    store.commit('UPDATEBREADCRUMBS', arr)
  } else {
    store.commit('UPDATEBREADCRUMBS', [])
  }
}

const initActiveTab = () => {
  const matched: RouteLocationMatched[] = router.currentRoute.value.matched
  const item = matched[matched.length - 1]
  if (item.name !== 'HomeView') {
    store.commit('ADDOPENTABS', { name: item.name, title: item.meta.title, path: item.path })
  }
}

// 监听路由
watch(() => router.currentRoute.value.matched, () => {
  initBreadcrumbs()
  initActiveTab()
}, { immediate: true, deep: true })

// 切换全屏
const onToggleFullscreen = () => {
  fullscreen.value = toggleFullscreen(fullscreen.value)
}

// 点击头像
const onClickAvatar = (command: string) => {
  switch (command) {
    case 'personal': {
      break
    }
    case 'logout': {
      ElMessageBox.confirm(
        '您确认要退出登录吗？',
        '注销系统',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          localStorage.removeItem('isAuthenticated')
          ElMessage.success('注销成功')
          router.replace('/login')
        })
      break
    }
    default: {
      break
    }
  }
}

// 当前激活的标签
const activeTab = computed({
  get() {
    return store.state.activeTab
  },
  set(value) {
    store.commit('UPDATEACTIVETAB', value)
  }
})

// 目前打开的标签
const openTabs = computed({
  get() {
    return store.state.openTabs
  },
  set(value) {
    store.commit('UPDATEOPENTABS', value)
  }
})

// 关闭标签
const removeTab = (targetName: string) => {
  const tabs = openTabs.value as Array<TabItem>
  if (tabs.length === 1) {
    // 保留第一个标签
    return
  }
  let activeName = activeTab.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }
  activeTab.value = activeName
  openTabs.value = tabs.filter((tab) => tab.name !== targetName)
  updateRoute(activeName)
}

// 点击标签
const clickTab = (pane: TabsPaneContext, ev: Event) => {
  const tab = JSON.parse(JSON.stringify(pane))
  updateRoute(tab.props.name)
}

// 更新路由
const updateRoute = (activeName: string) => {
  const tabs = openTabs.value as Array<TabItem>
  const tab = tabs.find(item => item.name === activeName)
  if (tab !== undefined) {
    const tabJson = JSON.parse(JSON.stringify(tab))
    router.push(tabJson.path)
  }
}

const toogleSidebar = () => {
  isCollapseSidebar.value = !isCollapseSidebar.value
}

</script>

<style scoped lang="scss">
</style>

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
            <el-icon @click="isCollapseSidebar = !isCollapseSidebar">
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
        <el-scrollbar class="main-container">
          <el-main>
            <el-card>
              <el-tabs type="card" v-model="activeTab" @tab-click="clickTab" @tab-remove="removeTab" closable>
                <el-tab-pane v-for="item in openTabs" :key="item.id" :name="item.id" :label="item.title">
                </el-tab-pane>
              </el-tabs>
              <router-view v-slot="{ Component }">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </router-view>
            </el-card>
          </el-main>
        </el-scrollbar>
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

const store = useStore()
const router = useRouter()

const activeMenu = ref<string>(router.currentRoute.value.path)
const isCollapseSidebar = ref<boolean>(false)
const fullscreen = ref<boolean>(false)
const drawer = ref<boolean>(false)

const getBreadcrumbs = () => {
  const arr = []
  const matched: RouteLocationMatched[] = router.currentRoute.value.matched
  arr.push({ path: '/', title: '首页' })
  for (let i = 0; i < matched.length; i++) {
    const item = matched[i]
    if (item.name !== 'MasterLayout') {
      arr.push({ path: item.path, title: item.meta.title })
    }
  }
  return arr
}

const onToggleFullscreen = () => {
  fullscreen.value = toggleFullscreen(fullscreen.value)
}

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

// 从 vuex 中读取 breadcrumbs
const breadcrumbs = computed(() => store.state.breadcrumbs)

// 监听路由变化，更新 vuex 中的 breadcrumbs
watch(() => router.currentRoute.value.matched, () => {
  store.commit('UPDATEBREADCRUMBS', getBreadcrumbs())
}, { immediate: true, deep: true })

const activeTab = computed({
  get() {
    return store.state.activeTab
  },
  set(value) {
    store.commit('UPDATEACTIVETAB', value)
  }
})

const openTabs = computed({
  get() {
    return store.state.openTabs
  },
  set(value) {
    store.commit('UPDATEOPENTABS', value)
  }
})

const removeTab = (targetId: string) => {
  const tabs = openTabs.value
  if (tabs.length === 1) {
    // 保留第一个标签
    return
  }
  let activeId = activeTab.value
  if (activeId === targetId) {
    tabs.forEach((tab, index) => {
      if (tab.id === targetId) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeId = nextTab.id
        }
      }
    })
  }
  activeTab.value = activeId
  openTabs.value = tabs.filter((tab) => tab.id !== targetId)
  updateRoute(activeId)
}

const clickTab = (pane: TabsPaneContext, ev: Event) => {
  const tab = JSON.parse(JSON.stringify(pane))
  updateRoute(tab.props.name)
}

const updateRoute = (activeId: string) => {
  const tab = openTabs.value.find(item => item.id === activeId)
  if (tab) {
    const tabJson = JSON.parse(JSON.stringify(tab))
    router.push(tabJson.path)
  }
}

const isHome = () => {
  //
}

</script>

<style scoped lang="scss">
</style>

<template>
  <template v-for="(item, index) in menus" :key="index">
    <template v-if="item.hasAuthority">
      <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
        <template #title><span>{{ item.title }}</span></template>
        <menu-sub-tree :menus="item.children" />
      </el-sub-menu>
      <el-menu-item v-else :index="item.path">
        <span>{{ item.title }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
import MenuSubTree from './MenuSubTree.vue'
import _ from 'lodash'
import { MenuItem } from '@/types'
import menus from '@/config/menu'

const user = JSON.parse(localStorage.getItem('user') || '')
const userMenus = user.menus as Array<string>

const checkAuthority = (ms: Array<MenuItem>) => {
  _.forEach(ms, m => {
    if (userMenus.includes(m.path)) {
      m.hasAuthority = true
    } else {
      m.hasAuthority = false
    }
    if (m.children !== undefined && !_.isEmpty(m.children)) {
      checkAuthority(m.children)
    }
  })
}
checkAuthority(menus)
</script>

<style scoped lang="scss">
</style>

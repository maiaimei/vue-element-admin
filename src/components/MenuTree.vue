<template>
  <template v-for="(item, index) in menus" :key="index">
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
      <template #title><span>{{ item.title }}</span></template>
      <menu-sub-tree :menus="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.path">
      <span>{{ item.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { meuns } from '@/api'
import { MenuItem } from '@/types'
import MenuSubTree from './MenuSubTree.vue'

const menus = ref<MenuItem[]>([])
meuns.findAll().then(res => { menus.value = res.data.data })
</script>

<style scoped lang="scss">
</style>

<template>
  <template v-for="(item, index) in menus" :key="index">
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
      <template #title>
        <span>{{ item.title }}</span>
      </template>
      <menu-sub-tree :menus="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.path">
      <span>{{ item.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { IMenuItem } from '@/types'
defineProps<{
  menus: IMenuItem[],
}>()
</script>

<style scoped lang="scss">
</style>

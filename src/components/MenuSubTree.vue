<template>
  <template v-for="(item, index) in menus" :key="index">
    <template v-if="item.hasAuthority">
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
</template>

<script setup lang="ts">
import { MenuItem } from '@/types'
defineProps<{
  menus: MenuItem[],
}>()
</script>

<style scoped lang="scss">
</style>

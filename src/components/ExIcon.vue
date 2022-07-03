<template>
  <i v-if="iconfont" class="iconfont" :class="'icon-' + iconfont"></i>
  <el-icon v-if="icon">
    <Plus v-if="icon === 'Plus'" />
    <Edit v-if="icon === 'Edit'" />
    <Delete v-if="icon === 'Delete'" />
    <Download v-if="icon === 'Download'" />
    <Upload v-if="icon === 'Upload'" />
    <Setting v-if="icon === 'Setting'" />
    <List v-if="icon === 'List'" />
    <Document v-if="icon === 'Document'" />
    <Histogram v-if="icon === 'Histogram'" />
    <Menu v-if="icon === 'Menu'" />
    <Message v-if="icon === 'Message'" />
    <Avatar v-if="icon === 'Avatar'" />
    <CircleClose v-if="icon === 'CircleClose'" />
    <Star v-if="icon === 'Star'" />
  </el-icon>
</template>

<script setup lang="ts">
import {
  Plus,
  Edit,
  Delete,
  Download,
  Upload,
  Setting,
  List,
  Document,
  Histogram,
  Menu,
  Message,
  Avatar,
  CircleClose,
  Star
} from '@element-plus/icons-vue'

const props = defineProps({
  icon: {
    type: String
  },
  iconfont: {
    type: String
  }
})
</script>

<style scoped lang="scss">
</style>

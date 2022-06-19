<template>
  <el-result icon="warning" title="无权限访问" sub-title="抱歉~您无权限访问该资源！" class="error">
    <template #extra>
      <el-button type="primary" @click="backToHome">返回首页</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">
import { ComponentInternalInstance, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const backToHome = () => {
  proxy.$root.$router.replace('/')
}
</script>

<style scoped lang="scss">
</style>

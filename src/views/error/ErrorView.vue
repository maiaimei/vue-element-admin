<template>
  <el-result icon="error" title="服务器错误" sub-title="哎呀~页面遇到了一些问题，请稍后再试！" class="error">
    <template #extra>
      <el-button type="primary" @click="backToHome">返回首页</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">
import { ComponentInternalInstance, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const backToHome = () => {
  proxy?.$root?.$router.replace('/')
}
</script>

<style scoped lang="scss">
</style>

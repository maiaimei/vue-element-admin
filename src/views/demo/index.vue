<template>
  <child ref="childRef" :key="timer" :map="map" @addItem="addItem" />
  <el-divider />
  <input type="button" value="showMessage" @click="handleShowMessage" />
</template>

<script setup lang="ts">
import { HashMap } from '@/types'
import { ElMessage } from 'element-plus'
import { getCurrentInstance, onMounted, reactive, ref, watch } from 'vue'
import Child from './child.vue'

const childRef: any = ref(null)
let timer = new Date().getTime()
let currentInstance: any

onMounted(() => {
  currentInstance = getCurrentInstance()
})

const map = reactive<HashMap>({
  k1: 'v1',
  k2: 'v2'
})

const addItem = (key: string, value: string) => {
  map[key] = value
  // 重新渲染子组件
  timer = new Date().getTime()
}

const handleShowMessage = () => {
  // 调用子组件方法
  currentInstance.ctx.$refs.childRef.showMessage()
}

// 监听子组件属性
watch(() => childRef?.value?.message, () => {
  if (childRef?.value?.message) {
    ElMessage({
      message: childRef?.value?.message,
      type: 'success'
    })
  }
})
</script>

<style scoped lang="scss">
</style>

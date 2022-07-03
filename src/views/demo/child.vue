<template>
  <ul>
    <li v-for="(value, key) in map" :key="key">
      {{ key }}: {{ value }}
    </li>
  </ul>
  <input type="text" v-model="key" placeholder="please input key" />
  <input type="text" v-model="value" placeholder="please input value" />
  <input type="button" value="添加" @click="handleAddItem(key, value)" />

  <el-divider />
  {{ message }}
</template>

<script setup lang="ts">
import { HashMap } from '@/types'
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'

// 接收父组件传递的属性
const props = defineProps({
  map: {
    type: Object as () => HashMap,
    default: function () {
      return {}
    },
    require: true
  }
})

// 接收父组件传递的方法
const emit = defineEmits(['addItem'])

const key = ref('')
const value = ref('')
const message = ref('')

const handleAddItem = (key: string, value: string) => {
  message.value = `Add item success! key is ${key}, value is ${value}`
  // 调用父组件方法
  emit('addItem', key, value)
}

const showMessage = () => {
  ElMessageBox.alert(message.value, 'title', {
    confirmButtonText: 'I know'
  })
}

// 对外暴露属性或者方法
defineExpose({
  message,
  showMessage
})
</script>

<style scoped lang="scss">
</style>

<template>
  <div ref="echartRef" :style="{ height: height, width: width }"></div>
</template>

<script setup lang="ts">
import { ref, ComponentInternalInstance, getCurrentInstance, onMounted } from 'vue'
import * as echarts from 'echarts'
import { EChartsType } from 'echarts'
import useResize from '@/hooks/useResize'

const props = defineProps({
  width: {
    type: [Number, String],
    default: () => '100%'
  },
  height: {
    type: [Number, String],
    default: () => '300px'
  },
  option: {
    type: Object as () => any,
    defalut: {}
  }
})

let dom: HTMLElement
let echartInstance: EChartsType
const echartRef = ref()
const { proxy } = getCurrentInstance() as ComponentInternalInstance

onMounted(() => {
  dom = proxy?.$refs.echartRef as HTMLElement // 获取的DOM根节点
  if (dom !== null) {
    echartInstance = echarts.init(dom) // 初始化 echart
    echartInstance.setOption(props.option) // 绘制
  }
})

function resize() {
  console.log('resize chart')
  if (echartInstance !== null) {
    echartInstance.resize()
  }
}

// 暴露函数 （供hook调用）
defineExpose({
  resize
})

useResize()
</script>

<style scoped lang="scss">
</style>

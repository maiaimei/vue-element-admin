<template>
  <div ref="echartRef" :style="{ height: height, width: width }"></div>
</template>

<script setup lang="ts">
import { ref, ComponentInternalInstance, getCurrentInstance, onMounted, onActivated, onDeactivated, computed, watch } from 'vue'
import { useStore } from 'vuex'
import * as echarts from 'echarts'
import { EChartsType } from 'echarts'
import useResize from '@/hooks/useResize'

const store = useStore()

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

const isActivated = ref(true)
onActivated(() => {
  isActivated.value = true
})
onDeactivated(() => {
  isActivated.value = false
})

function resize() {
  if (echartInstance !== null && isActivated.value) {
    // 设置一定延时，否则收缩/展开侧边栏调整图表大小有问题
    setTimeout(() => {
      echartInstance.resize()
    }, 300)
  }
}

// 监听resizeChartTimer实时调整图表大小
const resizeChartTimer = computed(() => store.state.resizeChartTimer)
watch(() => resizeChartTimer.value, () => {
  resize()
})

// 暴露函数 （供hook调用）
defineExpose({
  resize
})

useResize()
</script>

<style scoped lang="scss">
</style>

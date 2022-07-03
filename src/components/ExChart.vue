<template>
  <div ref="echartRef" :style="{ height: height, width: width }" :class="{ hide: !visible }"></div>
</template>

<script setup lang="ts">
import { ref, ComponentInternalInstance, getCurrentInstance, onMounted, onActivated, onDeactivated, computed, watch } from 'vue'
import { useStore } from 'vuex'
import * as echarts from 'echarts'
import { EChartsType } from 'echarts'
import useResizeChart from '@/hooks/useResizeChart'

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
  dom = proxy?.$refs.echartRef as HTMLElement
  if (dom !== null) {
    echartInstance = echarts.init(dom)
    echartInstance.setOption(props.option)
  }
})

const isActivated = ref(true)
const visible = ref(true)
onActivated(() => {
  isActivated.value = true
  resizeChart()
})
onDeactivated(() => {
  isActivated.value = false
  visible.value = false
})

function resizeChart() {
  if (echartInstance !== null && isActivated.value) {
    // 设置一定延时，否则收缩/展开侧边栏调整图表大小有问题
    setTimeout(() => {
      echartInstance.resize()
      visible.value = true
    }, 300)
  }
}

// 监听resizeChartTimer实时调整图表大小
const resizeChartTimer = computed(() => store.state.resizeChartTimer)
watch(() => resizeChartTimer.value, () => {
  resizeChart()
})

// 暴露函数 （供hook调用）
defineExpose({
  resizeChart
})

useResizeChart()
</script>

<style scoped lang="scss">
.hide {
  visibility: hidden
}
</style>

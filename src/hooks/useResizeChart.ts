import { onBeforeUnmount, onMounted, getCurrentInstance, ComponentInternalInstance } from 'vue'

export default function () {
  let proxy: ComponentInternalInstance | null

  onMounted(() => {
    proxy = getCurrentInstance()
    window.addEventListener('resize', resizeChart)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart)
  })

  function resizeChart() {
    proxy?.exposed?.resizeChart()
  }
}

import { onBeforeUnmount, onMounted, getCurrentInstance, ComponentInternalInstance } from 'vue'

export default function () {
  let proxy: ComponentInternalInstance | null

  onMounted(() => {
    proxy = getCurrentInstance()
    window.addEventListener('resize', resize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
  })

  function resize() {
    proxy?.exposed?.resize()
  }
}

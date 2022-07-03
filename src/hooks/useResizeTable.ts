import { onBeforeUnmount, onMounted, getCurrentInstance, ComponentInternalInstance } from 'vue'

export default function () {
  let proxy: ComponentInternalInstance | null

  onMounted(() => {
    proxy = getCurrentInstance()
    window.addEventListener('resize', resizeTable)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeTable)
  })

  function resizeTable() {
    proxy?.exposed?.resizeTable()
  }
}

<template>
  <div style="margin-bottom: 20px">
    <el-button size="small" @click="addTab(activeTab)">
      add tab
    </el-button>
  </div>
  <el-tabs type="card" v-model="activeTab" @tab-remove="removeTab" closable>
    <el-tab-pane v-for="item in openTabs" :key="item.name" :name="item.name" :label="item.title">
      {{ item.content }}
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

let tabIndex = 2
const activeTab = ref('2')
const openTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content'
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content'
  }
])

const addTab = (targetName: string) => {
  const newTabName = `${++tabIndex}`
  openTabs.value.push({
    title: `New Tab ${tabIndex}`,
    name: newTabName,
    content: `New Tab content ${tabIndex}`
  })
  activeTab.value = newTabName
}

const removeTab = (targetName: string) => {
  const tabs = openTabs.value
  let activeName = activeTab.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }
  activeTab.value = activeName
  openTabs.value = tabs.filter((tab) => tab.name !== targetName)
}
</script>
<style>
</style>

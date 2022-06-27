<template>
  <el-row>
    <el-col :span="8">
      <el-input v-model="filterText" placeholder="搜索关键字" />
      <el-config-provider :locale="locale">
        <el-tree ref="treeRef" :data="data" :props="defaultProps" :filter-node-method="filterNode"
          @node-click="handleNodeClick" @check-change="handleCheckChange" show-checkbox :default-expand-all="true"
          :expand-on-click-node="false" />
      </el-config-provider>
    </el-col>
    <el-col :span="16">
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElTree } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

interface Tree {
  label: string
  children?: Tree[]
}

const locale = ref(zhCn)
const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()

watch(filterText, (val) => {
  console.log(val)
  treeRef.value?.filter(val)
})

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const handleCheckChange = (
  data: Tree,
  checked: boolean,
  indeterminate: boolean
) => {
  console.log(data, checked, indeterminate)
}

const data: Tree[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1'
          }
        ]
      }
    ]
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1'
          }
        ]
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1'
          }
        ]
      }
    ]
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1'
          }
        ]
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1'
          }
        ]
      }
    ]
  }
]

const defaultProps = {
  children: 'children',
  label: 'label'
}
</script>

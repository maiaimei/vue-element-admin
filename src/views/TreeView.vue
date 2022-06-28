<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <el-card class="box-card">
        <template #header>
          <ex-toolbar :buttons="buttons"></ex-toolbar>
        </template>
        <el-input v-model="filterText" placeholder="搜索关键字" />
        <el-config-provider :locale="locale">
          <el-tree ref="treeRef" :data="data" :props="defaultProps" :filter-node-method="filterNode"
            @node-click="handleNodeClick" @check-change="handleCheckChange" show-checkbox :default-expand-all="true"
            :expand-on-click-node="false" />
        </el-config-provider>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card class="box-card">
        <template #header>
          <div style="height:100%; display:flex; align-items:center; margin-bottom: 10px;">
            <el-icon :size="23">
              <Edit />
            </el-icon>
            <span style="display:inline-block; margin-left:2px;">编辑菜单</span>
          </div>
          <el-alert title="从节点列表选择一项后，进行编辑" type="info" effect="light" show-icon />
        </template>
        <ex-form v-if="isShowForm" :key="timer" :formItems="formItems" :formData="formData" @submitForm="submitForm">
          <template v-slot:id>
            <el-form-item prop="id">
              <ex-form-element :item="customFormItems.id" :model="formData"></ex-form-element>
            </el-form-item>
          </template>
        </ex-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { ElTree } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { TreeNodeData } from 'element-plus/lib/components/tree/src/tree.type'
import { HashMap, FormItem } from '@/types'
import ExForm from '@/components/ExForm.vue'
import ExFormElement from '@/components/ExFormElement.vue'
import ExToolbar from '@/components/ExToolbar.vue'

const locale = ref(zhCn)
const treeRef = ref<InstanceType<typeof ElTree>>()
const isShowForm = ref(false)

const buttons = Object.freeze([
  {
    text: '刷新',
    type: 'primary',
    icon: 'Refresh'
  },
  {
    text: '更多操作',
    children: [
      {
        text: '添加顶级节点'
      },
      {
        text: '添加子节点'
      },
      {
        text: '删除节点'
      },
      {
        text: '全部展开'
      },
      {
        text: '全部收起'
      }
    ]
  }
])

// 过滤节点
const filterText = ref('')
watch(filterText, (val) => {
  treeRef.value?.filter(val)
})
const filterNode = (value: string, data: TreeNodeData) => {
  if (!value) return true
  return data.label.includes(value)
}

// 点击节点事件
const handleNodeClick = (data: TreeNodeData) => {
  const jsonData = JSON.parse(JSON.stringify(data))
  formData.id = new Date().getTime()
  formData.label = jsonData.label
  if (isShowForm.value === false) {
    isShowForm.value = true
  } else {
    reloadForm()
  }
}

// 选中节点事件
const handleCheckChange = (
  data: TreeNodeData,
  checked: boolean,
  indeterminate: boolean
) => {
  console.log(data, checked, indeterminate)
}

// 节点属性
const defaultProps = {
  children: 'children',
  label: 'label'
}

// 节点数据
const data: TreeNodeData[] = [
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
  },
  {
    label: 'Level one 4',
    children: [
      {
        label: 'Level two 4-1',
        children: [
          {
            label: 'Level three 4-1-1'
          }
        ]
      },
      {
        label: 'Level two 4-2',
        children: [
          {
            label: 'Level three 4-2-1'
          }
        ]
      }
    ]
  },
  {
    label: 'Level one 5',
    children: [
      {
        label: 'Level two 5-1',
        children: [
          {
            label: 'Level three 5-1-1'
          }
        ]
      },
      {
        label: 'Level two 5-2',
        children: [
          {
            label: 'Level three 5-2-1'
          }
        ]
      }
    ]
  },
  {
    label: 'Level one 6',
    children: [
      {
        label: 'Level two 6-1',
        children: [
          {
            label: 'Level three 6-1-1'
          }
        ]
      },
      {
        label: 'Level two 6-2',
        children: [
          {
            label: 'Level three 6-2-1'
          }
        ]
      }
    ]
  }
]

const formData: HashMap = reactive({})

const formItems: FormItem[] = [
  {
    elType: 'slot',
    slot: 'id'
  },
  {
    elType: 'text',
    prop: 'label',
    label: '节点文本',
    placeholder: '请输入节点文本',
    rules: [
      {
        required: true,
        message: '请输入节点文本'
      }
    ]
  }
]

const customFormItems: { [key: string]: FormItem } = {
  id: {
    elType: 'hidden',
    prop: 'id'
  }
}

const timer = ref(new Date().getTime())
const reloadForm = () => {
  timer.value = new Date().getTime()
}

const submitForm = (data: { [propName: string]: unknown }) => {
  const jsonData = JSON.parse(JSON.stringify(data))
  console.log('接收子组件的数据', jsonData)
  reloadForm()
}
</script>

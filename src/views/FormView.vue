<template>
  <ex-form :key="timer" :items="formItems" :model="formData" :labelWidth="labelWidth" @submitForm="submitForm">
    <template v-slot:cascader>
      <el-form-item label="级联选择器" prop="cascader">
        <el-cascader :options="cascaderOptions" clearable />
      </el-form-item>
    </template>
    <template v-slot:startEndDate>
      <el-form-item label="日期范围">
        <el-col :span="11">
          <el-form-item prop="startDate" :rules="customFormItems.startDate.rules">
            <ex-form-element :item="customFormItems.startDate" :model="formData"></ex-form-element>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="text-center"><span class="text-gray-500">-</span></el-col>
        <el-col :span="11">
          <el-form-item prop="endDate" :rules="customFormItems.endDate.rules">
            <ex-form-element :item="customFormItems.endDate" :model="formData"></ex-form-element>
          </el-form-item>
        </el-col>
      </el-form-item>
    </template>
  </ex-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormItem, HashMap } from '@/types'
import ExForm from '@/components/ExForm.vue'
import ExFormElement from '@/components/ExFormElement.vue'

const labelWidth = 120

const formData: HashMap = reactive({
  text: 'admin',
  password: '123456',
  textarea: '文本域内容',
  number: 2
})

const formItems: FormItem[] = [
  {
    elType: 'text',
    prop: 'text',
    label: '文本框',
    placeholder: '请输入文本',
    rules: [
      {
        required: true,
        message: '请输入文本'
      }
    ],
    maxlength: 10,
    showWordLimit: true
  },
  {
    elType: 'password',
    prop: 'password',
    label: '密码框',
    placeholder: '请输入密码',
    rules: [
      {
        required: true,
        message: '请输入密码'
      }
    ]
  },
  {
    elType: 'textarea',
    prop: 'textarea',
    label: '文本域',
    placeholder: '请输入文本',
    rules: [
      {
        required: true,
        message: '请输入文本'
      }
    ]
  },
  {
    elType: 'select',
    prop: 'select',
    label: '选择框',
    placeholder: '请选择',
    multiple: true,
    filterable: true,
    options: [
      { text: 'text1', value: 'value1' },
      { text: 'text2', value: 'value2' },
      { text: 'text3', value: 'value3' },
      { text: 'text4', value: 'value4' }
    ],
    rules: [
      {
        type: 'array',
        message: '请至少选择一项',
        trigger: 'change'
      }
    ]
  },
  {
    elType: 'slot',
    slot: 'cascader',
    prop: '级联选择器'
  },
  {
    elType: 'checkbox',
    prop: 'checkbox',
    label: '复选框',
    options: [
      { text: 'text1', value: 'value1' },
      { text: 'text2', value: 'value2' },
      { text: 'text3', value: 'value3' }
    ],
    rules: [
      {
        type: 'array',
        required: true,
        message: '请至少选择一项'
      }
    ]
  },
  {
    elType: 'radio',
    prop: 'radio',
    label: '单选框',
    options: [
      { text: 'text1', value: 'value1' },
      { text: 'text2', value: 'value2' }
    ],
    rules: [
      {
        required: true,
        message: '请至少选择一项'
      }
    ]
  },
  {
    elType: 'datepicker',
    type: 'date',
    prop: 'datepicker',
    label: '日期',
    placeholder: '请选择日期',
    rules: [
      { type: 'date', message: '请选择日期' }
    ]
  },
  {
    elType: 'slot',
    prop: 'startEndDate',
    slot: 'startEndDate'
  },
  {
    elType: 'timepicker',
    type: 'datetime',
    prop: 'timepicker',
    label: '时间1',
    placeholder: '请选择时间1',
    rules: [
      { type: 'string', message: '请选择时间' }
    ]
  },
  {
    elType: 'timeselect',
    prop: 'timeselect',
    label: '时间2',
    placeholder: '请选择时间2'
  },
  {
    elType: 'number',
    prop: 'number',
    label: '数字框',
    placeholder: '请输入数字',
    min: 10,
    max: 1000
  },
  {
    elType: 'switch',
    prop: 'switch',
    label: '开关'
  },
  {
    elType: 'upload',
    prop: 'upload',
    label: '上传文件',
    action: 'https://jsonplaceholder.typicode.com/posts/',
    tip: '小于 500kb 的 jpg/png 文件',
    multiple: true
  }
]

const customFormItems: { [key: string]: FormItem } = {
  startDate: {
    elType: 'datepicker',
    type: 'date',
    prop: 'startDate',
    label: '开始日期',
    placeholder: '请选择开始日期',
    rules: [
      { type: 'date', required: false, message: '请选择开始日期' }
    ]
  },
  endDate: {
    elType: 'datepicker',
    type: 'date',
    prop: 'endDate',
    label: '结束日期',
    placeholder: '请选择结束日期',
    rules: [
      { type: 'date', required: true, message: '请选择结束日期' }
    ]
  }
}

const cascaderOptions = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency'
          },
          {
            value: 'feedback',
            label: 'Feedback'
          },
          {
            value: 'efficiency',
            label: 'Efficiency'
          },
          {
            value: 'controllability',
            label: 'Controllability'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation'
          },
          {
            value: 'top nav',
            label: 'Top Navigation'
          }
        ]
      }
    ]
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout'
          },
          {
            value: 'color',
            label: 'Color'
          },
          {
            value: 'typography',
            label: 'Typography'
          },
          {
            value: 'icon',
            label: 'Icon'
          },
          {
            value: 'button',
            label: 'Button'
          }
        ]
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio'
          },
          {
            value: 'checkbox',
            label: 'Checkbox'
          },
          {
            value: 'input',
            label: 'Input'
          },
          {
            value: 'input-number',
            label: 'InputNumber'
          },
          {
            value: 'select',
            label: 'Select'
          },
          {
            value: 'cascader',
            label: 'Cascader'
          },
          {
            value: 'switch',
            label: 'Switch'
          },
          {
            value: 'slider',
            label: 'Slider'
          },
          {
            value: 'time-picker',
            label: 'TimePicker'
          },
          {
            value: 'date-picker',
            label: 'DatePicker'
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker'
          },
          {
            value: 'upload',
            label: 'Upload'
          },
          {
            value: 'rate',
            label: 'Rate'
          },
          {
            value: 'form',
            label: 'Form'
          }
        ]
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table'
          },
          {
            value: 'tag',
            label: 'Tag'
          },
          {
            value: 'progress',
            label: 'Progress'
          },
          {
            value: 'tree',
            label: 'Tree'
          },
          {
            value: 'pagination',
            label: 'Pagination'
          },
          {
            value: 'badge',
            label: 'Badge'
          }
        ]
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert'
          },
          {
            value: 'loading',
            label: 'Loading'
          },
          {
            value: 'message',
            label: 'Message'
          },
          {
            value: 'message-box',
            label: 'MessageBox'
          },
          {
            value: 'notification',
            label: 'Notification'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu'
          },
          {
            value: 'tabs',
            label: 'Tabs'
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb'
          },
          {
            value: 'dropdown',
            label: 'Dropdown'
          },
          {
            value: 'steps',
            label: 'Steps'
          }
        ]
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog'
          },
          {
            value: 'tooltip',
            label: 'Tooltip'
          },
          {
            value: 'popover',
            label: 'Popover'
          },
          {
            value: 'card',
            label: 'Card'
          },
          {
            value: 'carousel',
            label: 'Carousel'
          },
          {
            value: 'collapse',
            label: 'Collapse'
          }
        ]
      }
    ]
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components'
      },
      {
        value: 'sketch',
        label: 'Sketch Templates'
      },
      {
        value: 'docs',
        label: 'Design Documentation'
      }
    ]
  }
]

// 在父组件中刷新子组件，如果这一次的key值和上一次的key值不一样，会重新渲染dom元素，否则保持上一次的元素状态。
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

<style scoped lang="scss">
</style>

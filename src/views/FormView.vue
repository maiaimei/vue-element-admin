<template>
  <ex-form :key="timer" :formItems="formItems" :formData="formData" :labelWidth="labelWidth" @submitForm="submitForm" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormItem } from '@/types'
import ExForm from '@/components/ExForm.vue'

// 在父组件中刷新子组件，如果这一次的key值和上一次的key值不一样，会重新渲染dom元素，否则保持上一次的元素状态。
const timer = ref(new Date().getTime())
const reloadForm = () => {
  timer.value = new Date().getTime()
}

const labelWidth = 120
const formItems: FormItem[] = [
  {
    type: 'text',
    prop: 'username',
    label: '账号',
    placeholder: '请输入账号',
    rules: [
      {
        required: true,
        message: '请输入账号'
      }
    ]
  },
  {
    type: 'password',
    prop: 'password',
    label: '密码',
    placeholder: '请输入密码',
    rules: [
      {
        required: true,
        message: '请输入密码'
      }
    ]
  },
  {
    type: 'textarea',
    prop: 'remark',
    label: '备注',
    placeholder: '请输入备注',
    rules: [
      {
        required: true,
        message: '请输入备注'
      }
    ]
  },
  {
    type: 'select',
    prop: 'hobby',
    label: '兴趣爱好',
    placeholder: '请选择兴趣爱好',
    multiple: true,
    filterable: true,
    options: [
      { text: '编程', value: 'programming' },
      { text: '音乐', value: 'music' },
      { text: '烹饪', value: 'cooking' },
      { text: '其他', value: 'other' }
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
    type: 'checkbox',
    prop: 'language',
    label: '编程语言',
    options: [
      { text: 'Java', value: 'Java' },
      { text: 'JavaScript', value: 'JavaScript' },
      { text: 'Python', value: 'Python' }
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
    type: 'radio',
    prop: 'sex',
    label: '性别',
    options: [
      { text: '男', value: 'M' },
      { text: '女', value: 'F' }
    ],
    rules: [
      {
        required: true,
        message: '请至少选择一项'
      }
    ]
  },
  {
    type: 'datepicker',
    subType: 'date',
    prop: 'datepicker',
    placeholder: '请选择日期',
    label: '日期',
    rules: [
      { type: 'date', message: '请选择日期' }
    ]
  },
  {
    type: 'timepicker',
    subType: 'datetime',
    prop: 'timepicker',
    placeholder: '请选择时间1',
    label: '时间1',
    rules: [
      { type: 'string', message: '请选择时间' }
    ]
  },
  {
    type: 'timeselect',
    prop: 'timeselect',
    placeholder: '请选择时间2',
    label: '时间2'
  },
  {
    type: 'number',
    prop: 'number',
    placeholder: '请输入数字',
    label: '数字框',
    min: 1,
    max: 100
  },
  {
    type: 'switch',
    prop: 'switch',
    label: '开关'
  },
  {
    type: 'upload',
    prop: 'upload',
    label: '上传文件',
    action: 'https://jsonplaceholder.typicode.com/posts/',
    multiple: true,
    tip: '小于 500kb 的 jpg/png 文件'
  },
  {
    type: 'cols',
    label: '外出时间',
    prop: 'startEndDate',
    cols: [
      {
        span: 11,
        items: [
          {
            type: 'datepicker',
            subType: 'date',
            prop: 'startDate',
            placeholder: '请选择开始日期',
            rules: [
              {
                required: true,
                message: '开始日期不能为空'
              }
            ]
          }
        ]
      },
      {
        span: 2,
        class: 'text-center',
        html: '<span class="text-gray-500">-</span>'
      },
      {
        span: 11,
        items: [
          {
            type: 'datepicker',
            subType: 'date',
            prop: 'endDate',
            placeholder: '请选择结束日期',
            rules: [
              {
                required: true,
                message: '结束日期不能为空'
              }
            ]
          }
        ]
      }
    ]
  }
]

const formData: { [propName: string]: unknown } = reactive({
  username: 'admin',
  password: '123456',
  textarea: '描述',
  number: 2,
  datepicker: '2022-06-22',
  datepicker2: '',
  datepicker3: ''
})

const submitForm = (data: { [propName: string]: unknown }) => {
  const jsonData = JSON.parse(JSON.stringify(data))
  console.log('接收子组件的数据', jsonData)
  reloadForm()
}
</script>

<style scoped lang="scss">
</style>

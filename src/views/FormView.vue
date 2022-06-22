<template>
  <ex-form :formItems="formItems" :formRules="formRules" :formData="formData" :labeWidth="labeWidth"
    @submitForm="submitForm" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { FormRules } from 'element-plus'
import { FormItem } from '@/types'
import ExForm from '@/components/ExForm.vue'

const labeWidth = 100
const formItems: FormItem[] = [
  {
    type: 'text',
    prop: 'text',
    placeholder: '请输入文本',
    label: '文本框'
  },
  {
    type: 'password',
    prop: 'password',
    placeholder: '请输入密码',
    label: '密码框'
  },
  {
    type: 'textarea',
    prop: 'textarea',
    placeholder: '请输入文本',
    label: '文本域'
  },
  {
    type: 'select',
    prop: 'select',
    placeholder: '请选择',
    label: '下拉框',
    options: [
      { text: '选项1', value: 'key1' },
      { text: '选项2', value: 'key2' },
      { text: '选项3', value: 'key3' },
      { text: '选项4', value: 'key4' },
      { text: '选项5', value: 'key5' }
    ],
    multiple: true,
    filterable: true
  },
  {
    type: 'checkbox',
    prop: 'checkbox',
    label: '复选框',
    options: [
      { text: '选择一', value: 'key1' },
      { text: '选择二', value: 'key2' }
    ]
  },
  {
    type: 'radio',
    prop: 'radio',
    label: '单选框',
    options: [
      { text: '选择一', value: 'key1' },
      { text: '选择二', value: 'key2' }
    ]
  },
  {
    type: 'datepicker',
    subType: 'date',
    prop: 'datepicker',
    placeholder: '请选择日期',
    label: '日期'
  },
  {
    type: 'timepicker',
    subType: 'datetime',
    prop: 'timepicker',
    placeholder: '请选择时间1',
    label: '时间1'
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
  }
]

const formRules: FormRules = {
  text: [
    { message: '请输入文本' }
  ],
  password: [
    { message: '请输入密码' }
  ],
  textarea: [
    { message: '请填写文本' }
  ],
  // 多选时需要设置 type: 'array' 否则报错
  select: [
    { type: 'array', message: '请至少选择一个' }
  ],
  checkbox: [
    { type: 'array', message: '请至少选择一个' }
  ],
  radio: [
    { message: '请至少选择一个' }
  ],
  datapicker: [
    { type: 'date', message: '请选择日期' }
  ],
  timepicker: [
    { type: 'string', message: '请选择时间' }
  ]
}

const formData: { [propName: string]: unknown } = reactive({
  text: 'test text',
  textarea: 'test textarea',
  select: ['key1', 'key2'],
  checkbox: ['key1'],
  number: 2,
  datepicker: '2022-06-22'
})

const submitForm = (data: { [propName: string]: unknown }) => {
  const jsonData = JSON.parse(JSON.stringify(data))
  // console.log('接收子组件的数据', jsonData)
  console.log(data === formData)
}
</script>

<style scoped lang="scss">
</style>

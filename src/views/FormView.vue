<template>
  <el-form ref="formRef" :model="formData" label-width="120px">
    <el-form-item v-for="(config, index) in setting.config" :key="index" :label="config.name" :prop="config.name">
      <el-input v-model="formData[config.name]" :placeholder="config.placeholder" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
      <el-button @click="resetForm(formRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import _ from 'lodash'

interface IFormElement {
  type: string,
  name: string,
  placeholder?: string
}

const formConfig: IFormElement[] = [
  {
    type: 'text',
    name: 'username',
    placeholder: 'Please input username'
  }
]

const formDefault = {
  username: ''
}

const setting = {
  config: formConfig,
  data: formDefault
}

const formRef = ref<FormInstance>()
const formData = reactive(setting.data)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!', formData)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped lang="scss">
</style>

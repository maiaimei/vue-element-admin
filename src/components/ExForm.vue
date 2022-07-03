<template>
  <el-form ref="formRef" :inline="isSearchForm" :model="model" :label-width="labelWidth + 'px'">
    <template v-for="(item, index) of items" :key="index">
      <!-- 自定义内容 -->
      <slot v-if="item.elType === 'slot'" :name="item.slot">
      </slot>
      <!-- 常规表单项 -->
      <template v-else>
        <el-form-item :label="item.label" :prop="item.prop" :rules="item.rules"
          :class="{ 'hide': item.hide && !isExpandFormItem, 'default-hide': item.hide !== undefined }">
          <ex-form-element :item="item" :model="model"></ex-form-element>
        </el-form-item>
      </template>
    </template>
    <el-form-item>
      <el-button @click="submitForm(formRef)" type="primary">
        {{ isSearchForm ? "查询" : "提交" }}
      </el-button>
      <el-button @click="resetForm(formRef)">重置</el-button>
      <el-link v-if="isSearchForm && hasHideFormItem" :icon="isExpandFormItem ? ArrowUpBold : ArrowDownBold"
        :underline="false" style="margin-left:10px;" @click="isExpandFormItem = !isExpandFormItem">{{ isExpandFormItem ?
            '收起' : '展开'
        }}</el-link>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import _ from 'lodash'
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue'
import { HashMap, FormItem } from '@/types'
import ExFormElement from '@/components/ExFormElement.vue'

// 接收父组件的属性
const props = defineProps({
  // 表单元素
  items: {
    type: Array as () => Array<FormItem>,
    default: () => [],
    required: true
  },
  // 表单数据
  model: {
    type: Object as () => HashMap,
    default: function () {
      return {}
    }
  },
  // 标签宽度
  labelWidth: {
    type: Number,
    default: () => 100
  },
  isSearchForm: {
    type: Boolean,
    default: false
  }
})

// 接收父组件的方法
const emit = defineEmits(['submitForm', 'resetForm'])

const formRef = ref<FormInstance>()
const formData = reactive(props.model)
const hasHideFormItem = _.find(props.items, item => item.hide === true) !== undefined
const isExpandFormItem = ref(false)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 调用父组件的方法
      emit('submitForm', formData)
    } else {
      console.log('submit error! error fields: ', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  // 调用父组件的方法
  emit('resetForm', formData)
}

const restoreForm = () => {
  formRef.value?.resetFields()
}

// 向父组件暴露属性或方法
defineExpose({
  isExpandFormItem,
  restoreForm
})
</script>

<style scoped lang="scss">
</style>

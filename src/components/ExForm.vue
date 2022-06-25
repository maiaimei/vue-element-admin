<template>
  <el-form ref="formRef" :model="formData" :label-width="labeWidth + 'px'" :inline="isSearchForm">
    <template v-for="(item, index) of formItems" :key="index">
      <template v-if="item.type == 'cols'">
        <el-form-item :label="item.label">
          <template v-for="(col, colIndex) of item.cols" :key="colIndex">
            <el-col v-if="col.html" :span="col.span" :class="col.class" v-html="col.html"></el-col>
            <el-col v-else :span="col.span" :class="col.class">
              <el-form-item v-for="(colItem, colIdx) of col.items" :key="colIdx" :prop="colItem.prop"
                :rules="colItem.rules">
                <ex-form-element :item="colItem" :model="formData"></ex-form-element>
              </el-form-item>
            </el-col>
          </template>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item :label="item.label" :prop="item.prop" :rules="item.rules">
          <ex-form-element :item="item" :model="formData"></ex-form-element>
        </el-form-item>
      </template>
    </template>
    <el-form-item>
      <el-button @click="submitForm(formRef)" type="primary" v-if="isSearchForm">查询</el-button>
      <el-button @click="submitForm(formRef)" type="primary" v-if="!isSearchForm">提交</el-button>
      <el-button @click="resetForm(formRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { FormItem } from '@/types'
import ExFormElement from '@/components/ExFormElement.vue'

// defineProps 接收与 props 选项相同的值
const props = defineProps({
  // 表单元素
  formItems: {
    type: Array as () => Array<FormItem>,
    default: () => [],
    required: true
  },
  // // 表单验证规则
  // formRules: {
  //   type: Object as () => FormRules,
  //   default: function () {
  //     return {}
  //   }
  // },
  // 表单提交数据
  formData: {
    // [propName: string]: unknown 表示任意类型的属性
    type: Object as () => { [propName: string]: unknown },
    default: function () {
      return {}
    }
  },
  // 标签宽度
  labeWidth: {
    type: Number,
    default: () => 100
  },
  isSearchForm: {
    type: Boolean,
    default: false
  }
})

// defineEmits 也接收 emits 选项相同的值
const emit = defineEmits(['submitForm', 'resetForm'])

const formRef = ref<FormInstance>()
const formData = reactive(props.formData)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit('submitForm', formData)
    } else {
      console.log('submit error! error fields: ', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  emit('resetForm', formData)
}
</script>

<style scoped lang="scss">
</style>

<template>
  <el-form ref="formRef" :model="formData" :label-width="labelWidth + 'px'" :inline="isSearchForm">
    <template v-for="(item, index) of formItems" :key="index">
      <!-- 自定义内容 -->
      <slot v-if="item.elType === 'slot'" :name="item.slot">
      </slot>
      <!-- 常规表单项 -->
      <template v-else>
        <el-form-item :label="item.label" :prop="item.prop" :rules="item.rules"
          :class="{ 'hidden': item.hidden && !isExpand, 'default-hidden': item.hidden !== undefined }">
          <ex-form-element :item="item" :model="formData"></ex-form-element>
        </el-form-item>
      </template>
    </template>
    <el-form-item>
      <el-button @click="submitForm(formRef)" type="primary">
        {{ isSearchForm ? "查询" : "提交" }}
      </el-button>
      <el-button @click="resetForm(formRef)">重置</el-button>
      <el-link v-if="isSearchForm" :icon="isExpand ? ArrowUpBold : ArrowDownBold" :underline="false"
        style="margin-left:10px;" @click="expandFormItem">{{ isExpand ? '收起' : '展开' }}</el-link>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { HashMap, FormItem } from '@/types'
import ExFormElement from '@/components/ExFormElement.vue'

const store = useStore()

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

const isExpand = computed(() => store.state.isExpandFormItem)
const expandFormItem = () => {
  store.commit('UPDATEISEXPANDFORMITEM')
}
</script>

<style scoped lang="scss">
</style>

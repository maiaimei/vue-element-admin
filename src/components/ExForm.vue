<template>
  <el-form ref="formRef" :model="formData" :rules="formRules" :label-width="labeWidth + 'px'">
    <el-form-item v-for="(item, index) of formItems" :key="index" :label="item.label" :prop="item.prop">
      <el-input v-if="item.type === 'text'" v-model="formData[item.prop]" :disabled="item.disabled"
        :placeholder="item.placeholder"></el-input>
      <el-input v-if="item.type == 'password'" type="password" v-model="formData[item.prop]" show-password></el-input>
      <el-input v-if="item.type == 'textarea'" type="textarea" v-model="formData[item.prop]" autosize></el-input>
      <el-select v-if="item.type == 'select'" v-model="formData[item.prop]" :placeholder="item.placeholder"
        :multiple="item.multiple" :filterable="item.filterable">
        <el-option v-for="(option, optionIndex) of item.options" :key="optionIndex" :label="option.text"
          :value="option.value">
        </el-option>
      </el-select>
      <el-checkbox-group v-if="item.type == 'checkbox'" v-model="formData[item.prop]">
        <el-checkbox v-for="(option) of item.options" :key="option.value" :label="option.text">{{ option.text }}
        </el-checkbox>
      </el-checkbox-group>
      <el-radio-group v-if="item.type == 'radio'" v-model="formData[item.prop]">
        <el-radio v-for="(option) of item.options" :key="option.value" :label="option.text">{{ option.text }}</el-radio>
      </el-radio-group>
      <el-date-picker v-if="item.type == 'datepicker'" :type="item.subType" :placeholder="item.placeholder"
        v-model="formData[item.prop]" :style="{ width: item.width }" :format="item.format || defaultDateFormat"
        :value-format="item.valueFormat || defaultDateFormat"></el-date-picker>
      <el-time-picker v-if="item.type == 'timepicker'" :type="item.subType" :placeholder="item.placeholder"
        v-model="formData[item.prop]" :style="{ width: item.width }" :format="item.format || defaultTimeFormat"
        :value-format="item.valueFormat || defaultTimeFormat">
      </el-time-picker>
      <el-time-select v-if="item.type == 'timeselect'" v-model="formData[item.prop]" :start="item.start"
        :step="item.step" :end="item.end" :placeholder="item.placeholder" :format="item.format || defaultTimeFormat" />
      <el-switch v-if="item.type == 'switch'" v-model="formData[item.prop]"></el-switch>
      <el-input-number v-if="item.type == 'number'" v-model="formData[item.prop]" :min="item.min" :max="item.max"
        @change="item.handleChange" />
      <el-upload v-if="item.type == 'upload'" :action="item.action" drag :multiple="item.multiple">
        <el-icon class="el-icon--upload">
          <upload-filled />
        </el-icon>
        <div class="el-upload__text">
          将文件拖放到此处或<em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            {{item.tip}}
          </div>
        </template>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button @click="submitForm(formRef)" type="primary">提交</el-button>
      <el-button @click="resetForm(formRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { FormItem } from '@/types'

// defineProps 接收与 props 选项相同的值
const props = defineProps({
  // 表单元素
  formItems: {
    type: Array as () => Array<FormItem>,
    default: () => [],
    required: true
  },
  // 表单验证规则
  formRules: {
    type: Object as () => FormRules,
    default: function () {
      return {}
    }
  },
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
  }
})

// defineEmits 也接收 emits 选项相同的值
const emit = defineEmits(['submitForm'])

const defaultDateFormat = 'YYYY-MM-DD'
const defaultTimeFormat = 'HH:mm:ss'

const formRef = ref<FormInstance>()
const formData = reactive(props.formData)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log('submit success!', formData)
      emit('submitForm', formData)
    } else {
      console.log('submit error!', fields)
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

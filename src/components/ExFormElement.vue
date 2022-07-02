<template>
  <input v-if="item.elType === 'hidden'" type="hidden" v-model="formData[getProp(item.prop)]" v-bind="item" />
  <el-input v-if="item.elType === 'text'" v-model="formData[getProp(item.prop)]" v-bind="item">
  </el-input>
  <el-input v-if="item.elType == 'password'" type="password" v-model="formData[getProp(item.prop)]" show-password
    v-bind="item">
  </el-input>
  <el-input-number v-if="item.elType == 'number'" v-model="formData[getProp(item.prop)]" v-bind="item" />
  <el-input v-if="item.elType == 'textarea'" type="textarea" v-model="formData[getProp(item.prop)]" autosize
    v-bind="item">
  </el-input>
  <el-select v-if="item.elType == 'select'" v-model="formData[getProp(item.prop)]" v-bind="item">
    <el-option v-for="(option, optionIndex) of item.options" :key="optionIndex" :label="option.text"
      :value="option.value">
    </el-option>
  </el-select>
  <el-checkbox-group v-if="item.elType == 'checkbox'" v-model="formData[getProp(item.prop)]">
    <el-checkbox v-for="(option) of item.options" :key="option.value" :name="item.prop" :label="option.text">
      {{ option.text }}
    </el-checkbox>
  </el-checkbox-group>
  <el-radio-group v-if="item.elType == 'radio'" v-model="formData[getProp(item.prop)]">
    <el-radio v-for="(option) of item.options" :key="option.value" :label="option.text">{{ option.text }}</el-radio>
  </el-radio-group>
  <el-date-picker v-if="item.elType == 'datepicker'" :type="item.type" :placeholder="item.placeholder"
    v-model="formData[getProp(item.prop)]" :format="item.format || defaultDateFormat"
    :value-format="item.valueFormat || defaultDateFormat" v-bind="item"></el-date-picker>
  <el-time-picker v-if="item.elType == 'timepicker'" :type="item.type" :placeholder="item.placeholder"
    v-model="formData[getProp(item.prop)]" :format="item.format || defaultTimeFormat"
    :value-format="item.valueFormat || defaultTimeFormat" v-bind="item">
  </el-time-picker>
  <el-time-select v-if="item.elType == 'timeselect'" v-model="formData[getProp(item.prop)]"
    :format="item.format || defaultTimeFormat" v-bind="item" />
  <el-switch v-if="item.elType == 'switch'" v-model="formData[getProp(item.prop)]"></el-switch>
  <el-upload v-if="item.elType == 'upload'" :action="item.action" drag :multiple="item.multiple">
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
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { HashMap, FormItem } from '@/types'

const props = defineProps({
  // 表单元素配置
  item: {
    type: Object as () => FormItem,
    required: true
  },
  // 表单数据
  model: {
    type: Object as () => HashMap,
    default: function () {
      return {}
    }
  }
})

const formData = reactive(props.model)
const defaultDateFormat = 'YYYY-MM-DD'
const defaultTimeFormat = 'HH:mm:ss'

const getProp = (prop: string | undefined) => {
  if (prop) {
    return prop
  } else {
    return 'undefined'
  }
}
</script>

<style scoped lang="scss">
</style>

<template>
  <el-card shadow="never">
    <el-tabs tab-position="left" style="min-height: 200px" @tab-click="handleTabClick">
      <el-tab-pane label="基本信息">
        <el-row>
          <el-col :span="10" :offset="2">
            <el-form label-suffix="：" label-width="120px">
              <el-form-item v-for="(label, key) in profileFormLabel" :label="label" :key="key">
                {{ profileFormData[key] || '-' }}
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <el-row>
          <el-col :span="10" :offset="2">
            <ex-form ref="passwordFormRef" :items="passwordFormItems" :model="passwordFormData"
              @submitForm="modifyPassword">
            </ex-form>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { ElMessageBox, TabsPaneContext } from 'element-plus'
import { FormItem, HashMap } from '@/types'
import ExForm from '@/components/ExForm.vue'

let currentInstance: any
onMounted(() => {
  currentInstance = getCurrentInstance()
})

const profileFormData: HashMap = JSON.parse(localStorage.getItem('user') || '')
const profileFormLabel: HashMap = {
  nickname: '姓名',
  staffNumber: '工号',
  organization: '部门',
  position: '职位',
  email: '邮箱',
  mobile: '手机'
}

const passwordFormData: HashMap = reactive({})

const passwordFormItems: FormItem[] = [
  {
    elType: 'password',
    prop: 'oldPassword',
    label: '原密码',
    placeholder: '请输入原密码',
    rules: [
      {
        required: true,
        message: '请输入原密码'
      }
    ]
  },
  {
    elType: 'password',
    prop: 'newPassword',
    label: '新密码',
    placeholder: '请输入新密码',
    rules: [
      {
        required: true,
        message: '请输入新密码'
      }
    ]
  },
  {
    elType: 'password',
    prop: 'confirmPassword',
    label: '确认密码',
    placeholder: '请再次输入新密码',
    rules: [
      {
        required: true,
        message: '请再次输入新密码'
      }
    ]
  }
]

const modifyPassword = (data: { [propName: string]: unknown }) => {
  const jsonData = JSON.parse(JSON.stringify(data))
  ElMessageBox.alert(jsonData, '温馨提示')
}

const handleTabClick = (pane: TabsPaneContext, ev: Event) => {
  const tab = JSON.parse(JSON.stringify(pane))
  if (tab.index === '1' && currentInstance !== null) {
    currentInstance.ctx.$refs.passwordFormRef.restoreForm()
  }
}
</script>

<style scoped lang="scss">
</style>

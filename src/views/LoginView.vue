<template>
  <div class="login-container">
    <div class="login-box">
      <h1>欢迎登录</h1>
      <el-form :model="loginFormData" :rules="loginFormRules" ref="loginFormRef" size="large" status-icon>
        <el-form-item prop="username">
          <el-input type="text" v-model="loginFormData.username" placeholder="请输入登录账号" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginFormData.password" placeholder="请输入登录密码" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin(loginFormRef)">登&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { Result } from '@/types'
import $axios from '@/utils/axios.util'
import url from 'url'

const router = useRouter()

const loginFormRef = ref<FormInstance>()
const loginFormRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入登录账号' }
  ],
  password: [
    { required: true, message: '请输入登录密码' }
  ]
})
const loginFormData = reactive({
  username: '',
  password: ''
})

const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  await formEl.validate((valid) => {
    if (valid) {
      // if (loginFormData.username === 'admin') {
      //   // 登录成功
      //   ElMessage.success('登录成功')
      //   localStorage.setItem('isAuthenticated', 'true')
      //   router.replace('/')
      // } else {
      //   // 登录失败
      //   ElMessage.error('账号或密码错误')
      // }
      $axios.post('/api/login', loginFormData).then(res => {
        const result: Result<any> = res.data
        if (result.data === null) {
          ElMessage.error(result.message || '账号或密码错误')
        } else {
          ElMessage.success('登录成功')
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('user', JSON.stringify(result.data))
          const req = new URL(window.location.href)
          const redirectUrl = req.searchParams.get('redirect') || '/'
          router.replace(redirectUrl)
        }
      })
    }
  })
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
}

.login-box {
  padding-top: 12%;
  width: 30%;

  h1 {
    font-size: 36px;
    margin-bottom: 30px;
    text-align: center;
  }

  .el-button {
    width: 100%;
    height: 40px;
    font-size: 16px;
  }
}
</style>

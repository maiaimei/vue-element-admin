import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import axios from 'axios'

let loading: LoadingInstance

const $axios = axios.create({
  baseURL: process.env.API_URL,
  headers: { 'X-Auth-Token': 'test' },
  timeout: 1000
})

$axios.interceptors.request.use(function (config) {
  loading = ElLoading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  return config
}, function (error) {
  loading.close()
  return Promise.reject(error)
})

$axios.interceptors.response.use(function (response) {
  loading.close()
  return response
}, function (error) {
  loading.close()
  return Promise.reject(error)
})

export default $axios

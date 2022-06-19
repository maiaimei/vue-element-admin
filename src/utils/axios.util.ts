import { ElLoading } from 'element-plus'
import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let loading: any
function closeLoading() {
  if (loading) {
    loading.close()
  }
}

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
  closeLoading()
  return Promise.reject(error)
})

$axios.interceptors.response.use(function (response) {
  closeLoading()
  return response
}, function (error) {
  closeLoading()
  return Promise.reject(error)
})

export default $axios

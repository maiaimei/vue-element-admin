import { HashMap } from '@/types'
import $axios from '@/utils/axios.util'

export const staffs = {
  pageQuery: async (searchData: HashMap) => {
    return await $axios.post('/api/staffs', searchData)
  }
}

export const meuns = {
  findAll: async () => {
    return await $axios.get('/api/menus')
  }
}

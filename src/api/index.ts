import { HashMap } from '@/types'
import $axios from '@/utils/axios.util'

export const staffs = {
  pageQuery: async (pagingQueryBody: HashMap) => {
    return await $axios.post('/api/staffs', pagingQueryBody)
  }
}

export const meuns = {
  findAll: async () => {
    return await $axios.get('/api/menus')
  }
}

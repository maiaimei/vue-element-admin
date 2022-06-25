import $axios from '@/utils/axios.util'
import { IPageQueryData } from '@/types'

export const staffs = {
  pageQuery: async (searchData: IPageQueryData) => {
    return await $axios.post('/api/staffs', searchData)
  }
}

export const meuns = {
  findAll: async () => {
    return await $axios.get('/api/menus')
  }
}

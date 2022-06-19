import $axios from '@/utils/axios.util'

export const listMenus = $axios.get('/api/menus')

export const listStaffs = $axios.get('/api/staffs')

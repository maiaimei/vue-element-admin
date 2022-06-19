import Mock from 'mockjs'
import menus from './menu'
import staffs from './staff'

Mock.setup({
  timeout: '10-100'
})

Mock.mock('/api/menus', 'get', menus)

Mock.mock('/api/staffs', 'get', staffs)

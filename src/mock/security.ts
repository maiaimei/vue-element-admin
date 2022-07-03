import _ from 'lodash'
import Mock from 'mockjs'
import { Result } from '@/types'

Mock.mock('/api/login', 'post', (options: { body: string }) => {
  const jsonData: any = JSON.parse(options.body)
  let data = {}
  if (jsonData.username === 'admin' && jsonData.password === '123') {
    data = {
      nickname: '管理员',
      menus: ['#workbench', '/todo', '#done',
        '#systemmanage', '#organization', '#person', '#role', '#user',
        '/list', '/tree', '/form', '/chart',
        'error', '/error', '/notfound', '/unauthorized',
        'multi-nav', 'item-1', '#item-1-1', '#item-1-2',
        'item-2', '#item-2-1', '#item-2-2',
        '#item-3', '#item-3-1', '#item-3-2',
        '#item-4', '#item-4-1', '#item-4-2',
        '#item-5', '#item-5-1', '#item-5-2', '#item-5-3', '#item-5-4', '#item-5-5']
    }
  }
  if (jsonData.username === 'maiaimei' && jsonData.password === '123') {
    data = {
      nickname: '初冬十月',
      staffNumber: '123456',
      organization: '研发部',
      position: '软件工程师',
      email: '1211674185@qq.com',
      mobile: '15989238815',
      menus: ['#workbench', '/todo', '#done',
        '/list', '/tree', '/form', '/chart',
        'error', '/error', '/notfound', '/unauthorized']
    }
  }
  if (jsonData.username === 'guest' && jsonData.password === '123') {
    data = {
      nickname: '访客',
      menus: ['/list', '/tree', '/form', '/chart',
        'error', '/error', '/notfound', '/unauthorized']
    }
  }
  if (_.isEmpty(data)) {
    return {
      code: 200,
      message: '账号或密码错误',
      data: null
    } as Result<any>
  }
  return {
    code: 200,
    message: null,
    data: data
  } as Result<any>
})

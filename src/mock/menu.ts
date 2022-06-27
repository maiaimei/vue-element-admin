import Mock from 'mockjs'
import { Result, MenuItem } from '@/types'

const menus: Array<MenuItem> = [
  {
    name: 'MenuView',
    title: '菜单管理',
    path: '/menu'
  },
  {
    name: 'ListView',
    title: '列表页',
    path: '/list'
  },
  {
    name: 'FormView',
    title: '表单页',
    path: '/form'
  },
  {
    name: '4',
    title: '错误页',
    path: 'error',
    children: [
      {
        name: 'ErrorView',
        title: '服务器错误',
        path: '/error'
      },
      {
        name: 'NotfoundView',
        title: '未找到资源',
        path: '/notfound'
      },
      {
        name: 'UnauthorizedView',
        title: '无权限访问',
        path: '/unauthorized'
      }
    ]
  },
  {
    name: '8',
    title: '多级分组导航',
    path: 'multi-nav',
    children: [
      {
        name: '9',
        title: 'item 1',
        path: 'item-1',
        children: [
          {
            name: '10',
            title: 'item 1-1',
            path: '#item-1-1'
          },
          {
            name: '11',
            title: 'item 1-2',
            path: '#item-1-2'
          }
        ]
      },
      {
        name: '12',
        title: 'item 2',
        path: 'item-2',
        children: [
          {
            name: '13',
            title: 'item 2-1',
            path: '#item-2-1'
          },
          {
            name: '14',
            title: 'item 2-2',
            path: '#item-2-2'
          }
        ]
      },
      {
        name: '15',
        title: 'item 3',
        path: 'item-3',
        children: [
          {
            name: '16',
            title: 'item 3-1',
            path: '#item-3-1'
          },
          {
            name: '17',
            title: 'item 3-2',
            path: '#item-3-2'
          }
        ]
      },
      {
        name: '18',
        title: 'item 4',
        path: 'item-4',
        children: [
          {
            name: '19',
            title: 'item 4-1',
            path: '#item-4-1'
          },
          {
            name: '20',
            title: 'item 4-2',
            path: '#item-4-2'
          }
        ]
      },
      {
        name: '21',
        title: 'item 5',
        path: 'item-5',
        children: [
          {
            name: '22',
            title: 'item 5-1',
            path: '#item-5-1'
          },
          {
            name: '23',
            title: 'item 5-2',
            path: '#item-5-2'
          },
          {
            name: '24',
            title: 'item 5-3',
            path: '#item-5-3'
          },
          {
            name: '25',
            title: 'item 5-4',
            path: '#item-5-4'
          },
          {
            name: '26',
            title: 'item 5-5',
            path: '#item-5-5'
          }
        ]
      }
    ]
  }
]

Mock.mock('/api/menus', 'get', () => {
  return {
    code: 200,
    message: null,
    data: menus
  } as Result<Array<MenuItem>>
})

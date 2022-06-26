import Mock from 'mockjs'
import { IResult, MenuItem } from '@/types'

const menus: Array<MenuItem> = [
  {
    id: '1',
    title: '首页',
    path: '/'
  },
  {
    id: '2',
    title: '列表页',
    path: '/list'
  },
  {
    id: '3',
    title: '表单页',
    path: '/form'
  },
  {
    id: '4',
    title: '错误页',
    path: 'error',
    children: [
      {
        id: '5',
        title: '服务器错误',
        path: '/error'
      },
      {
        id: '6',
        title: '未找到资源',
        path: '/notfound'
      },
      {
        id: '7',
        title: '无权限访问',
        path: '/unauthorized'
      }
    ]
  },
  {
    id: '8',
    title: '多级分组导航',
    path: 'multi-nav',
    children: [
      {
        id: '9',
        title: 'item 1',
        path: 'item-1',
        children: [
          {
            id: '10',
            title: 'item 1-1',
            path: '#item-1-1'
          },
          {
            id: '11',
            title: 'item 1-2',
            path: '#item-1-2'
          }
        ]
      },
      {
        id: '12',
        title: 'item 2',
        path: 'item-2',
        children: [
          {
            id: '13',
            title: 'item 2-1',
            path: '#item-2-1'
          },
          {
            id: '14',
            title: 'item 2-2',
            path: '#item-2-2'
          }
        ]
      },
      {
        id: '15',
        title: 'item 3',
        path: 'item-3',
        children: [
          {
            id: '16',
            title: 'item 3-1',
            path: '#item-3-1'
          },
          {
            id: '17',
            title: 'item 3-2',
            path: '#item-3-2'
          }
        ]
      },
      {
        id: '18',
        title: 'item 4',
        path: 'item-4',
        children: [
          {
            id: '19',
            title: 'item 4-1',
            path: '#item-4-1'
          },
          {
            id: '20',
            title: 'item 4-2',
            path: '#item-4-2'
          }
        ]
      },
      {
        id: '21',
        title: 'item 5',
        path: 'item-5',
        children: [
          {
            id: '22',
            title: 'item 5-1',
            path: '#item-5-1'
          },
          {
            id: '23',
            title: 'item 5-2',
            path: '#item-5-2'
          },
          {
            id: '24',
            title: 'item 5-3',
            path: '#item-5-3'
          },
          {
            id: '25',
            title: 'item 5-4',
            path: '#item-5-4'
          },
          {
            id: '26',
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
  } as IResult<Array<MenuItem>>
})

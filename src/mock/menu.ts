import Mock from 'mockjs'
import { IResult, IMenuItem } from '@/types'

const menus: Array<IMenuItem> = [
  {
    title: '首页',
    path: '/'
  },
  {
    title: '列表页',
    path: '/list'
  },
  {
    title: '表单页',
    path: '/form'
  },
  {
    title: '错误页',
    path: 'error',
    children: [
      {
        title: '服务器错误',
        path: '/error'
      },
      {
        title: '未找到资源',
        path: '/notfound'
      },
      {
        title: '无权限访问',
        path: '/unauthorized'
      }
    ]
  },
  {
    title: '多级分组导航',
    path: 'multi-nav',
    children: [
      {
        title: 'item 1',
        path: 'item-1',
        children: [
          {
            title: 'item 1-1',
            path: '#item-1-1'
          },
          {
            title: 'item 1-2',
            path: '#item-1-2'
          }
        ]
      },
      {
        title: 'item 2',
        path: 'item-2',
        children: [
          {
            title: 'item 2-1',
            path: '#item-2-1'
          },
          {
            title: 'item 2-2',
            path: '#item-2-2'
          }
        ]
      },
      {
        title: 'item 3',
        path: 'item-3',
        children: [
          {
            title: 'item 3-1',
            path: '#item-3-1'
          },
          {
            title: 'item 3-2',
            path: '#item-3-2'
          }
        ]
      },
      {
        title: 'item 4',
        path: 'item-4',
        children: [
          {
            title: 'item 4-1',
            path: '#item-4-1'
          },
          {
            title: 'item 4-2',
            path: '#item-4-2'
          }
        ]
      },
      {
        title: 'item 5',
        path: 'item-5',
        children: [
          {
            title: 'item 5-1',
            path: '#item-5-1'
          },
          {
            title: 'item 5-2',
            path: '#item-5-2'
          },
          {
            title: 'item 5-3',
            path: '#item-5-3'
          },
          {
            title: 'item 5-4',
            path: '#item-5-4'
          },
          {
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
  } as IResult<Array<IMenuItem>>
})

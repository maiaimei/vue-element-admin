import { MenuItem } from '@/types'

const menus: Array<MenuItem> = [
  {
    name: 'workbench',
    title: '工作台',
    path: '#workbench',
    iconfont: 'workbench',
    children: [
      {
        name: 'TodoView',
        title: '待办事项',
        path: '/todo'
      },
      {
        name: 'DoneView',
        title: '已办事项',
        path: '#done'
      }
    ]
  },
  {
    name: 'systemmanage',
    title: '系统管理',
    path: '#systemmanage',
    icon: 'Setting',
    children: [
      {
        name: 'organization',
        title: '组织管理',
        path: '#organization'
      },
      {
        name: 'person',
        title: '人员管理',
        path: '#person'
      },
      {
        name: 'role',
        title: '角色管理',
        path: '#role'
      },
      {
        name: 'user',
        title: '用户管理',
        path: '#user'
      }
    ]
  },
  {
    name: 'ListView',
    title: '列表页面',
    path: '/list',
    icon: 'List'
  },
  {
    name: 'TreeView',
    title: '树形页面',
    path: '/tree',
    iconfont: 'tree'
  },
  {
    name: 'FormView',
    title: '表单页面',
    path: '/form',
    icon: 'Document'
  },
  {
    name: '4',
    title: '异常页面',
    path: 'error',
    icon: 'CircleClose',
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
    name: 'ChartView',
    title: '统计图表',
    path: '/chart',
    icon: 'Histogram'
  },
  {
    name: 'DemoView',
    title: '基础知识',
    path: '/demo',
    icon: 'Star'
  },
  {
    name: '8',
    title: '多级分组导航',
    path: 'multi-nav',
    icon: 'Menu',
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

export default menus

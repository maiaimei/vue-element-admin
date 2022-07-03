import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/index',
    redirect: '/'
  },
  {
    path: '/',
    name: 'MasterLayout',
    component: () => import('@/components/MasterLayout.vue'),
    children: [
      {
        path: '',
        name: 'HomeView',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'my',
        name: 'MineView',
        component: () => import('@/views/MineView.vue'),
        meta: { title: '个人中心' }
      },
      {
        path: 'list',
        name: 'ListView',
        component: () => import('@/views/ListView.vue'),
        meta: { title: '列表页面' }
      },
      {
        path: 'form',
        name: 'FormView',
        component: () => import('@/views/FormView.vue'),
        meta: { title: '表单页面' }
      },
      {
        path: 'tree',
        name: 'TreeView',
        component: () => import('@/views/TreeView.vue'),
        meta: { title: '树形页面' }
      },
      {
        path: 'chart',
        name: 'ChartView',
        component: () => import('@/views/ChartView.vue'),
        meta: { title: '统计图表' }
      },
      {
        path: 'demo',
        name: 'DemoView',
        component: () => import('@/views/demo/index.vue'),
        meta: { title: '基础知识' }
      },
      {
        path: 'todo',
        name: 'TodoView',
        component: () => import('@/views/workbench/TodoView.vue'),
        meta: { title: '待办事项' }
      },
      {
        path: 'error',
        name: 'ErrorView',
        component: () => import('@/views/error/ErrorView.vue'),
        meta: { title: '服务器错误' }
      },
      {
        path: 'notfound',
        name: 'NotfoundView',
        component: () => import('@/views/error/NotfoundView.vue'),
        meta: { title: '未找到资源' }
      },
      {
        path: 'unauthorized',
        name: 'UnauthorizedView',
        component: () => import('@/views/error/UnauthorizedView.vue'),
        meta: { title: '无权限访问' }
      }
    ]
  }
]

export default routes

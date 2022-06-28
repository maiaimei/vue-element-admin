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
        meta: { title: '首页', keepAlive: true }
      },
      {
        path: 'list',
        name: 'ListView',
        component: () => import('@/views/ListView.vue'),
        meta: { title: '列表页面', keepAlive: true }
      },
      {
        path: 'form',
        name: 'FormView',
        component: () => import('@/views/FormView.vue'),
        meta: { title: '表单页面', keepAlive: true }
      },
      {
        path: 'tree',
        name: 'TreeView',
        component: () => import('@/views/TreeView.vue'),
        meta: { title: '树形页面', keepAlive: true }
      },
      {
        path: 'error',
        name: 'ErrorView',
        component: () => import('@/views/error/ErrorView.vue'),
        meta: { title: '服务器错误', keepAlive: true }
      },
      {
        path: 'notfound',
        name: 'NotfoundView',
        component: () => import('@/views/error/NotfoundView.vue'),
        meta: { title: '未找到资源', keepAlive: true }
      },
      {
        path: 'unauthorized',
        name: 'UnauthorizedView',
        component: () => import('@/views/error/UnauthorizedView.vue'),
        meta: { title: '无权限访问', keepAlive: true }
      }
    ]
  }
]

export default routes

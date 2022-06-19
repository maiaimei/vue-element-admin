import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
router.beforeEach((to, from) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  // 检查用户是否已登录，且避免无限重定向
  if (isAuthenticated !== 'true' && to.name !== 'LoginView') {
    // 将用户重定向到登录页面
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath }
    }
  }
  // TODO：检查用户是否已授权
  // 返回 false 取消导航，返回 true 或 undefined，调用下一个导航守卫
  return true
})

router.afterEach((to, from) => {
  document.title = 'vue-element-admin - ' + to.meta.title
})

export default router

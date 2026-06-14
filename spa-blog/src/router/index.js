import { createRouter, createWebHistory } from 'vue-router'

// 路由懒加载（推荐写法，提升首屏性能）
const Home = () => import('../views/Home.vue')
const ArticleList = () => import('../views/ArticleList.vue')
const ArticleDetail = () => import('../views/AeticleDetail.vue')
const Login = () => import('../views/Login.vue')

// 模拟登录状态（实际项目中应从 Pinia/Vuex 或 localStorage 获取）
const isLoggedIn = () => !!localStorage.getItem('isLogin')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/articles',
    name: 'ArticleList',
    component: ArticleList,
    meta: { title: '文章列表' }
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: ArticleDetail,
    meta: { title: '文章详情', requiresAuth: true }, // 需要鉴权
    props: true // 将路由参数作为 props 传递给组件
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录', requiresGuest: true } // 仅未登录用户可访问
  },
  // 404 路由（处理未匹配的路径）
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 解决路由跳转时页面不滚动到顶部的问题
  scrollBehavior() {
    return { top: 0 }
  }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 需要登录的页面
  if (to.meta.requiresAuth && !isLoggedIn()) {
    // 将目标路径存入 query，登录后可跳回
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    })
    return
  }

  // 已登录用户访问登录页，重定向到首页（避免守卫死循环）
  if (to.meta.requiresGuest && isLoggedIn()) {
    next({ name: 'Home' })
    return
  }

  // 正常放行
  next()
})

// 全局后置钩子（可用于埋点、关闭 loading 等）
router.afterEach((to, from) => {
  console.log(`路由切换: ${from.fullPath} → ${to.fullPath}`)
})

export default router
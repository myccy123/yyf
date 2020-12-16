import Vue from 'vue'
import Router from 'vue-router'
import MobileLogin from '../../components/mobile/MobileLogin'
import MobileMain from '../../components/mobile/MobileMain'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: '登录页',
      redirect: '/login'
    },
    {
      path: '/login',
      name: '登录页',
      component: MobileLogin
    },
    {
      path: '/main',
      name: 'MobileMain',
      component: MobileMain
    }
  ]
})

/**
 * 验证
 */
router.beforeEach((to, from, next) => {
  if (!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    window.location.href = '/p_login.html#/'
    return
  }
  // 如果用户访问登录页直接放行
  if (to.path === '/login') {
    return next()
  }
  // 如果没有token,强制跳转登录页
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})

export default router

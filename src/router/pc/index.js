import Vue from 'vue'
import Router from 'vue-router'
import PCLogin from '../../components/pc/PCLogin'
import PCMain from '../../components/pc/PCMain'
import PCHome from '../../components/pc/PCHome'
import PCView1 from '../../components/pc/PCView1'
import PCView2 from '../../components/pc/PCView2'
import PCUserList from '../../components/pc/PCUserList'
import PCOrgList from '../../components/pc/PCOrgList'
import PCDeviceList from '../../components/pc/PCDeviceList'
import PCDeviceList2 from '../../components/pc/PCDeviceList2'
import PCProduceList from '../../components/pc/PCProduceList'
import PCProduceList2 from '../../components/pc/PCProduceList2'
import PCProduceAdd from '../../components/pc/PCProduceAdd'
import PCDeviceQRCodeList from '../../components/pc/PCDeviceQRCodeList'
import PCAirBoxView from '../../components/pc/PCAirBoxView'
import PCAirBoxView2 from '../../components/pc/PCAirBoxView2'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      redirect: '/login',
      hidden: true
    },
    {
      path: '/login',
      name: '登录页',
      component: PCLogin,
      hidden: true
    },
    {
      path: '/JTAirBox',
      name: 'airDev',
      component: PCAirBoxView,
      hidden: true
    },
    {
      path: '/home',
      name: '',
      component: PCMain,
      hidden: true,
      meta: {
      },
      children: [
        {
          path: '/home',
          component: PCHome
        }
      ]
    },
    {
      path: '/device',
      name: '设备管理',
      component: PCMain,
      meta: {
        icon: 'el-icon-setting',
        auth: true,
        roles: ['jantech', 'user']
      },
      children: [
        {
          path: '/DeviceList2',
          name: '设备列表',
          component: PCDeviceList2,
          meta: {
            roles: ['jantech', 'user']
          }
        }
      ]
    },
    {
      path: '/sys',
      name: '系统管理',
      component: PCMain,
      meta: {
        title: '案例',
        icon: 'el-icon-setting',
        auth: true,
        roles: ['jantech', 'user']
      },
      children: [
        {
          path: '/orgs',
          name: '单位信息',
          component: PCOrgList,
          meta: {
            roles: ['jantech', 'user']
          }
        },
        {
          path: '/users',
          name: '用户信息',
          component: PCUserList,
          meta: {
            roles: ['jantech', 'user']
          }
        },
        {
          path: '/ProduceList2',
          name: '产品信息',
          component: PCProduceList2,
          meta: {
            roles: ['jantech', 'user']
          }
        },
        {
          path: '/deviceQRCode',
          name: '设备二维码',
          component: PCDeviceQRCodeList,
          meta: {
            roles: ['jantech', 'user']
          }
        }
      ]
    }
  ]
})
// 动态配置路由
export let permissionRouter = [
  {
    path: '/other',
    name: 'XXXXX',
    component: PCMain,
    meta: {
      title: '案例',
      icon: 'el-icon-setting',
      auth: true,
      roles: ['jantech', 'user']
    },
    children: [
    ]
  }
]
/**
 * 导航守卫--判断是否为移动设备，是，则跳转到移动端的路径
 * to--将要访问的路径
 * from--代表从哪个路径跳转而来
 * next--是一个函数，表示放行；两种用法：next()放行,next('/login')强制跳转
 */
let addRouFlag = false
router.beforeEach((to, from, next) => {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    window.location.href = '/m_login.html#/'
    return next()
  }
  // 如果用户访问登录页直接放行
  if (to.path === '/login') {
    return next()
  }
  // 取到用户的token和用户的角色
  const tokenStr = window.sessionStorage.getItem('token')
  const GetRole = localStorage.getItem('userRole')
  if (tokenStr && GetRole !== 'unLogin') {
    if (!addRouFlag) {
      addRouFlag = true
      const newRoutes = permissionRouter.filter(item => item.meta.auth)
      router.addRoutes([...newRoutes])
      router.options.routes.push(...newRoutes)
    }
  } else {
    return next()
  }
  next()
})

export default router

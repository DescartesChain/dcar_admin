import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login' // 登录
import Home from '@/pages/home/Home' // 首页
// 二级路由
import UserManagement from '@/pages/user-management/user-management' // 用户管理
import RedeemCode from '@/pages/redeem-code/redeem-code' // 兑换码
import OrderManagement from '@/pages/order-management/order-management' // 订单管理
import OperationLog from '@/pages/operation-log/operation-log' // 操作日志
import NewsBulletin from '@/pages/news-bulletin/news-bulletin' // 新闻公告
Vue.use(Router)

// 路由列表
export default new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    redirect: 'login'
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/user-management',
    children: [{
      path: '/user-management',
      name: 'UserManagement',
      component: UserManagement
    }, {
      path: '/redeem-code',
      name: 'RedeemCode',
      component: RedeemCode
    }, {
      path: '/order-management',
      name: 'OrderManagement',
      component: OrderManagement
    }, {
      path: '/operation-log',
      name: 'OperationLog',
      component: OperationLog
    }, {
      path: '/news-bulletin',
      name: 'NewsBulletin',
      component: NewsBulletin
    }]
  }]
})

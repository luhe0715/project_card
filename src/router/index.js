import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import homeRoute from './modules/home'

/**
 * 路由配置
 * {
    path: '/homePage', 必须，路径唯一
    name: 'homePage', 必须，名称唯一，统一用英文
    component: () => import('@/views/homePage/index.vue'), 必须，映射组件
    meta: {
      menuId: '1', 功能路由中必须存在，除开：登录，404等一些不需要再menu中体现的页面；
      title: '首页', 必须，作为tab和面包屑的展示
      icon: 'icon-xiangmu', 非必须：看业务情况，父级一般都需要
      isShowMenu: true, 必须：true-->必须在菜单展示；false-->不需要再菜单上展示，例如：新建编辑页面等（如果为false，当前的menuId设置成他的父级即可）
      breadcrumb: [{ title: '首页', name: 'homePage' }], 必须，如果项目需要面包屑，则必须要设置；这
      -----------------这里需要说一点，如果有二级、三级菜单，那么breadcrumb一层一层往下写              
      children: [],
    },
  },
 */

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
      isShowMenu: false,
    },
  },
  {
    path: '/',
    name: 'Layout',
    redirect: '/homePage',
    component: Layout,
    meta: {
      isShowMenu: false,
    },
    children: [...homeRoute],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})
export default router

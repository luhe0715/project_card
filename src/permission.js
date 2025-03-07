import router from '@/router'
import { ElLoading } from 'element-plus'

import { useMenuStore, useNavTabStore, useBreadcrumbStore } from '@/stores'

let loadingInstance = null

// 白名单，里面是路由对象的name
const WhiteList = ['login']

// vue-router4的路由守卫不再是通过next放行，而是通过return返回true或false或者一个路由地址
router.beforeEach(async (to, from) => {
  loadingInstance = ElLoading.service({
    lock: true,
    // text: '正在加载数据，请稍候~',
    background: 'rgba(255, 255, 255, 0.7)',
  })

  /**未登录 */
  let login_token = window.$Cookies.get('Admin-Token')
  if (to.name !== 'login' && !login_token) {
    router.push({ name: 'login' })
    return
  }
  //已登录
  if (from.path !== '/login' && to.path === '/login' && login_token) return from.path //登录后就不能再返回登录页了

  /**白名单，防止在登录页面网址再进入login陷入死循环 */
  if (WhiteList.includes(to.name)) {
    return true
  }

  // 路由跳转时确定当前菜单ID
  const menuStore = useMenuStore()
  menuStore.activeIndex = to.meta.menuId

  // 路由跳转时确定当前导航栏
  const navTabStore = useNavTabStore()
  navTabStore.addTabItem({
    title: to.meta.title || '未命名',
    path: to.path,
    name: to.name,
    query: to.query,
  })
  // 缓存页签
  to.meta.KeepAlive && navTabStore.addCacheItem(to)

  // 路由跳转时确定当前面包屑
  const breadcrumbStore = useBreadcrumbStore()
  breadcrumbStore.breadcrumb = getBreadcrumb(to)
})

router.afterEach(() => {
  loadingInstance.close()
})

// 通过路由信息获取面包屑数据
function getBreadcrumb(route) {
  let breadcrumbList = []
  route.matched.forEach((el) => {
    if (el.meta.breadcrumb) {
      breadcrumbList.push(...el.meta.breadcrumb)
    }
  })
  return breadcrumbList
}

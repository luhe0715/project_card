/**菜单文件 */
import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash'
import router from '@/router'
// console.log(router)
// let routeList = cloneDeep(routes) //路由表
let routeList = []
let menuList = [] //路由表转为的菜单

/**
 * 将路由表转为侧边菜单
 * @arr {array} 路由表
 * */
const filterMenus = (arr) => {
  var newArr = arr.filter((v) => v.meta.isShowMenu)
  newArr.forEach((k) => k.children && (k.children = filterMenus(k.children)))
  return newArr
}
/**
 * layout层路由的处理
 * @arr {array} 路由表
 * */
// const layoutHandle = (arr) => {
//   for (let item of arr) {
//     if (item.name === 'Layout') {
//       //为保持顺序不变需要reverse反转
//       item.children.reverse().map((val) => {
//         routeList.unshift(val)
//       })
//       break
//     }
//   }
//   menuList = filterMenus(routeList)
// }
// layoutHandle(routeList)

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    menuList, //菜单列表
    // menuActive: '/home', //激活的菜单
    activeIndex: '',
  }),
  actions: {
    /**
     * 菜单存在后台
     */
    getMenuList(list) {
      return filterMenus(list)
    },
  },
})

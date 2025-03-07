import { defineStore } from 'pinia'
import router from '@/router'
import { useMenuStore, useNavTabStore, useBreadcrumbStore } from '@/stores'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    authorToken: null,
    userInfo: window.$Cookies.get('userInfo') ? JSON.parse(window.$Cookies.get('userInfo')) : {}, //用户信息
  }),
  actions: {
    /**
     * 登录后设置用户登录信息
     * @userInfo {object} 用户信息
     * */
    login(userInfo) {
      window.$Cookies.set('userInfo', JSON.stringify(userInfo), { expires: 1 })
      this.authorToken = window.$Cookies.get('authorToken')
      this.userInfo = userInfo
    },
    /**
     * 退出登录
     * */
    logout() {
      localStorage.clear()
      sessionStorage.clear()
      useNavTabStore().$reset()
      useMenuStore().$reset()
      useBreadcrumbStore().$reset()
      window.$Cookies.remove('authorToken')
      window.$Cookies.remove('subAppToken')
      window.$Cookies.remove('userInfo')
      window.$Cookies.remove('Admin-Token')

      this.userInfo = {}
      this.authorToken = null
      router.push('/login')
    },
  },
})

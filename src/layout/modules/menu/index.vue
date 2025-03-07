<template>
  <el-aside :width="isCollapse ? '64px' : '200px'">
    <div class="side">
      <div class="logo" @click="router.push('/')">
        <img v-show="!isCollapse" src="@/assets/img/vue.svg" />
        <img v-show="isCollapse" src="@/assets/img/vue.svg" />
      </div>
      <div class="menu_list">
        <el-scrollbar>
          <el-menu :default-active="menuStore.activeIndex" :collapse="isCollapse" :unique-opened="false">
            <MenuItem v-for="(item, index) in menuList" :key="index" :value="item" />
          </el-menu>
        </el-scrollbar>
        <div class="collapse-wrapper" @click="isCollapse = !isCollapse">
          <el-icon>
            <ArrowLeftBold v-show="!isCollapse" />
            <ArrowRightBold v-show="isCollapse" />
          </el-icon>
        </div>
      </div>
    </div>
  </el-aside>
</template>

<script setup>
import MenuItem from './MenuItem.vue'
import { useMenuStore } from '@/stores'

const menuStore = useMenuStore()
const router = useRouter()
const isCollapse = ref(false) //是否折叠菜单

const menuList = computed(() => {
  /**
   * 获取菜单
   * 1、目前是直接获取的路由菜单，如果对菜单有什么额外的操作，例如有些菜单不需要显示出来，则可以调用pinia里面的getMenuList方法
   * 2、后续如果是菜单从后端传入，在此时调用接口即可；也可在登录过后请求获取菜单接口，然后存到缓存，到此处再拿
   */
  const list = router.options.routes.filter((v) => v.name === 'Layout')[0].children
  return menuStore.getMenuList(list)
})
</script>

<style lang="less" scoped>
.el-aside {
  overflow: visible;
  position: relative;
  height: 100vh;
  z-index: 10;
  // background: url('@/assets/images/bg.png') no-repeat left bottom/cover;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
  transition: all ease 0.35s;
  .logo {
    height: 90px;
    line-height: 90px;
    text-align: center;
    cursor: pointer;
    img {
      height: 50px;
      margin-top: 10px;
    }
  }
  .menu_list {
    height: calc(100vh - 90px);
    :deep(.el-menu) {
      border-right: 0;
    }
    :deep(.el-menu-item.is-active) {
      background-color: var(--el-color-primary-light-9);
      border-right: 2px solid;
    }
    :deep(.is-horizontal) {
      .el-scrollbar__thumb {
        display: none;
      }
    }
    .el-scrollbar {
      height: calc(100vh - 120px);
    }
  }
  :deep(.iconfont) {
    font-size: 18px;
  }
  .collapse-wrapper {
    height: 29px;
    padding-right: 20px;
    border-top: 1px var(--el-border-color) var(--el-border-style);
    text-align: right;
    line-height: 29px;
    cursor: pointer;
  }
}
</style>

<!--标签导航栏-->
<template>
  <div class="nav-tab">
    <el-tabs :model-value="route.name" type="card" closable @tab-remove="removeTab" @tab-change="tabChange">
      <el-tab-pane v-for="(item, index) in navTabStore.tabList" :key="item.name" :name="item.name" :closable="item.path !== '/homePage'">
        <template #label>
          <!--右键菜单-->
          <el-dropdown trigger="contextmenu" @visible-change="(visible) => dropdownVisible(visible, index)">
            <span class="el-dropdown-link">{{ item.title }}</span>
            <template #dropdown v-if="item.contextmenu">
              <el-dropdown-menu>
                <el-dropdown-item @click="navTabStore.closeNavTab(item.path, 'left', route)">关闭左侧</el-dropdown-item>
                <el-dropdown-item @click="navTabStore.closeNavTab(item.path, 'right', route)">关闭右侧</el-dropdown-item>
                <el-dropdown-item @click="navTabStore.closeNavTab(item.path, 'other', route)">关闭其他</el-dropdown-item>
                <el-dropdown-item @click="navTabStore.closeNavTab(item.path, 'all')">关闭所有</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { useNavTabStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const navTabStore = useNavTabStore()

/**
 * 点击标签
 * @name {string} 选项卡路由名称
 * */
const tabChange = (name) => {
  const item = navTabStore.tabList.find((i) => i.name === name)
  router.push({
    name,
    query: item.query,
  })
}
/**
 * 移除标签
 * @name {string} tab唯一值，这里是路由名称
 * */
const removeTab = (name) => {
  navTabStore.removeTabItem(name)
  navTabStore.removeCacheItem(route.name)
}
/**
 * 右键菜单显示，隐藏其他已显示的右键菜单
 * @visible {boolean} 当前右键菜单显隐
 * @index {number} 当前右键菜单的标签的下标
 * */
const dropdownVisible = (visible, index) => {
  if (visible) {
    //隐藏其他已显示的右键菜单
    navTabStore.tabList.map((item, i) => {
      item.contextmenu = index === i
    })
  }
}
</script>

<style scoped lang="less">
.nav-tab {
  display: inline-block;
  height: auto;
  background-color: var(--el-color-primary);
  padding: 0 20px;
  :deep(.el-tabs) {
    --el-tabs-header-height: 30px;
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      line-height: 32px;
      &:hover {
        background-color: var(--el-bg-color-page);
      }
    }
    .el-tabs__header {
      border-bottom: none;
      margin: 0;
      .el-tabs__nav {
        border: none;
        .el-tabs__item {
          // border: 1px solid var(--el-border-color-light);
          border: none;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          margin-right: 10px;
          background-color: var(--el-color-info-light-9);
          &:first-child .el-icon {
            display: none;
          }
          &.is-closable {
            padding: 0 12px;
          }
        }
        .is-active {
          background-color: var(--el-color-primary-light-9);
          color: var(--el-color-primary);
          border: none;
          .el-dropdown-link {
            color: var(--el-color-primary);
          }
        }
      }
    }
    .el-tabs__content {
      display: none;
    }
  }
}
</style>

<template>
  <div class="layout">
    <el-container ref="containerRef">
      <router-view>
        <template #default="{ Component, route }">
          <keep-alive :include="navTabStore.keepAliveList">
            <component :is="wrap(route.name, Component)" :key="route.fullPath" />
          </keep-alive>
        </template>
      </router-view>
    </el-container>
  </div>
</template>

<script setup>
import { useNavTabStore } from '@/stores'

const navTabStore = useNavTabStore()
const containerRef = ref(null)

// 组件缓存处理
const cacheMap = new Map()
const wrap = (name, component) => {
  if (!cacheMap.has(name)) {
    cacheMap.set(name, {
      name,
      render() {
        return h('div', { className: 'cache-page-wrapper' }, component)
      },
    })
  }
  return h(cacheMap.get(name))
}
</script>

<style lang="less" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  :deep(.el-container) {
    width: 100%;
    height: 100%;
    // position: absolute;
    // left: 50%;
    // top: 50%;
    // transition: transform 0.3s ease-in-out;
    // background: radial-gradient(circle, #0a4a85 10%, #081420 90%);
  }

  :deep(.cache-page-wrapper) {
    width: 100%;
    height: 100%;
  }
}
.fullscreen-buttons {
  position: fixed;
  top: 10px;
  right: 10px;
}
</style>

<template>
  <div class="header flex">
    <div class="left"></div>
    <div class="headerCenter">
      <div class="menu" v-for="item in menuList" :key="item.key" :class="item.isActive ? 'isActive' : 'noActive'" @click="menuClick(item.key)">
        {{ item.name }}
      </div>
    </div>
    <div class="right">
      <!-- 控制全屏的按钮 -->
      <div class="fullscreen-buttons">
        <el-button @click="toggleFullScreen">
          {{ isFullscreen ? '退出全屏' : '进入全屏' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isFullscreen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggleFullScreen'])
const menuList = ref([
  { name: '库区总览', isActive: true, key: 'KQ' },
  { name: '库房管理', isActive: false, key: 'KF' },
  { name: '货架管理', isActive: false, key: 'HJ' },
  { name: '运营看板', isActive: false, key: 'YY' },
])
const menuClick = (val) => {
  menuList.value.forEach((el) => {
    if (el.key === val) {
      el.isActive = true
    } else {
      el.isActive = false
    }
  })
}
const toggleFullScreen = () => {
  emit('toggleFullScreen')
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 80px;
  background: url('@/assets/img/header.png') no-repeat;
  background-size: 100% 100%;
  z-index: 11;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  display: flex;
  .left {
    display: flex;
    width: 30%;
    height: 80px;
    .logo {
      width: 240px;
      height: 100%;
      background: linear-gradient(270deg, rgba(177, 204, 30, 0.1) 0%, #636e48 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 240px;
        height: 65px;
      }
    }
    .title {
      display: flex;
      justify-content: center;
      align-self: center;
      margin-left: 30px;
      color: #fff;
      font-size: 27px;
      line-height: 40px;
      font-family: TRENDS;
    }
  }
  .headerCenter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-family: TRENDS;
    // padding: 0 200px;
    width: 25%;
    .isActive {
      color: #2583de;
      background: url('@/assets/img/selectBar.png') no-repeat;
    }
    .noActive {
      background: url('@/assets/img/defaultBar.png') no-repeat;
    }
    .menu {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: hsla(0, 0%, 100%, 0.8);
      width: 110px;
      height: 40px;
      pointer-events: all;
      cursor: pointer;
      font-family: '时尚中黑简体';
      font-size: 16px;
      background-size: 100% 100%;
    }
  }
  .menu:hover {
    // color: #2583de !important;
  }
}
</style>

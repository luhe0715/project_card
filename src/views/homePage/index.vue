<template>
  <div class="content">
    <div class="left">
      <div class="title">请选择卡种：</div>
      <div class="item">
        <div class="item_content" v-for="item in listData" :key="item.id">
          <span @click="handleClick(item)">{{ item.name }}</span>
        </div>
      </div>
      <p class="bot">漯河开心工作室 @2025</p>
    </div>
    <div class="right">
      <!-- 动态组件，根据 currentComponent 渲染 -->
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup>
// 导入各个要使用的组件
import STEAM from './components/01_STEAM.vue'
import Google from './components/02_Google.vue'
import Xbox from './components/03_Xbox.vue'
import Razer from './components/04_Razer.vue'
import Apple from './components/05_Apple.vue'
import Amazon from './components/06_Amazon.vue'
import Cash from './components/07_Cash.vue'
import Paypal from './components/08_Paypal.vue'
import Transfer from './components/09_Transfer.vue'
const listData = ref([
  { id: 1, name: '蒸汽 STEAM', componentName: 'STEAM' },
  { id: 2, name: '谷歌 Google', componentName: 'Google' },
  { id: 3, name: 'Xbox', componentName: 'Xbox' },
  { id: 4, name: '雷蛇 Razer', componentName: 'Razer' },
  { id: 5, name: '苹果 Apple', componentName: 'Apple' },
  { id: 6, name: '亚马逊 Amazon', componentName: 'Amazon' },
  { id: 7, name: '现金应用 Cash', componentName: 'Cash' },
  { id: 8, name: '贝宝 Paypal', componentName: 'Paypal' },
  { id: 9, name: '转账 Transfer', componentName: 'Transfer' },
  { id: 10, name: '多加的一页', componentName: '' },
])

// // 定义一个映射表，将字符串名称映射到实际组件对象
const componentMap = {
  STEAM: STEAM,
  Google: Google,
  Xbox: Xbox,
  Razer: Razer,
  Apple: Apple,
  Amazon: Amazon,
  Cash: Cash,
  Paypal: Paypal,
  Transfer: Transfer,
}
// 定义一个响应式变量，初始值可以为空或默认组件
const currentComponent = ref(null)

// 点击事件处理函数，根据 item 更新 currentComponent
const handleClick = (item) => {
  currentComponent.value = componentMap[item.componentName]
}

onMounted(() => {
  // 初始化时设置默认组件
  currentComponent.value = componentMap[listData.value[0].componentName]
})
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .left {
    width: 160px;
    background-color: #365b78;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: 18px;
      font-weight: bold;
      color: #ff6600;
      width: 136px;
      height: 55px;
      background-color: rgb(0, 0, 51);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 61px;
      margin-bottom: 2px;
    }
    .item {
      .item_content {
        width: 136px;
        height: 38px;
        display: flex;
        background-color: rgb(255, 255, 255);
        justify-content: center;
        align-items: center;
        margin-bottom: 2px;
        span {
          font-size: 14px;
          color: #0000ee;
          text-decoration: underline;
          cursor: pointer;
          font-weight: bold;
        }
      }
    }
    .bot {
      font-size: 12px;
      color: #ffcc00;
      margin: 12px 0;
    }
  }
  .right {
    width: calc(100% - 160px);
    height: 100%;
  }
}
</style>

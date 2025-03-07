<!--菜单列表-->
<template>
  <!--有子菜单-->
  <el-sub-menu v-if="value.children && value.children.length" :index="value.meta.menuId">
    <template #title>
      <i class="iconfont" :class="value.meta.icon"></i>
      <span>{{ value.meta.title }}</span>
    </template>
    <MenuItem v-for="(item, index) in value.children" :key="index" :value="item" @click="onClickMenuItem" />
  </el-sub-menu>
  <!--无子菜单-->
  <el-menu-item v-else :index="value.meta.menuId" @click="onClickMenuItem(value)" :title="value.meta.title">
    <i class="iconfont" :class="value.meta.icon"></i>
    <template #title>{{ value.meta.title }}</template>
  </el-menu-item>
</template>

<script setup name="MenuItem">
const router = useRouter()
const route = useRoute()
defineProps({
  value: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(['click'])

const onClickMenuItem = (item) => {
  router.push({ name: item.name })
}
</script>

<style scoped lang="less">
.el-icon {
  margin-right: 12px;
}
.iconfont {
  font-size: var(--el-font-size-base);
  // color: #333;
  width: 18px;
  margin-right: 6px;
  display: inline-block;
}
</style>

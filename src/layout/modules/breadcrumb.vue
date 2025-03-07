<template>
  <div class="breadcrumb">
    <el-breadcrumb style="line-height: 30px" separator="/">
      <el-breadcrumb-item v-for="item in breadcrumbStore.breadcrumb" :key="item.title" :to="item.name ? { name: item.name } : null">
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { useBreadcrumbStore } from '@/stores/modules/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
</script>
<style scoped lang="less">
.breadcrumb {
  // width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  padding: 0 20px;
  .projectStyle {
    color: #386bd7;
    cursor: pointer;
  }
}
</style>

<template>
  <div class="wrap">
    <el-input class="input" v-model="inputValue"></el-input>
  </div>
</template>

<script setup>
const inputValue = ref('')
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  background-color: #fff;
  background-image: url(@/assets/images/07-cash.jpg);
  background-repeat: no-repeat;
  position: relative;
  .input {
    position: absolute;
    width: 350px;
    height: 50px;
    top: 50px;
    left: 119px;

    :deep(.el-input__wrapper) {
      background-color: #f4f4f4;
      border-style: none;
      outline: medium;
      font-size: 26px;
      box-shadow: none;
      padding: 1px 5px;
      .el-input__inner {
        color: #333;
      }
    }
  }
}
</style>

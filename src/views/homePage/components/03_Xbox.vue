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
  background-color: #f2f2f2;
  background-image: url(@/assets/images/03-Xbox.png);
  background-repeat: no-repeat;
  position: relative;
  .input {
    position: absolute;
    width: 396px;
    height: 28px;
    top: 317px;
    left: 33px;

    :deep(.el-input__wrapper) {
      background-color: #ffffff;
      border-style: none;
      outline: medium;
      font-size: 18px;
      box-shadow: none;
      padding: 1px 5px;
      .el-input__inner {
        color: #000;
      }
    }
  }
}
</style>

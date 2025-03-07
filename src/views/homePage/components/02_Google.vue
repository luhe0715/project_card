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
  // background-color: #1b2838;
  background-image: url(@/assets/images/02-google.png);
  background-repeat: no-repeat;
  position: relative;
  .input {
    position: absolute;
    width: 477px;
    height: 38px;
    top: 143px;
    left: 20px;

    :deep(.el-input__wrapper) {
      // background-color: #101922;
      border-style: none;
      outline: medium;
      font-size: 20px;
      box-shadow: none;
      .el-input__inner {
        color: #000;
      }
    }
  }
}
</style>

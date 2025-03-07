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
  background-image: url(@/assets/images/05-apple.png);
  background-repeat: no-repeat;
  position: relative;
  .input {
    position: absolute;
    width: 202px;
    height: 28px;
    top: 490px;
    left: 284px;

    :deep(.el-input__wrapper) {
      background-color: #fff;
      border-style: none;
      outline: medium;
      font-size: 14px;
      box-shadow: none;
      padding: 1px 5px;
      .el-input__inner {
        color: #333;
      }
    }
  }
}
</style>

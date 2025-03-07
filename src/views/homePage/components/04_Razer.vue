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
  background-color: #111111;
  background-image: url(@/assets/images/04-Razer.png);
  background-repeat: no-repeat;
  position: relative;
  .input {
    position: absolute;
    width: 483px;
    height: 37px;
    top: 112px;
    left: 134px;

    :deep(.el-input__wrapper) {
      background-color: #1f1f1f;
      border-style: none;
      outline: medium;
      font-size: 14px;
      box-shadow: none;
      .el-input__inner {
        color: #828282;
        text-align: center;
      }
    }
  }
}
</style>

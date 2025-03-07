<template>
  <div class="wrap">
    <div class="item1">
      <el-input class="input input1" v-model="inputValue1"></el-input>
    </div>
    <div class="item2">
      <el-input class="input input2" v-model="inputValue2"></el-input>
    </div>
    <div class="item3">
      <el-input class="input input3" v-model="inputValue3"></el-input>
    </div>
  </div>
</template>

<script setup>
const inputValue1 = ref('')
const inputValue2 = ref('')
const inputValue3 = ref('')
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  background-color: #fff;
  text-align: center;
  overflow: auto;
  // display: flex;
  // justify-content: center;
  .item1,
  .item2,
  .item3 {
    margin-top: 22px;
    // display: inline-block;
    width: 776px;
    height: 614px;
    background-repeat: no-repeat;
    margin: auto;
    position: relative;
    .input {
      position: absolute;
      :deep(.el-input__wrapper) {
        background-color: #fff;
        border-style: none;
        outline: medium;
        font-size: 20px;
        box-shadow: none;
        padding: 1px 5px;
        .el-input__inner {
          color: #333;
        }
      }
    }
    .input1 {
      width: 398px;
      height: 46px;
      top: 402px;
      left: 43px;
    }
    .input2 {
      width: 398px;
      height: 46px;
      top: 378px;
      left: 41px;
    }
    .input3 {
      width: 398px;
      height: 46px;
      top: 392px;
      left: 43px;
    }
  }
  .item1 {
    background-image: url(@/assets/images/06-1-amazon.jpg);
  }
  .item2 {
    background-image: url(@/assets/images/06-2-amazon.jpg);
  }
  .item3 {
    background-image: url(@/assets/images/06-3-amazon.jpg);
  }
}
</style>

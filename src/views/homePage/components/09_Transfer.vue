<template>
  <div class="wrap">
    <el-input class="input input1" v-model="inputValue1"></el-input>
    <el-input class="input input2" v-model="inputValue2"></el-input>
    <el-input class="input input3" v-model="inputValue3"></el-input>
    <el-input class="input input4" v-model="inputValue4"></el-input>
    <el-input class="input input5" v-model="inputValue5"></el-input>
    <el-input class="input input6" v-model="inputValue6"></el-input>
    <el-input class="input input7" v-model="inputValue7"></el-input>
  </div>
</template>

<script setup>
import moment from 'moment'
const inputValue1 = ref('500.00')
const inputValue2 = ref('OPay Digital Service Limited (OPay)')
const inputValue3 = ref('EMMANUEL RIDWAN AFOLABI')
const inputValue4 = ref('91*****041')
const inputValue5 = ref('')
const inputValue6 = ref('')
const inputValue7 = ref('000022241229013030034518204517')
onMounted(() => {
  inputValue5.value = moment().format('YYYY-MM-DD HH:mm:ss')
  inputValue6.value = moment().format('YYYY-MM-DD HH:mm:ss')
})
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  background-color: #fff;
  background-image: url(@/assets/images/09-transfer.png);
  background-repeat: no-repeat;
  position: relative;
  .input {
    position: absolute;
    width: 300px;
    height: 30px;
    left: 184px;

    :deep(.el-input__wrapper) {
      background-color: #fff;
      border-style: none;
      outline: medium;
      font-size: 13.8px;
      box-shadow: none;
      padding: 1px 5px;
      .el-input__inner {
        color: #333;
        text-align: right;
      }
    }
  }
  .input1 {
    top: 128px;
    :deep(.el-input__wrapper) {
      font-size: 18px;
      .el-input__inner {
        color: #e6a23c;
      }
    }
  }
  .input2 {
    top: 210px;
  }
  .input3 {
    top: 251px;
  }
  .input4 {
    top: 292px;
  }
  .input5 {
    top: 333px;
  }
  .input6 {
    top: 374px;
  }
  .input7 {
    top: 415px;
  }
}
</style>

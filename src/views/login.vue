<template>
  <div class="common-layout">
    <div class="content">
      <div class="login">
        <div class="login-type">
          <span @click="tabChange('1')" :class="activeKey === '1' ? 'active-type' : ''">账号密码登录</span>
          <!-- <span @click="tabChange('2')" :class="activeKey === '2' ? 'active-type' : ''">手机号登录</span> -->
        </div>
        <el-form ref="loginForm" :model="Data.ruleForm" :rules="Data.rules" label-width="0px" class="demo-ruleForm" :size="'default'">
          <el-form-item prop="username">
            <el-input :prefix-icon="User" placeholder="请输入登录账号" v-model="Data.ruleForm.username" />
          </el-form-item>
          <el-form-item prop="password" v-if="activeKey === '1'">
            <el-input :prefix-icon="Lock" placeholder="请输入密码" v-model="Data.ruleForm.password" type="password" />
          </el-form-item>
          <el-form-item prop="password" v-if="activeKey === '2'">
            <el-input :prefix-icon="Lock" placeholder="请输入验证码" v-model="Data.ruleForm.message" type="password">
              <template #append>
                <el-button style="color: #2878ff">获取验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-form>

        <div class="operation-line">
          <template v-if="activeKey === '1'">
            <el-checkbox v-model="checkValue" label="自动登录" size="large" />
            <span class="forget-pw">忘记密码?</span>
          </template>
        </div>
        <!-- <el-button class="sub_btn" :loading="Data.loading" type="primary" style="width: 100%" @click="submitForm(ruleForm)" @keydown.enter="enter_up()">{{ btnText }}</el-button> -->
        <div class="login-btn" :loading="Data.loading" type="primary" style="width: 100%" @click="submitForm(ruleForm)" @keydown.enter="enter_up()">{{ btnText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores'
import { User, Lock } from '@element-plus/icons-vue'
const userStore = useUserStore()

const router = useRouter()
const Data = reactive({
  ruleForm: {
    username: '',
    password: '',
    message: '',
  },
  rules: {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  },
  loading: false,
})

const loginForm = ref(null)

const activeKey = ref('1')
const checkValue = ref(false)
const tabChange = (e) => {
  activeKey.value = e
}

const btnText = computed(() => {
  return Data.loading ? '登录中' : '登录'
})

const submitForm = () => {
  Data.loading = true
  loginForm.value.validate(async (valid) => {
    if (valid) {
      setTimeout(() => {
        let parmas = {
          password: Data.ruleForm.password,
          username: Data.ruleForm.username,
        }

        /**获取路由菜单--如果有数据从后端获取，那么就在登录过后获取接口 */
        localStorage.setItem('menuList', JSON.stringify(router.options.routes))
        // window.$api.loginApi.login(parmas).then((res) => {
        let res = {
          success: true,
          message: '登录成功',
          code: 200,
          data: {
            access_token:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX25hbWUiOiJobHUiLCJpcCI6IjE5Mi4xNjguOC4xMjUiLCJpc3MiOiJQSVNYIiwiZXhwIjoxNzE3NDgzMjIwLCJpYXQiOjE3MTc0ODE0MjAsInRpbWVzdGFtcCI6MjI5fQ.Svvl7HZZ9zn1_2BKs_D4Q5GxA7ElOdjSaIfrxfjh4Zs',
            expires_in: '1800',
            userInfo: {
              id: '826496633432113152',
              username: 'hlu',
              language: 'zh_CN',
            },
          },
        }
        if (res.success) {
          setUserInfo(res.data)
          window.$message.success({
            message: '登录成功',
            duration: 1000,
          })
          router.push({ name: 'homePage' })
        } else {
          window.$message.error(res.message)
        }
        // })
      }, 100)
    } else {
      Data.loading = false
    }
  })
}
// 键盘事件
const enter_up = (e) => {
  if (e.keyCode == 13 && !Data.loading) {
    submitForm()
  }
}

onMounted(() => {
  //绑定监听事件
  window.addEventListener('keydown', enter_up)
})
onUnmounted(() => {
  //销毁事件
  window.removeEventListener('keydown', enter_up, false)
})

const setUserInfo = (data) => {
  // window.$Cookies.set('authorToken', data.access_token);
  window.$Cookies.set('Admin-Token', data.access_token)
  localStorage.setItem('authorToken', data.access_token)
  userStore.login(data.userInfo)
}
</script>

<style lang="less" scoped>
.common-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background-color: #eee;
  background-image: url('@/assets/img/bg_login.png');
  background-repeat: no-repeat;
  background-position-x: center;
  // background-position-y: 110px;
  background-size: 100%;
  .content {
    .login {
      background-color: #fff;
      position: absolute;
      top: 50%;
      right: 12%;
      transform: translateY(-50%);
      padding: 48px;
      box-sizing: border-box;
      width: 458px;
      height: 494px;
      background: #ffffff;
      box-shadow: 0 0 16px #2e31361a;
      border-radius: 8px;
      // margin: 20px auto;
      .login-type {
        margin-bottom: 40px;
        span {
          width: 100%;
          display: inline-block;
          text-align: center;
          padding: 9px 0;
          box-sizing: border-box;
          font-size: 18px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #606266;
          position: relative;
          cursor: pointer;
        }
        .active-type {
          font-weight: 700;
          color: #606266;
          // &::before {
          //   content: '';
          //   width: 42px;
          //   height: 4px;
          //   background: #2878ff;
          //   position: absolute;
          //   bottom: 0;
          //   left: 50%;
          //   transform: translate(-50%);
          // }
        }
      }
      .demo-ruleForm {
        :deep(.el-form-item) {
          .el-form-item__content {
            .el-input {
              height: 48px;
              margin-top: 10px;
              border-radius: 4px;
              .el-input__wrapper {
                background: #f3f4f9;
              }
            }
          }
        }
      }
      .operation-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 25px;
        .forget-pw {
          font-size: 14px;
          font-family:
            PingFangSC-Regular,
            PingFang SC;
          font-weight: 400;
          color: #2878ff;
          cursor: pointer;
        }
      }
      .login-btn {
        margin-top: 15%;
        height: 48px;
        background: #2878ff;
        border-radius: 4px;
        font-size: 16px;
        font-family:
          PingFangSC-Regular,
          PingFang SC;
        font-weight: 400;
        color: #fff;
        text-align: center;
        line-height: 48px;
        cursor: pointer;
      }
    }
  }
}
</style>

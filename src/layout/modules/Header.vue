<template>
  <el-header>
    <div class="logo"></div>
    <div class="rightHeader">
      <el-dropdown @command="handleCommand" placement="bottom-end">
        <div class="drop_title">
          <img src="@/assets/img/user.png" alt="" />
          <span class="name">{{ userInfo.username }}</span>
          <i class="iconfont icon_xiangxia" style="color: #fff"></i>
        </div>
        <template #dropdown>
          <p class="user-information">
            <img src="@/assets/img/user.png" alt="" />
            <span>{{ userInfo.username }}</span>
          </p>
          <el-dropdown-menu>
            <div class="user-top">
              <el-dropdown-item command="personalInfo">
                <div class="user-info">
                  <span>
                    <i class="iconfont icon_geren"></i>
                    个人信息
                  </span>
                  <i class="iconfont icon_xiangyou"></i>
                </div>
              </el-dropdown-item>
              <el-dropdown-item command="editPassword">
                <div class="user-info">
                  <span>
                    <i class="iconfont icon_tianxie"></i>
                    修改密码
                  </span>
                  <i class="iconfont icon_xiangyou"></i>
                </div>
              </el-dropdown-item>
            </div>
            <div class="user-center"></div>
            <div class="user-bbottom">
              <el-dropdown-item command="logout">
                <div>
                  <i class="iconfont icon_tuichudenglu"></i>
                  退出登录
                </div>
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const { userInfo } = userStore

const handleCommand = (key) => {
  if (key === 'logout') {
    logoutFun()
  } else if (key === 'personalInfo') {
  } else {
  }
}

// 退出登录
const logoutFun = () => {
  window.$ElMessageBox
    .confirm('您确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    .then(() => {
      userStore.logout()
    })
    .catch(() => {})
}
</script>

<style lang="less" scoped>
.el-header {
  background: var(--el-color-primary);
  padding: 0;
  height: 60px;
}
.rightHeader {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #fff;
  height: 100%;
  padding-right: 2rem;
  :deep(.el-dropdown) {
    color: #333;
    font-size: 16px;
    cursor: pointer;
    .drop_title {
      display: flex;
      align-items: center;
      img {
        display: inline-block;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin-right: 0.5rem;
      }
      .name {
        font-weight: 500;
        font-size: 1.2rem;
        color: #fff;
        margin-right: 0.5rem;
      }
    }
  }
}
.user-information {
  width: 12rem;
  // height: 65px;
  background-image: url(@/assets/img/bg-avator.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0.5rem 0 0.5rem 1rem;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bolder;
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin-right: 10px;
  }
  .icon-geren {
    width: 20px;
    height: 20px;
  }
}
</style>

<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <!-- stretch 设置组件居中显示 -->
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span> 账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    loginAccount,
    loginPhone
  },
  setup() {
    //定义属性
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof loginAccount>>()
    const currentTab = ref('account')

    //定义方法
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        //账号登录
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        //手机验证码登录
        console.log('手机登录')
      }
    }
    return {
      isKeepPassword,
      currentTab,
      accountRef,
      handleLoginClick
    }
  }
})
</script>
<style lang="less" scoped>
.login-panel {
  margin-bottom: 120px;
  width: 320px;
  .title {
    text-align: center;
  }
  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin: 10px 0 0 0;
  }
}
</style>

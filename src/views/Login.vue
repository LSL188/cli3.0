<template>
  <div class="login-container">
    <div class="avatar">
      <img src="../assets/logo.png" alt>
    </div>
    <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username">
          <i slot="prefix" class="iconfont icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" @keyup.enter.native="login">
          <i slot="prefix" class="iconfont icon-3702mima"></i>
        </el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" size="medium" @click="login">登录</el-button>
        <el-button type="info" size="medium" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mix from "./Login-mixins.js";
export default {
  mixins: [mix]
};
</script>

<style lang="less" scoped>
.login-container {
  width: 450px;
  height: 304px;
  background-color: #fff;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 1px solid #ccc;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    box-shadow: 0 0 10px #eee;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      background-color: #eee;
      border-radius: 50%;
    }
  }
  .el-form {
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>


<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../../assets/img/JTlogo.png" alt="">
      </div>
      <!-- 登录表单区域 -->
      <el-form size="normal" class="login_form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
        <!-- 用户名 -->
        <el-form-item prop="userid">
          <el-input v-model="loginForm.userid" type="text" placeholder="请输入账号" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" class="btn" v-on:click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default{
  name: 'MobileLogin',
  data () {
    return {
      // 登录表单的数据访问对象
      loginForm: {
        userid: 'yaoyufei',
        password: '123'
      },
      loginFormRules: {
        userid: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 登录方法
    onSubmit () {
      // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
      // this.$router.push('/main')
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          const {data: res} = await this.$axios.post('http://localhost:8181/login', this.loginForm)
          if (res.status !== 200) {
            return this.$message.error(res.message)
          }
          /**
           1.登录成功之后，将token保存到客户端sessionStorage中
           项目中除了登陆之外的其它链接，必须登录后才能访问
           token只有在当前网站打开期间生效，所以将token包存到sessionStorge中
           2.使用 vue-router 路由到指定页面，该方式称之为编程式导航
           */
          // this.$message.info(res.token)
          window.sessionStorage.setItem('token', res.token)
          this.$router.push('/main')
        } else { return false }
      })
    }}
}
</script>
<style>
  .login_container {
    background-image: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%);
    /*background: url("../../assets/img/bg.jpg") no-repeat center;*/
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  .login_form{
    padding: 0 30px 10px 30px;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
  }
  .login_box {
    width: 80%;
    height: 280px;
    /* background-color: #fff; */
    background-color: #2e527bb3;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
  }
  .avatar_box {
    height: 100px;
    width: 100px;
    border: 2px solid #eeeeee;
    border-radius: 50%;
    padding: 8px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eeeeee;
  }
  .btn {
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>

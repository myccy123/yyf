<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../../assets/img/JTlogo.png" alt="">
      </div>
      <!-- 登录表单区域 -->
      <el-form size="normal" class="login_form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
        <!-- 用户名 -->
        <el-form-item prop="userId">
          <el-input v-model="loginForm.userId" type="text" placeholder="请输入账号" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item class="btns">
            <el-button type="primary" size="small" v-on:click="onSubmit">登录</el-button>
            <el-button type="normal" size="small" v-on:click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      style="height:99%"
    >
    </vue-particles>
  </div>
</template>

<script>
export default {
  name: 'PCLogin',
  data () {
    return {
      // 登录表单的数据访问对象
      loginForm: {
        userId: 'yaoyufei',
        password: '123'
      },
      loginFormRules: {
        userId: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 重置方法
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 登录方法
    onSubmit () {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          const {data: res} = await this.$axios.post('/login', this.loginForm)
          if (res.status !== 200) {
            return this.$message.error(res.message)
          }
          /**
          1.登录成功之后，将token保存到客户端sessionStorage中
            项目中除了登陆之外的其它链接，必须登录后才能访问
            token只有在当前网站打开期间生效，所以将token包存到sessionStorge中
          2.使用 vue-router 路由到指定页面，该方式称之为编程式导航
          */
          let getUserRole = res.user.rid === '2313' ? 'jantech' : 'user'
          console.log(getUserRole)
          localStorage.setItem('userRole', getUserRole)
          window.sessionStorage.setItem('token', res.token)
          this.$router.push('/home')
        } else { return false }
      })
    }}
}
</script>

<style scoped>
  .login_container {
    background-image: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%);
    /*background-image: url("../images/bg_login.png");*/
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
  }
  .login_form{
    padding: 0 30px 10px 30px;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
  }
  .login_box {
    width: 450px;
    height: 300px;
    /* background-color: #fff; */
    background-color: #2e527bb3;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .avatar_box {
    height: 120px;
    width: 120px;
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
  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>

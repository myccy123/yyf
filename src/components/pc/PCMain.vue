<template>
  <el-container style="height: 100%; border: 1px solid #eee;">
    <el-header class="nav-bar">
      <div>
        <span style="font-size: 22px;color: #fff;font-weight: bold">智能设备集成平台</span>
      </div>
      <div>
        <el-dropdown v-show="false">
          <i class="el-icon-setting" style="margin-right: 15px;color: #fff"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="color: #fff">管理员</span>
        <el-button @click="outSystem" size="mini" plain type="primary" style="margin-left: 20px;">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'" style="background-color: #545c64;text-align: left;">
        <div class="toggle-button" @click="toggleCollapse">
          <el-button type="info" icon="el-icon-s-fold" style="border: 0;background-color: transparent;">
            <span></span>
          </el-button>
        </div>
        <el-menu router :unique-opened="true" :collapse="isCollapse" :collapse-transition="true"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-submenu v-for="(item,index) in $router.options.routes" v-if="!item.hidden" :index="index+''" :key="index">
            <template slot="title">
              <i v-if="item.meta.icon" :class="item.meta.icon" style="color: #fff"></i><span>{{item.name}}</span>
            </template>
            <el-menu-item v-for="(item2,index2) in item.children" :key="index2"
                          :class="$route.path===item2.path?'is-active':''" :index="item2.path">{{item2.name}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
  .nav-bar{
    background-color: #1758d5;
  }
  .el-header {
    background-color: #396695;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-main {
    display: block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    flex-basis: auto;
    overflow: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 0 0 2px;
  }
  .el-aside {
    color: #333;
  }
  .el-menu {
    border-right: none;
  }
  .toggle-button{
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>

<script>
export default {
  name: 'PCMain',
  data () {
    return {
      // 是否折叠左侧导航栏
      isCollapse: false
    }
  },
  methods: {
    // 退出系统
    outSystem () {
      localStorage.setItem('userRole', 'unLogin')
      // 清空token
      window.sessionStorage.clear()
      // 跳转到登录页的时候顺便刷新
      // this.$router.push('/login')
      window.location.href = window.location.origin + window.location.pathname
    },
    // 点击按钮实现导航菜单的折叠和展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

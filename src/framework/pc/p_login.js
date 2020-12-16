// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '../../router/pc/index'
// 导入全局样式表
import '../../assets/css/global.css'
// 导入 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入 VueParticles
import VueParticles from 'vue-particles'
// 导入 Axios
import axios from 'axios'
// 导入字体图标
import '../../assets/fonts/iconfont.css'
//  导入excel插件
import XLSX from 'xlsx'
// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false;
// 安装 ElementUI
Vue.use(ElementUI);
// 安装 VueParticles
Vue.use(VueParticles);

// Axios 请求拦截
// 配置axios请求根路径
axios.defaults.baseURL = 'http://112.125.16.236:8181';
// 在 request 拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  NProgress.start();
  // 为请求头对象，添加 Token 验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token');
  // 在最后必须return config
  return config
});
// 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done();
  return config
});
// 安装axios
Vue.prototype.$axios = axios;
// 安装 excel
Vue.prototype.XLSX = XLSX;

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

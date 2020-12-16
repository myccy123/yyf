// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '../../router/mobile/index'
// 导入 VueParticles
import VueParticles from 'vue-particles'
// 导入 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入 Axios
import axios from 'axios'

Vue.config.productionTip = false;
// 安装 ElementUI
Vue.use(ElementUI);
// 安装 VueParticles
Vue.use(VueParticles);

// Axios 请求拦截
axios.interceptors.request.use(config => {
  // 为请求头对象，添加 Token 验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token');
  // 在最后必须return config
  return config
});
// 配置axios请求根路径
axios.defaults.baseURL = 'http://112.125.16.236:8181';
// 安装axios
Vue.prototype.$axios = axios;

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

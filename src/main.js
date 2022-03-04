import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './plugins'
import '@/layouts/export'

Vue.config.productionTip = false
import Antd from 'ant-design-vue'
Vue.use(Antd)
/*单页加载静态文件*/

new Vue({
  el: '#zyf',
  router,
  store,
  render: (h) => h(App),
})

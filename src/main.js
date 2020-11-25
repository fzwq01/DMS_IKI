import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// import "animate.css"
import 'v-easy-components/lib/theme-chalk/index.css';
import './element-variables.scss'
import { InputIp } from 'v-easy-components'
import './style/index.scss'
import './filter/filter'

Vue.use(InputIp);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

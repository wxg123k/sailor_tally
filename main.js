import App from './App'
Vue.config.productionTip = false
// 引入uView
import uView from "uview-ui";
Vue.use(uView);
// 引入Vuex
import store from "./store/index.js"
// 引入echarts

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

import echarts from "echarts";
Vue.prototype.$echarts = echarts
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
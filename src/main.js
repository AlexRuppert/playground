import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import './shared/tss'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import longpress from 'vue-long-press-directive'


Vue.config.productionTip = false
Vue.use(longpress, {
  duration: 500
})
new Vue({
  router,
  data: {
    store
  },
  render: h => h(App)
}).$mount('#app')
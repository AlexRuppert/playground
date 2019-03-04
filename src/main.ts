import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import VueAnime from 'vue-animejs'
import VueNumber from 'vue-number-animation'

Vue.use(VueNumber)
Vue.use(VueAnime)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

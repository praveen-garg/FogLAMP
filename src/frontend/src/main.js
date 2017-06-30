// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/css/bulma.min.css'

Vue.config.productionTip = false

Vue.component('FooterBar', require('./components/FooterBar.vue'));
Vue.component('RadialGauge', require('./components/RadialGauge.vue'));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

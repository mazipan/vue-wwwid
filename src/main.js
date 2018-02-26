/* eslint-disable space-before-blocks */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App.vue'

if (process.env.NODE_ENV === "production") {

} else {
  Vue.config.devtools = true
}

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  observer: true,
  preLoad: 1,
  loading: require('./assets/icons/overlay.png'),
  attempt: 1,
  listenEvents: ['scroll']
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})

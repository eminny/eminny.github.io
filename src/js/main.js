import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from './routes'

;(function __canderApp__() {

  // Global Vue config
  Vue.config.debug = true

  Vue.use(VueRouter)

  const router = new VueRouter()
  const Cander = Vue.extend(require('./App.vue'))

  // Define some routes
  router.map(Routes)

  // Initialize app via router
  router.start(Cander, 'cander-app')
})();

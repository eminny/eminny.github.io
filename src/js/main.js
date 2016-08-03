import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from './routes'

;(function __canderApp__() {

  // Global Vue config
  Vue.config.debug = true

  const Cander = Vue.extend(require('./App.vue'))

  Vue.use(VueRouter)

  let router = new VueRouter({
    hashbang: true,
  })
  window.CANDER = window.CANDER || {};
  window.CANDER.router = router;

  // Define some routes
  router.map(Routes)

  // Initialize router-enabled app.
  // Creates an instance of Cander and mounts it to cander-app.
  router.start(Cander, 'cander-app')
})();

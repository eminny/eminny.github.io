import Vue from 'vue'
import VueRouter from 'vue-router'
import VueTouch from 'vue-touch'
import Routes from './routes'
import { isFunction } from 'lodash'
import store from './store'

;(function __canderApp__() {

  // Global Vue config
  Vue.config.debug = false

  const Cander = Vue.extend(require('./App.vue'))

  // Use plugins
  Vue.use(VueTouch)
  Vue.use(VueRouter)

  let router = new VueRouter({
    hashbang: true,
    history: true,
    transitionOnLoad: true,
    saveScrollPosition: false,
  })

  // Add router instance to shared store
  store.data.router = router

  // Define some routes
  router.map(Routes)

  // Initialize router-enabled app.
  // Creates an instance of Cander and mounts it to the 'cander-app' element
  router.start(Cander, 'cander-app')

  router.afterEach(function () {
    // Reset scroll position
    document.body.scrollTop = 0

    // Send GA data
    if (window.ga && isFunction(window.ga)) {
      window.ga('send', 'pageview')
    }
  })

})();

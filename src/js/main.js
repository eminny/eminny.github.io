import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import store from './store'

;(function __canderApp__() {

  // Global Vue config
  Vue.config.debug = true

  const Cander = Vue.extend(require('./App.vue'))

  Vue.use(VueRouter)

  let router = new VueRouter({
    hashbang: true,
    transitionOnLoad: true,
    // saveScrollPosition: false,
  })

  // Add router instance to shared store
  store.data.router = router;

  // Define some routes
  router.map(Routes)

  // Initialize router-enabled app.
  // Creates an instance of Cander and mounts it to cander-app.
  router.start(Cander, 'cander-app')

  router.afterEach(function () {
    // After route change, reset scroll position to top
    document.body.scrollTop = 0;
  });

})();

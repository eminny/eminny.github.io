<template>
  <div class="cander-wrapper page--{{ this.$route.name ? this.$route.name : 'default' }}" id="cander-app">
    <site-header></site-header>
    <menu-overlay v-if="menuOverlay.visible" transition="fade"></menu-overlay>
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="sass">
  .cander-wrapper {}
</style>

<script>
  import store from './store'
  import MenuOverlay from './components/MenuOverlay.vue'
  import SiteHeader from './components/SiteHeader.vue'

  export default {
    data () {
      return {
        scrollPos: store.data.scrollPos,
        menuOverlay: store.data.menuOverlay,
      }
    },
    components: {
      MenuOverlay,
      SiteHeader,
    },
    methods: {},
    ready () {
      // Update global scrollPos value
      document.addEventListener("scroll", () => {
        this.scrollPos.top = document.getElementById('cander-app').getBoundingClientRect().top
      }, false);
    },
  }
</script>

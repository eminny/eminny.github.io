<template>
  <div class="cander-wrapper page--{{ this.$route.name }}" id="cander-app">
    <site-header></site-header>
    <menu-overlay></menu-overlay>
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

<template>
  <div class="cander-wrapper page--{{ this.$route.name ? this.$route.name : 'default' }}" id="cander-app">
    <site-header :dark-mode="darkMode"></site-header>
    <menu-overlay v-if="menuOverlay.visible" transition="fade"></menu-overlay>
    <modal v-if="modal.visible" transition="fade"></modal>
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="sass">
  .cander-wrapper {
    overflow: hidden;
  }
</style>

<script>
  import store from './store'
  import MenuOverlay from './components/MenuOverlay.vue'
  import Modal from './components/Modal.vue'
  import SiteHeader from './components/SiteHeader.vue'

  export default {
    data () {
      return {
        scrollPos: store.data.scrollPos,
        menuOverlay: store.data.menuOverlay,
        modal: store.data.modal,
        darkMode: store.data.darkMode,
      }
    },
    components: {
      MenuOverlay,
      Modal,
      SiteHeader,
    },
    methods: {},
    ready () {
      // Update global scrollPos value
      document.addEventListener("scroll", () => {
        this.scrollPos.top = document.getElementById('cander-app').getBoundingClientRect().top
      }, false)

      // Listen for darkMode trigger from children
      this.$on('updateDarkMode', (val) => { this.darkMode = Boolean(val) })
    },
  }
</script>

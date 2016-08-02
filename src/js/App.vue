<template>
  <div class="cander-wrapper">
    <menu-overlay></menu-overlay>
    <router-view></router-view>
  </div>
</template>

<style>
  .cander-wrapper {}
</style>

<script type="text/babel">
  import MenuOverlay from './components/MenuOverlay.vue'

  export default {
    data () {
      return {
        msg: 'hellllo worl'
      }
    },
    components: {
      MenuOverlay,
    },
    ready () {
      console.log('App.vue loaded...')
    },
  }
</script>

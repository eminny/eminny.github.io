<template>
  <footer>
    <p>Sign up and stay updated</p>
    <form>

    </form>
  </footer>
</template>

<style lang="sass" scoped>
    @import 'stylesheets/site-footer';
</style>

<script>
  import store from '../store'

  export default {
    data () {
      return {
        router: store.data.router,
      }
    },
    ready () {
      console.log('sup')
    },
  }
</script>

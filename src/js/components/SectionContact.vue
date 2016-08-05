<template>
  <div>
    <div>CONTACT PAGE</div>
    <site-footer></site-footer>
  </div>
</template>

<style lang="sass">
</style>

<script>
  import SiteFooter from './SiteFooter.vue'

  export default {
    components: {
      SiteFooter,
    },
    ready () {
      console.log('CONTACT section loaded...')
    },
  }
</script>

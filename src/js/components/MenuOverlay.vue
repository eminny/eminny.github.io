<template>
  <p>
    <a v-link="{ path: '/about' }">About</a>
    <a v-link="{ path: '/stores' }">Stores</a>
    <a v-link="{ path: '/contact' }">Contact</a>
  </p>
</template>

<style lang="sass">
  .menu-overlay {
    background: rgba(0,0,0,0.2);
  }
</style>

<script>
  export default {
    data () {
      return {
        msg: 'MENU'
      }
    }
  }
</script>

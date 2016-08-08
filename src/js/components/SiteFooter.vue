<template>
  <footer class="site-footer">
    <form id="newsletter__form"
          action="http://xxxxx.us#.list-manage1.com/subscribe/post-json?u=xxxxx&id=xxxx&c=?"
          method="get"
    >
      <label for="newsletter__email" class="newsletter__label">Sign up and stay updated</label>
      <input id="newsletter__email" class="newsletter__email" type="email" placeholder="EMAIL ADDRESS">
      <button class="newsletter__form__btn-submit" type="submit">Submit</button>
    </form>
    <p class="site-footer__copyright">&copy; 2016 CANDER PARIS. <a v-link="{ name: 'terms' }">Terms and Conditions</a></p>
  </footer>
</template>

<style lang="sass">
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
    ready () {},
  }
</script>

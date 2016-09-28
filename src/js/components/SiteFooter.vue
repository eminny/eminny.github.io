<template>
  <footer class="site-footer">
    <form id="newsletter__form"
          class="newsletter__form group"
          action="//hauteappetite.createsend.com/t/i/s/npiud/"
          method="post"
          id="subForm"
    >
      <label for="fieldEmail" class="newsletter__label">Sign up and stay updated</label>
      <div class="newsletter__form__inner">
        <input id="fieldEmail" name="cm-npiud-npiud" class="newsletter__email" type="email" placeholder="EMAIL ADDRESS" autocomplete="off" autocorrect="off" required>
        <button class="newsletter__form__btn-submit" type="submit">Submit</button>
      </div>
    </form>
    <p class="site-footer__copyright">&copy; 2016 CANDER PARIS. <a v-link="{ name: 'privacy' }">Privacy</a> / <a v-link="{ name: 'terms' }">Terms</a></p>
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

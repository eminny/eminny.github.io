<template>
  <header class="site-header" v-show="headerVisible" transition="fade">
    <!-- Facebook Pixel Code -->
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');

      fbq('init', '200282564039202');
      fbq('track', 'PageView');
    </script>
    <noscript>
      <img height="1" width="1"
    src="https://www.facebook.com/tr?id=200282564039202&ev=PageView
    &noscript=1"/>
    </noscript>
    <!-- End Facebook Pixel Code -->
    <a href="/" @click.prevent="logoClickHandler" class="menu-overlay__nav-list__item">
      <img v-bind:src="logoUrl" alt="CANDER PARIS" title="CANDER PARIS" class="logo">
    </a>
    <a href="/" @click.prevent="toggleMenu" class="btn-menu btn-menu--{{ toggleState }}"></a>
  </header>
</template>

<style lang="sass" scoped>
  @import "stylesheets/_site-header";
</style>

<script>
  import scroll from 'scroll'
  import store from '../store'
  import { addClass, removeClass, hasClass } from '../helpers'
  const page = require('scroll-doc')()

  export default {
    props: [
      'dark-mode',
    ],
    data () {
      return {
        menuOverlay: store.data.menuOverlay,
        scrollPos: store.data.scrollPos,
        router: store.data.router,
      }
    },
    computed: {
      logoUrl () {
        if (this.darkMode) {
          return '/images/logo-white.svg'
        } else {
          return '/images/logo.svg'
        }
      },
      isHomePage () {
        if (this.$route.path === '/') {
          return true
        } else {
          return false
        }
      },
      headerVisible () {
        if (this.menuOverlay.visible) {
          return true;
        }
        return true;
      },
      toggleState () {
        if (this.menuOverlay.visible) {
          return 'open';
        } else {
          return 'closed';
        }
      },
    },
    methods: {
      toggleMenu () {
        return this.menuOverlay.visible = !this.menuOverlay.visible;
      },
      closeMenu (delay = 0) {
        if (delay > 0) {
          setTimeout(() => this.menuOverlay.visible = false, delay);
        } else {
          this.menuOverlay.visible = false
        }
      },
      logoClickHandler () {
        if (this.isHomePage) {
          scroll.top(page, 0, { duration: 400 })
          this.closeMenu(300)
        } else {
          if (this.router) return this.router.go({ name: 'home' })
        }
      },
    },
    watch: {
      'headerVisible': function (val) {
        let el = document.getElementById('cander-app')
        if (val) {
          addClass(el, 'header-visible')
        } else {
          removeClass(el, 'header-visible')
        }
      },
    },
    ready () {
      let el = document.getElementById('cander-app')
      if (this.$route.name !== 'home') {
        addClass(el, 'header-visible')
      }
    },
  }
</script>

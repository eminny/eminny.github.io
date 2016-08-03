<template>
  <header class="site-header" v-show="headerVisible" transition="fade">
    <a href="/" @click.prevent="logoClickHandler" class="menu-overlay__nav-list__item">
      <img src="/images/logo.svg" alt="CANDER PARIS" title="CANDER PARIS" class="logo">
    </a>
    <a href="/" @click.prevent="toggleMenu()" class="btn-menu btn-menu--{{ toggleState }}"></a>
  </header>
</template>

<style lang="sass" scoped>
  @import "stylesheets/_site-header";
</style>

<script>
  import scroll from 'scroll'
  import store from '../store'
  const page = require('scroll-doc')()

  export default {
    data () {
      return {
        menuOverlay: store.data.menuOverlay,
        scrollPos: store.data.scrollPos,
      }
    },
    computed: {
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
        if (this.isHomePage && this.scrollPos.top > -window.innerHeight) {
          return false;
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
          alert('router.go -> home')
//          return this.router.go({ name: 'home' })
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
    }
  }

  // Helper functions
  function addClass(el, className) {
    if (el.classList) {
      el.classList.add(className)
    } else {
      el.className += ` ${className}`
    }
  }
  function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }
</script>

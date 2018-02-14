<template>
  <header>
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
  </header>

  <div class="menu-overlay-wrapper">
    <div class="menu-overlay">
      <div class="menu-overlay__nav-wrapper">
        <nav class="menu-overlay__nav-list">
          <a v-link="{ name: 'home' }"
             v-on:mouseover="setHoverItem('home')"
             v-on:click="closeMenu(300)"
             class="menu-overlay__nav-list__item"
          >Home</a>
          <a v-link="{ name: 'about' }"
             v-on:mouseover="setHoverItem('about')"
             v-on:click="closeMenu(300)"
             class="menu-overlay__nav-list__item"
          >About</a>
          <a v-link="{ name: 'stores' }"
             v-on:mouseover="setHoverItem('stores')"
             v-on:click="closeMenu(300)"
             class="menu-overlay__nav-list__item"
          >Stores</a>
          <a v-link="{ name: 'press' }"
             v-on:mouseover="setHoverItem('press')"
             v-on:click="closeMenu(300)"
             class="menu-overlay__nav-list__item"
          >Press</a>
          <a v-link="{ name: 'contact' }"
             v-on:mouseover="setHoverItem('contact')"
             v-on:click="closeMenu(300)"
             class="menu-overlay__nav-list__item"
          >Contact</a>
        </nav>
        <div class="menu-overlay__nav-social-links-wrapper">
          <social-links></social-links>
        </div>
        <div class="menu-overlay__nav-contact">
          <p>For all general information please contact <a href="mailto:info@canderparis.com">info@canderparis.com</a></p>
          <p>For press information please contact <a href="mailto:press@canderparis.com">press@canderparis.com</a></p>
        </div>
      </div>
      <div class="menu-overlay__accent-wrapper">
        <img :src="menuOverlay.navImageMap[hoverItem]" class="menu-overlay__accent" :data-id="hoverItem">
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  @import "stylesheets/menu-overlay";
</style>

<script>
  import store from '../store'
  import { addClass, removeClass } from '../helpers'
  import SocialLinks from './SocialLinks.vue'

  export default {
    data () {
      return {
        hoverItem: 'default',
        activeItem: '',
        menuOverlay: store.data.menuOverlay,
      }
    },
    methods: {
      setHoverItem (hoverItem) {
        this.hoverItem = hoverItem
      },
      closeMenu (delay = 0) {
        if (delay > 0) {
          setTimeout(() => this.menuOverlay.visible = false, delay);
        } else {
          this.menuOverlay.visible = false
        }
      },
      lockScroll (el) {
        addClass(el, 'overlay-open')
      },
      unlockScroll (el) {
        removeClass(el, 'overlay-open')
      },
    },
    components: {
      SocialLinks,
    },
    ready () {
      this.lockScroll(document.body)
      this.lockScroll(document.querySelector('html'))
    },
    destroyed () {
      this.unlockScroll(document.body)
      this.unlockScroll(document.querySelector('html'))
    },
  }
</script>

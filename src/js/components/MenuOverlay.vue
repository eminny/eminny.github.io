<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="menu-overlay-wrapper" v-if="menuOverlay.visible" transition="fade">
    <site-header></site-header>
    <div class="menu-overlay">
      <div class="menu-overlay__nav-wrapper">
        <nav class="menu-overlay__nav-list">
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
          <a v-link="{ name: 'contact' }"
             v-on:mouseover="setHoverItem('contact')"
             v-on:click="closeMenu(300)"
             class="menu-overlay__nav-list__item"
          >Contact</a>
        </nav>
        <div class="menu-overlay__nav-social">
          <a class="menu-overlay__nav-social__item" href="http://facebook.com" target="_blank">Facebook</a>
          <a class="menu-overlay__nav-social__item" href="http://instagram.com" target="_blank">Instagram</a>
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

<style lang="sass">
  @import "stylesheets/menu-overlay";
</style>

<script>
  import store from '../store'
  import SiteHeader from './SiteHeader.vue'

  export default {
    components: {
      SiteHeader,
    },
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
    },
  }
</script>

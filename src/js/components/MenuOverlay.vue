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
          <a class="menu-overlay__nav-social__item" href="http://facebook.com" target="_blank">
            <svg class="icon icon-facebook">
              <use xlink:href="#icon-facebook"></use>
            </svg>
          </a>
          <a class="menu-overlay__nav-social__item" href="http://instagram.com" target="_blank">
            <svg class="icon icon-instagram"><use xlink:href="#icon-instagram"></use></svg>
          </a>
          <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
              <symbol id="icon-instagram" viewBox="0 0 16 16">
                <title>Instagram</title>
                <path class="path1" d="M14.5 0h-13c-0.825 0-1.5 0.675-1.5 1.5v13c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-13c0-0.825-0.675-1.5-1.5-1.5zM11 2.5c0-0.275 0.225-0.5 0.5-0.5h2c0.275 0 0.5 0.225 0.5 0.5v2c0 0.275-0.225 0.5-0.5 0.5h-2c-0.275 0-0.5-0.225-0.5-0.5v-2zM8 5c1.656 0 3 1.344 3 3s-1.344 3-3 3c-1.656 0-3-1.344-3-3s1.344-3 3-3zM14 13.5v0c0 0.275-0.225 0.5-0.5 0.5h-11c-0.275 0-0.5-0.225-0.5-0.5v0-6.5h1.1c-0.066 0.322-0.1 0.656-0.1 1 0 2.762 2.237 5 5 5s5-2.238 5-5c0-0.344-0.034-0.678-0.1-1h1.1v6.5z"></path>
              </symbol>
              <symbol id="icon-facebook" viewBox="0 0 16 16">
                <title>Facebook</title>
                <path class="path1" d="M9.5 3h2.5v-3h-2.5c-1.93 0-3.5 1.57-3.5 3.5v1.5h-2v3h2v8h3v-8h2.5l0.5-3h-3v-1.5c0-0.271 0.229-0.5 0.5-0.5z"></path>
              </symbol>
            </defs>
          </svg>
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

<template>
  <div class="slides">
    <!-- SCROLL ARROW ICON -->
    <span @click="scrollToFold"
      class="slide__icn-scroll"
      v-bind:class="scrollArrowIsActive ? 'is-active' : 'is-inactive'"
      v-show="scrollArrowIsVisible"
      transition="fade"
      data-start="opacity: 1;"
      data-850-end="opacity: 1;"
      data-800-end="opacity: 0.5;"
      data-700-end="opacity: 0;"
      data-end="opacity: 0;">Scroll Down</span>

    <!-- SECTION 0: INTRO/HERO -->
    <div class="slide slide--0 slide--intro">
      <div class="slide--intro__logo"
           data-0="opacity: 1;"
           data-50p="opacity: 0;"
      >
        <img src="/images/logo.svg" title="CANDER PARIS">
      </div>
    </div>

    <!-- SECTION 1: THE CANDLE -->
    <div class="slide slide--1" id="the-fold"
         data-0="transform: translate(0, 100%);"
         data-100p="transform: translate(0, 0%)"
    >
      <!-- Product Images (non-mobile) -->
      <div class="slide__product-wrapper"
           data-0="opacity: 0"
           data-100p="opacity: 1"
           data-200p="opacity: 1"
           data-250p="opacity: 0"
      >
        <div class="slide__products">
          <div class="slide__product" data-product-title="Scent 01" @click="showProductBuyModal">
            <img src="/images/candle-1.png" alt="Collection launching Summer 2017">
            <button class="slide__product__btn">Buy Now</button>
          </div>
          <div class="slide__product" data-product-title="Our Youth" @click="showProductBuyModal">
            <img src="/images/candle-2.png" alt="Collection launching Summer 2017">
            <button class="slide__product__btn">Buy Now</button>
          </div>
          <div class="slide__product" data-product-title="Rue Vertbois" @click="showProductBuyModal">
            <img src="/images/candle-3.png" alt="Collection launching Summer 2017">
            <button class="slide__product__btn">Buy Now</button>
          </div>
          <div class="slide__product" data-product-title="Rose" @click="showProductBuyModal">
            <img src="/images/candle-4.png" alt="Collection launching Summer 2017">
            <button class="slide__product__btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION 2: THE SCENT -->
    <div class="slide slide--2 shade--dark"
         data-0="opacity: 0"
         data-200p="opacity: 0; transform: translate(0, 100%);"
         data-250p="opacity: 0; transform: translate(0, 5%);"
         data-300p="opacity: 1; transform: translate(0, 0%);"
         data-450p="opacity: 0; transform: translate(0, -2%);"
    >
      <div class="slide--2__bg is-dark" style="background-image: url('/images/bg-aromatic-santal.jpg');"></div>
      <div class="the-scent">
        <p class="the-scent__desc" style="font-style: italic;">Refined fragrances created in Paris by elite French perfumers</p>
      </div>
    </div>

    <!-- SECTION 3: DOOR -->
    <div class="slide slide--3"
         data-0="opacity: 0"
         data-300p="opacity: 0; transform: translate(0, 100%);"
         data-450p="opacity: 0; transform: translate(0, 30%);"
         data-500p="opacity: 1; transform: translate(0, 0%);"
         data-650p="opacity: 1; transform: translate(0, 0%);"
         data-750p="transform: translate(0, -120%);"
    >
      <div class="translations-wrapper">
        <ul class="translations-list">
          <li>Bougie Parfumée</li>
          <li>Fragranced Candle</li>
          <li>Candela Profumata</li>
          <li>Vela Perfumada</li>
          <li>Duftkerze</li>
          <li>香味蠟燭</li>
          <li>香りのろうそく</li>
        </ul>
      </div>
    </div>

    <!-- SECTION 4: PRODUCT -->
    <div class="slide slide--4"
         data-0="opacity: 0"
         data-700p="opacity: 0; transform: translate(0, 100%);"
         data-725p="opacity: 0; transform: translate(0, 20%);"
         data-760p="opacity: 0.3; transform: translate(0, 5%);"
         data-770p="opacity: 1; transform: translate(0, 0%);"
         data-800p="transform: translate(0, 0%);"
         data-890p="transform: translate(0, -15%);"
    >
      <div class="slide--4__inner">
        <img src="/images/product-box-front.png" alt="Front" class="slide--4__product-image">
        <h2 class="zeta">Coming soon in stores Summer 2017</h2>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="slide--footer-wrapper"
         data-0="opacity: 0"
         data-800p="opacity: 0; transform: translate(0, 100%);"
         data-825p="opacity: 0; transform: translate(0, 20%);"
         data-860p="opacity: 0.3; transform: translate(0, 5%);"
         data-870p="opacity: 1; transform: translate(0, 0%);"
    >
      <site-footer></site-footer>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  @import "stylesheets/section-home";
</style>

<script>
  import skrollr from 'skrollr'
  import scrollHelper from 'scroll'
  import store from '../store'
  const page = require('scroll-doc')()
  import SiteFooter from './SiteFooter.vue'
  import { forEach } from 'lodash'
  import { addClass, removeClass, isMobile } from '../helpers'

  export default {
    components: {
      SiteFooter,
    },
    data() {
      return {
        darkMode: store.data.darkMode,
        menuOverlay: store.data.menuOverlay,
        modal: store.data.modal,
        scrollPos: store.data.scrollPos,
        skrollr: store.data.skrollr,
        currentAromatic: null,
        aromaticsTextFaded: false,
        scrollArrowIsVisible: true,
        scrollArrowIsActive: true,
        aromaticBackgroundUrl: '/images/bg-aromatic-santal.jpg',
        aromaticBackgroundIsVisible: true,
        shadeLookup: {
          bouleau: 'dark',
          firBalsam: 'dark',
          santal: 'dark',
          agrumes: 'dark',
          patchouli: 'dark',
        },
        bgTimeoutId: null,
      }
    },
    methods: {
      isMobile() {
        return isMobile()
      },
      enableDarkMode() {
        let shade = this.shadeLookup[this.currentAromatic]
        addClass(document.body, `shade--${shade}`)

        this.darkMode = true
        this.$dispatch('updateDarkMode', true)
      },
      disableDarkMode() {
        let shade = this.shadeLookup[this.currentAromatic]
        removeClass(document.body, `shade--${shade}`)

        this.darkMode = false
        this.$dispatch('updateDarkMode', false)
      },
      scrollToFold() {
        let el = document.getElementById('the-fold')
        let foldOffset = el.getBoundingClientRect().top + document.body.scrollTop

        scrollHelper.top(page, Number(foldOffset), { duration: 400 })
      },
      showProductBuyModal(event) {
        this.modal.visible = true;
        this.modal.productOfInterest = event.currentTarget.dataset.productTitle;
      },
      showAromaticBg(event) {
        let wasMobileTap= (this.isMobile() && event && event.pointerType)

        // If it was touch-tapped, start timer to auto-hide
        if (wasMobileTap) {
          let timeoutDuration = 4000
          // Reset any previous timeout set
          window.clearTimeout(this.bgTimeoutId)
          this.bgTimeoutId = window.setTimeout(() => {
            this.hideAromaticBg(0)
          }, timeoutDuration)
        } else {
          // return to prevent conflicting mouseover event
          if (this.isMobile()) return false;
        }

        if (!wasMobileTap) {
          // Reset any previous timeout set
          window.clearTimeout(this.bgTimeoutId)
        }

        // Get the current ingredient
        if (event && event.target) {
          this.currentAromatic = event.target.getAttribute('data-id')
        }

        // Set visibility
        this.aromaticBackgroundIsVisible = true

        // Set active state on the tapped/hovered item, clearing any existing ones first
        let els = document.querySelectorAll('.aromatic')
        forEach(els, function (el) { removeClass(el, 'is-active') })
        let el = document.querySelector(`.aromatic[data-id="${this.currentAromatic}"]`)
        addClass(el, 'is-active')

        // Set the background
        this.aromaticBackgroundUrl = `/images/bg-aromatic-${this.currentAromatic}.jpg`

        // Trigger darkmode
        if (this.shadeLookup[this.currentAromatic] === 'dark') {
          this.enableDarkMode()
        } else {
          this.disableDarkMode()
        }
      },
      hideAromaticBg(timeoutDuration = 2000) {
        return;
        window.clearTimeout(this.bgTimeoutId)
        this.bgTimeoutId = window.setTimeout(() => {
          // Set visibility
          this.aromaticBackgroundIsVisible = false

          // Disable darkmode
          this.disableDarkMode()

          // Remove active state(s)
          let els = document.querySelectorAll('.aromatic')
          forEach(els, function (el) { removeClass(el, 'is-active') })

          // Get the current ingredient (and unset it)
          this.currentAromatic = null

          this.aromaticBackgroundUrl = ''
        }, timeoutDuration)
      },
    },
    ready() {
      const isMobile = this.isMobile()

      if (isMobile) {
        addClass(document.body, 'is-mobile')
      } else {
        addClass(document.body, 'is-not-mobile')
        // Initialize skrollr
        if (! this.skrollr) {
          const skrollrOpts = {}
          this.skrollr = skrollr.init(skrollrOpts)
        }
      }

      this.$watch('scrollPos.top', (pos, oldPos) => {

        if (Math.abs(pos - oldPos) > 40) {
          this.disableDarkMode()
          this.hideAromaticBg(0)
        }

        if (pos < -window.innerHeight + 5) {
          this.scrollArrowIsActive = false
        } else {
          this.scrollArrowIsActive = true
        }

        if (isMobile && pos < -200) {
          this.scrollArrowIsVisible = false
        } else {
          this.scrollArrowIsVisible = true
        }
      })

      this.$watch('menuOverlay.visible', function (isVisible) {
        if (isVisible) {
          this.disableDarkMode()
          this.hideAromaticBg(0)
        }
      })
    },
    destroyed() {
      // Destroy skrollr instance
      if (this.skrollr) {
        this.skrollr.destroy()
      }
    },
  }
</script>

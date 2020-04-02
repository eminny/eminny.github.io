<template>
  <div class="slides">
    <!-- SCROLL ARROW ICON -->
    <span class="slide__icn-scroll"
      v-bind:class="scrollArrowIsActive ? 'is-active' : 'is-inactive'"
      v-show="scrollArrowIsVisible"
      transition="fade"
      data-start="opacity: 1;"
      data-1000-end="opacity: 1;"
      data-450-end="opacity: 0.5;"
      data-400-end="opacity: 0;"
      data-end="opacity: 0;">Scroll Down</span>

    <!-- SECTION 1b: THE CANDLES -->
    <div class="slide slide--1" id="the-fold">
      <!-- Product Images (non-mobile) -->
      <div class="slide__product-wrapper"
           data-0="opacity: 1"
           data-200p="opacity: 0"
      >
        <div class="slide__products">
          <div class="slide__product" data-product-title="Scent 01">
            <a href="https://cander-paris-us.myshopify.com/products/scent-01">
              <img src="/images/updated-candles/20190930/scent-01.jpg" v-on:mouseenter="/images/scent01mouseover.jpg" alt="Scent 01" />
            </a>
            <a href="https://cander-paris-us.myshopify.com/products/scent-01" class="slide__product__btn">SCENT 01</a>
          </div>
          <div class="slide__product" data-product-title="Our Youth">
            <a href="https://cander-paris-us.myshopify.com/products/our-youth">
              <img src="/images/updated-candles/20190930/our-youth.jpg" alt="Our Youth">
            </a>
            <a href="https://cander-paris-us.myshopify.com/products/our-youth" class="slide__product__btn">OUR YOUTH</a>
          </div>
          <div class="slide__product" data-product-title="Rue Vertbois">
            <a href="https://cander-paris-us.myshopify.com/products/rue-vertbois">
              <img src="/images/updated-candles/20190930/rue-vertbois.jpg" alt="Rue Vertbois">
            </a>
            <a href="https://cander-paris-us.myshopify.com/products/rue-vertbois" class="slide__product__btn">RUE VERTBOIS</a>
          </div>
          <div class="slide__product" data-product-title="Rose">
            <a href="https://cander-paris-us.myshopify.com/products/rose">
              <img src="/images/updated-candles/20190930/rose.jpg" alt="Rose">
            </a>
            <a href="https://cander-paris-us.myshopify.com/products/rose" class="slide__product__btn">ROSE</a>
          </div>
          <div class="slide__product" data-product-title="Fete">
            <a href="https://cander-paris-us.myshopify.com/products/fete">
              <img src="/images/updated-candles/20190930/fete.jpg" alt="Fete">
            </a>
            <a href="https://cander-paris-us.myshopify.com/products/fete" class="slide__product__btn">Fete</a>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION 2: THE SCENT -->
    <div class="slide slide--2 shade--dark"
         data-0="opacity: 0"
         data-100p="opacity: 0; transform: translate(0, 100%);"
         data-150p="opacity: 0; transform: translate(0, 5%);"
         data-200p="opacity: 1; transform: translate(0, 0%);"
         data-350p="opacity: 0; transform: translate(0, -2%);"
    >
      <div class="slide--2__bg is-dark" style="background-image: url('/images/bg-aromatic-santal.jpg');"></div>
      <div class="the-scent">
        <p class="the-scent__desc" style="font-style: italic;">Creating contemporary ambiance with the world’s most revered French candlemakers.</p>
      </div>
    </div>

    <!-- SECTION 3: DOOR -->
    <div class="slide slide--3"
         data-0="opacity: 0"
         data-200p="opacity: 0; transform: translate(0, 100%);"
         data-350p="opacity: 0; transform: translate(0, 30%);"
         data-400p="opacity: 1; transform: translate(0, 0%);"
         data-550p="opacity: 1; transform: translate(0, 0%);"
         data-650p="transform: translate(0, -120%);"
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
        data-600p="opacity: 0; transform: translate(0, 100%);"
        data-625p="opacity: 0; transform: translate(0, 20%);"
        data-660p="opacity: 0.3; transform: translate(0, 5%);"
        data-670p="opacity: 1; transform: translate(0, 0%);"
        data-740p="opacity: 0"
    >
      <div class="slide--4__inner">
        <img src="/images/menu-accent-contact-transparent.png" alt="Front" class="slide--4__product-image">
        <!-- <h2 class="zeta">Coming soon in stores Autumn 2017</h2> -->
      </div>
    </div>

    <!-- SECTION 5: DIARY -->
    <div class="slide slide--5"
         data-0="opacity: 0"
         data-750p="opacity: 0; transform: translate(0, 100%)"
         data-800p="opacity: 0.3; transform: translate(0, 30%);"
         data-820p="opacity: 1; transform: translate(0, 0%)"
         data-870p="transform: translate(0, -10%);"
    >
      <div class="diaryfeed">
        <diary></diary>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="slide--footer-wrapper"
         data-0="opacity: 0"
         data-840p="opacity: 0; transform: translate(0, 100%);"
         data-850p="opacity: 0; transform: translate(0, 20%);"
         data-890p="opacity: 0.3; transform: translate(0, 5%);"
         data-900p="opacity: 1; transform: translate(0, 0%);"
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
  import Diary from './Diary.vue'
  import SiteFooter from './SiteFooter.vue'
  import { forEach } from 'lodash'
  import { addClass, removeClass, isMobile } from '../helpers'

  export default {
    components: {
      Diary,
      SiteFooter
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

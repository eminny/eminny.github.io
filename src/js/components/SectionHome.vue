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

    <!-- .cart-tab start -->
    <button class="btn btn--cart-tab js-prevent-cart-listener">
      <span class="btn__counter"></span>
      <svg xmlns="http://www.w3.org/2000/svg" class="icon-cart icon-cart--side" viewBox="0 0 25 25" enable-background="new 0 0 25 25"><g fill="#0d0101"><path d="M24.6 3.6c-.3-.4-.8-.6-1.3-.6h-18.4l-.1-.5c-.3-1.5-1.7-1.5-2.5-1.5h-1.3c-.6 0-1 .4-1 1s.4 1 1 1h1.8l3 13.6c.2 1.2 1.3 2.4 2.5 2.4h12.7c.6 0 1-.4 1-1s-.4-1-1-1h-12.7c-.2 0-.5-.4-.6-.8l-.2-1.2h12.6c1.3 0 2.3-1.4 2.5-2.4l2.4-7.4v-.2c.1-.5-.1-1-.4-1.4zm-4 8.5v.2c-.1.3-.4.8-.5.8h-13l-1.8-8.1h17.6l-2.3 7.1z"></path><circle cx="9" cy="22" r="2"></circle><circle cx="19" cy="22" r="2"></circle></g></svg>
    </button>
    <!-- .cart-tab end -->

    <!-- .cart begin -->
    <div class="cart">
      <div class="cart-section cart-section--top">
        <h2 class="cart-title">Your cart</h2>
        <button class="btn--close">
          <span aria-role="hidden">×</span>
          <span class="visuallyhidden">Close</span>
        </button>
      </div>
      <div class="cart-form">
        <div class="cart-item-container cart-section"></div>
        <div class="cart-bottom">
          <div class="cart-info clearfix cart-section">
            <div class="type--caps cart-info__total cart-info__small">Total</div>
            <div class="cart-info__pricing">
              <span class="cart-info__small cart-info__total">USD</span>
              <span class="pricing pricing--no-padding"></span>
            </div>
          </div>
          <div class="cart-actions-container cart-section type--center">
            <input type="submit" class="btn--cart-checkout slide__product__btn-buy" id="checkout" name="checkout" value="Checkout">
          </div>
        </div>
      </div>
    </div>
    <!-- .cart end -->

    <script id="CartItemTemplate" type="text/template">
      <div class="cart-item">
        <div class="cart-item__img cart-item__content-row"></div>
          <span class="cart-item__title"></span>
          <div class="cart-item__content-row">
            <div class="cart-item__quantity-container">
              <button class="btn--seamless quantity-decrement" type="button"><span>-</span><span class="visuallyhidden">Decrement</span></button>
              <input class="cart-item__quantity" type="number" min="0" aria-label="Quantity">
              <button class="btn--seamless quantity-increment" type="button"><span>+</span><span class="visuallyhidden">Increment</span></button>
            </div>
            <span class="cart-item__price"></span>
          </div>
        </div>
      </div>
    </script>

    <!-- SECTION 1: THE CANDLE -->
    <div class="slide slide--1" id="the-fold"
         data-0="transform: translate(0, 100%);"
         data-100p="transform: translate(0, 0%)"
    >
      <!-- Product Images (non-mobile) -->
      <div class="slide__product-wrapper"
           v-if="!isMobile()"
           data-0="opacity: 0"
           data-100p="opacity: 1"
           data-200p="opacity: 1"
           data-250p="opacity: 0"
      >
        <div class="slide__product-images">
          <div class="slide__product-images__item">
            <img src="/images/product-vessel.png" alt="Vessel" class="slide__product-image">
          </div>
          <div class="slide__product-images__item">
            <img src="/images/product-box-front.png" alt="Front" class="slide__product-image">
          </div>
          <div class="slide__product-images__item">
            <img src="/images/product-box-back.png" alt="Back" class="slide__product-image">
          </div>
          <div class="slide__product-images__item">
            <img src="/images/product-box-top.png" alt="Top" class="slide__product-image">
          </div>
        </div>
        <div class="slide__product-info">
          <h2 class="slide__product-heading">Scent One</h2>
          <div>
            <button class="slide__product__btn-buy buy-button js-prevent-cart-listener">Pre-order</button>
          </div>
        </div>
      </div>
      <!-- Product Images (mobile-only) -->
      <div class="slide__product-carousel-wrapper" v-if="isMobile()">
        <div class="slide__product-carousel">
          <div class="slide__product-carousel__item">
            <img src="/images/product-vessel.png" alt="Vessel" class="slide__product-carousel__image">
          </div>
          <div class="slide__product-carousel__item">
            <img src="/images/product-box-front.png" alt="Front" class="slide__product-carousel__image">
          </div>
          <div class="slide__product-carousel__item">
            <img src="/images/product-box-back.png" alt="Back" class="slide__product-carousel__image">
          </div>
          <div class="slide__product-carousel__item">
            <img src="/images/product-box-top.png" alt="Top" class="slide__product-carousel__image">
          </div>
        </div>
        <div class="slide__product-info">
          <h2 class="slide__product-heading">Scent One</h2>
          <div>
            <button class="slide__product__btn-buy buy-button js-prevent-cart-listener">Pre-order</button>
          </div>
        </div>
      </div>
      <!-- Product Accent Photo (non-mobile-only) -->
      <div class="slide__accent-wrapper"
           data-0="opacity: 0"
           data-100p="opacity: 1"
           data-200p="opacity: 1"
           data-250p="opacity: 0"
      >
        <img src="/images/slide-accent-face.jpg" alt="Cander Paris" class="slide__accent-image">
      </div>
    </div>

    <!-- SECTION 2: THE SCENT -->
    <div class="slide slide--2"
         data-0="opacity: 0"
         data-200p="opacity: 0; transform: translate(0, 100%);"
         data-250p="opacity: 0; transform: translate(0, 5%);"
         data-300p="opacity: 1; transform: translate(0, 0%);"
         data-450p="opacity: 0; transform: translate(0, -2%);"
    >
      <div class="slide--2__bg"
           :class="darkMode ? 'is-dark' : 'is-light'"
           :style="{ backgroundImage: `url(${aromaticBackgroundUrl})` }"
           v-if="aromaticBackgroundIsVisible"
           transition="fade"
      ></div>
      <div class="the-scent">
        <h4 class="the-scent__title">Scent One</h4>
        <p class="the-scent__desc">Blending woody aromatics like <span class="aromatic" data-id="bouleau" @mouseover="showAromaticBg" v-touch:tap="showAromaticBg" @mouseout="hideAromaticBg(5000)">bouleau</span>,<br>
          <span class="aromatic" data-id="firBalsam" @mouseover="showAromaticBg" v-touch:tap="showAromaticBg" @mouseout="hideAromaticBg(5000)">fir balsam</span>, <span class="aromatic" data-id="santal" @mouseover="showAromaticBg" v-touch:tap="showAromaticBg" @mouseout="hideAromaticBg(5000)">santal</span>, and <span class="aromatic" data-id="agrumes" @mouseover="showAromaticBg" v-touch:tap="showAromaticBg" @mouseout="hideAromaticBg(5000)">agrumes</span>.
          <br>Adding a hint of mystery with<br> the scent of <span class="aromatic" data-id="patchouli" @mouseover="showAromaticBg" v-touch:tap="showAromaticBg" @mouseout="hideAromaticBg(5000)">patchouli</span>.
        </p>
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
        <h2 class="zeta">Coming soon in stores</h2>
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
  const Flickity = require('flickity')
  import { forEach } from 'lodash'
  import { addClass, removeClass, isMobile } from '../helpers'

  export default {
    components: {
      SiteFooter,
    },
    data () {
      return {
        darkMode: store.data.darkMode,
        menuOverlay: store.data.menuOverlay,
        scrollPos: store.data.scrollPos,
        skrollr: store.data.skrollr,
        currentAromatic: null,
        aromaticsTextFaded: false,
        scrollArrowIsVisible: true,
        scrollArrowIsActive: true,
        aromaticBackgroundUrl: '',
        aromaticBackgroundIsVisible: false,
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
      isMobile () {
        return isMobile()
      },
      enableDarkMode () {
        let shade = this.shadeLookup[this.currentAromatic]
        addClass(document.body, `shade--${shade}`)

        this.darkMode = true
        this.$dispatch('updateDarkMode', true)
      },
      disableDarkMode () {
        let shade = this.shadeLookup[this.currentAromatic]
        removeClass(document.body, `shade--${shade}`)

        this.darkMode = false
        this.$dispatch('updateDarkMode', false)
      },
      scrollToFold () {
        let el = document.getElementById('the-fold')
        let foldOffset = el.getBoundingClientRect().top + document.body.scrollTop
        if (window.flkty) {
          window.flkty.playPlayer()
        }

        scrollHelper.top(page, Number(foldOffset), { duration: 400 })
        return
      },
      showAromaticBg (event) {
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
      hideAromaticBg (timeoutDuration = 2000) {
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
      instantiateMobileFlickity () {
        let flickityInstance = new Flickity('.slide__product-carousel', {
          cellSelector: '.slide__product-carousel__item',
          cellAlign: 'left',
          contain: true,
          pageDots: false,
          prevNextButtons: true,
          slidesWidth: '20rem',
          selectedAttraction: 0.2,
          friction: 0.8,
          arrowShape: {
            x0: 10,
            x1: 55, y1: 45,
            x2: 60, y2: 40,
            x3: 20
          },
        })

        window.flkty = flickityInstance
      },
      instantiateDesktopFlickity () {
        let flickityInstance = new Flickity('.slide__product-images', {
          cellSelector: '.slide__product-images__item',
          cellAlign: 'center',
          contain: true,
          draggable: false,
          pageDots: false,
          prevNextButtons: false,
          slidesWidth: '30rem',
          wrapAround: true,
        })

        window.flkty = flickityInstance
      },
      preloadImages () {
        const aromatics = ['bouleau', 'firBalsam', 'santal', 'agrumes', 'patchouli']
        forEach(aromatics, function (aromatic) {
          (new Image()).src = `/images/bg-aromatic-${aromatic}.jpg`
        })
      },
    },
    ready () {
      const isMobile = this.isMobile()
      this.preloadImages()

      if (isMobile) {
        addClass(document.body, 'is-mobile')
        this.instantiateMobileFlickity()
      } else {
        addClass(document.body, 'is-not-mobile')
        this.instantiateDesktopFlickity()
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

        if (pos < -window.innerHeight && !(pos < -2 * window.innerHeight)) {
          // Got to first slide
          window.flkty.playPlayer()
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
    destroyed () {
      // Destroy skrollr instance
      if (this.skrollr) {
        this.skrollr.destroy()
      }

      // Destroy flickity instance
      if (window.flkty) {
        window.flkty.destroy()
      }
    },
  }
</script>

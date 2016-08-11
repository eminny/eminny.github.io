<template>
  <div class="slides">
    <!-- SECTION 0: INTRO/HERO -->
    <div class="slide slide--0 slide--intro">
      <div class="slide--intro__logo"
           data-0="opacity: 1;"
           data-top-center="opacity: 0;"
      >
        <img src="/images/logo.svg" title="CANDER PARIS">
      </div>
      <a href="#" @click.prevent="scrollToFold"
         class="slide--intro__icn-scroll"
         data-0="opacity: 1;"
         data-center-top="opacity: 0;"
         v-show="scrollArrowIsVisible"
         transition="fade"
      >Scroll Down</a>
    </div>

    <!-- SECTION 1: THE CANDLE -->
    <div class="slide slide--1" id="the-fold"
         data-0="transform: translate(0, 100%);"
         data-100p="transform: translate(0, 0%)"
    >
      <!-- Product Images (non-mobile) -->
      <div class="slide__product-wrapper" v-if="!isMobile()">
        <div class="slide__product-images">
          <img src="/images/product-vessel.png" alt="Vessel"
               class="slide__product-image"
               data-0="opacity: 0"
               data-50p="opacity: 1"
               data-100p="opacity: 1"
               data-150p="opacity: 0"
          >
          <img src="/images/product-box-front.png" alt="Front"
               class="slide__product-image"
               data-150p="opacity: 0"
               data-200p="opacity: 1"
               data-250p="opacity: 1"
               data-300p="opacity: 0"
          >
          <img src="/images/product-box-back.png" alt="Back"
               class="slide__product-image"
               data-300p="opacity: 0"
               data-350p="opacity: 1"
               data-400p="opacity: 1"
               data-450p="opacity: 0"
          >
          <img src="/images/product-box-top.png" alt="Top"
               class="slide__product-image"
               data-450p="opacity: 0"
               data-500p="opacity: 1"
               data-600p="opacity: 1"
               data-650p="opacity: 0"
          >
        </div>
        <div class="slide__product-info"
             data-0="opacity: 0"
             data-100p="opacity: 1"
             data-600p="opacity: 1"
             data-650p="opacity: 0"
        >
          <h2 class="slide__product-heading">Scent One</h2>
          <h4 class="slide__product-desc slide__product-desc--primary">Scent One is an exploration of the beginning.</h4>
          <h4 class="slide__product-desc slide__product-desc--secondary">Scent One est l'exploration du début.</h4>
          <div><a class="slide__product__btn-buy" href="#">Buy now</a></div>
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
          <h4 class="slide__product-desc slide__product-desc--primary">Scent One is an exploration of the beginning.</h4>
          <h4 class="slide__product-desc slide__product-desc--secondary">Scent One est l'exploration du début.</h4>
          <div><a class="slide__product__btn-buy" href="#">Buy now</a></div>
        </div>
      </div>
      <!-- Product Accent Photo (non-mobile-only) -->
      <div class="slide__accent-wrapper"
           data-0="opacity: 0"
           data-100p="opacity: 1"
           data-600p="opacity: 1"
           data-650p="opacity: 0"
      >
        <img src="/images/slide-accent-face.jpg" alt="Cander Paris" class="slide__accent-image">
      </div>
    </div>

    <!-- SECTION 2: THE SCENT -->
    <div class="slide slide--2"
         data-0="opacity: 0"
         data-600p="opacity: 0; transform: translate(0, 100%);"
         data-650p="opacity: 0; transform: translate(0, 5%);"
         data-700p="opacity: 1; transform: translate(0, 0%);"
         data-850p="opacity: 0; transform: translate(0, -2%);"
    >
      <div class="slide--2__bg"
           v-bind:style="{ backgroundImage: `url(${aromaticBackgroundUrl})` }"
           v-show="aromaticBackgroundIsVisible"
           transition="fade"
      ></div>
      <div class="the-scent">
        <h4 class="the-scent__title">Scent One</h4>
        <p class="the-scent__desc {{ aromaticsTextFaded ? 'is-faded' : 'is-opaque' }}">Blending woody aromatics like <span class="aromatic" data-id="cypres" @mouseover="showAromaticBg" @mouseout="hideAromaticBg">cyprés</span>,<br>
          <span class="aromatic" data-id="cedre" @mouseover="showAromaticBg" @mouseout="hideAromaticBg">cédre</span>, and <span class="aromatic" data-id="oud" @mouseover="showAromaticBg" @mouseout="hideAromaticBg">oud</span>, with sensual <span class="aromatic" data-id="rose" @mouseover="showAromaticBg" @mouseout="hideAromaticBg">rose</span> and<br>
          <span class="aromatic" data-id="patchouli" @mouseover="showAromaticBg" @mouseout="hideAromaticBg">patchouli</span>. Adding a hint of mystery<br>
          with the scent of <span class="aromatic" data-id="cuir" @mouseover="showAromaticBg" @mouseout="hideAromaticBg">cuir</span>.
        </p>
        <p class="the-scent__discover {{ (aromaticsTextFaded && isMobile()) ? 'transparent' : '' }}"
           data-id="cypres"
           @mouseover="showAromaticBg"
           @mouseout="hideAromaticBg"
        >{{ isMobile() ? 'Tap' : 'Roll over' }} to discover.</p>
      </div>
    </div>

    <!-- SECTION 3: DOOR -->
    <div class="slide slide--3"
         data-0="opacity: 0"
         data-840p="opacity: 0; transform: translate(0, 100%);"
         data-850p="opacity: 0; transform: translate(0, 30%);"
         data-900p="opacity: 1; transform: translate(0, 0%);"
         data-1050p="opacity: 1; transform: translate(0, 0%);"
         data-1150p="transform: translate(0, -120%);"
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
         data-1100p="opacity: 0; transform: translate(0, 100%);"
         data-1125p="opacity: 0; transform: translate(0, 20%);"
         data-1160p="opacity: 0.3; transform: translate(0, 5%);"
         data-1170p="opacity: 1; transform: translate(0, 0%);"
         data-1200p="transform: translate(0, 0%);"
         data-1290p="transform: translate(0, -15%);"
    >
      <div class="slide--4__inner">
        <img src="/images/product-box-front.png" alt="Front" class="slide--4__product-image">
        <h2 class="zeta">Coming soon in stores</h2>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="slide--footer-wrapper"
         data-0="opacity: 0"
         data-1200p="opacity: 0; transform: translate(0, 100%);"
         data-1225p="opacity: 0; transform: translate(0, 20%);"
         data-1260p="opacity: 0.3; transform: translate(0, 5%);"
         data-1270p="opacity: 1; transform: translate(0, 0%);"
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
  import { debounce } from 'lodash'
  import { addClass, removeClass, isMobile } from '../helpers'

  export default {
    components: {
      SiteFooter,
    },
    data () {
      return {
        scrollPos: store.data.scrollPos,
        skrollr: store.data.skrollr,
        visibleIngredient: null,
        aromaticsTextFaded: false,
        scrollArrowIsVisible: true,
        aromaticBackgroundUrl: '',
        aromaticBackgroundIsVisible: false,
        shadeLookup: {
          cypres: 'light',
          cedre: 'dark',
          oud: 'dark',
          rose: 'light',
          patchouli: 'dark',
          cuir: 'light',
        },
      }
    },
    methods: {
      isMobile () {
        return isMobile()
      },
      scrollToFold () {
        let el = document.getElementById('the-fold')
        let foldOffset = el.getBoundingClientRect().top + document.body.scrollTop
        return scrollHelper.top(page, Number(foldOffset), { duration: 400 })
      },
      showAromaticBg (event) {
        // Set visibility
        this.aromaticBackgroundIsVisible = true

        // Get the current ingredient
        let visibleIngredient = event.currentTarget.getAttribute('data-id')
        this.visibleIngredient = visibleIngredient

        // Set active state on the tapped/hovered item
        let el = document.querySelector(`.aromatic[data-id="${visibleIngredient}"]`)
        addClass(el, 'is-active')

        // Set the background
        this.aromaticBackgroundUrl = `/images/bg-aromatic-${visibleIngredient}.jpg`

        // Is the background light or dark?
        const shade = this.shadeLookup[visibleIngredient]
        addClass(document.body, `shade--${shade}`)
      },
      hideAromaticBg (event) {
        // Set visibility
        this.aromaticBackgroundIsVisible = false

        // Get the current ingredient (and unset it)
        let visibleIngredient = event.currentTarget.getAttribute('data-id')
        this.visibleIngredient = null

        // Set active state on the tapped/hovered item
        let el = document.querySelector(`.aromatic[data-id="${visibleIngredient}"]`)
        removeClass(el, 'is-active')

        // Unset the background
        setTimeout(() => {
          this.aromaticBackgroundUrl = ''
        }, 5000)

        // Is the background light or dark?
        const shade = this.shadeLookup[visibleIngredient]
        removeClass(document.body, `shade--${shade}`)
      },
      instantiateFlickity () {
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
    },
    ready () {

      if (isMobile()) {
        addClass(document.body, 'is-mobile')
        this.instantiateFlickity()
      } else {
        addClass(document.body, 'is-not-mobile')
        // Initialize skrollr
        if (! this.skrollr) {
          const skrollrOpts = {}
          this.skrollr = skrollr.init(skrollrOpts)
        }
      }

      this.$watch('scrollPos.top', (pos) => {
        if (pos < -200) {
          this.scrollArrowIsVisible = false
        } else {
          this.scrollArrowIsVisible = true
        }
      })

    },
    destroyed () {
      // Destroy skrollr instance
      if (this.skrollr) {
        this.skrollr.destroy()
      }

      // Destroy skrollr instance
      if (window.flkty) {
        window.flkty.destroy()
      }
    },
  }
</script>

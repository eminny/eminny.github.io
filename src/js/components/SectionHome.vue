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
      >Scroll Down</a>
    </div>

    <!-- SECTION 1: THE CANDLE -->
    <div class="slide slide--1" id="the-fold"
         data-0="transform: translate(0, 100%);"
         data-100p="transform: translate(0, 0%)"
    >
      <div class="slide__product-wrapper">
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
        </div>
      </div>
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
      <div class="the-scent">
        <h4 class="the-scent__title">Scent One</h4>
        <p class="the-scent__desc">Blending woody aromatics like <span class="aromatic" data-id="cypres" @mouseover="showIngredient" @mouseout="hideIngredient">cyprés</span>,<br>
          <span class="aromatic" data-id="cedre" @mouseover="showIngredient" @mouseout="hideIngredient">cédre</span>, and <span class="aromatic" data-id="oud" @mouseover="showIngredient" @mouseout="hideIngredient">oud</span>, with sensual <span class="aromatic" data-id="rose" @mouseover="showIngredient" @mouseout="hideIngredient">rose</span> and<br>
          <span class="aromatic" data-id="patchouli" @mouseover="showIngredient" @mouseout="hideIngredient">patchouli</span>. Adding a hint of mystery<br>
          with the scent of <span class="aromatic" data-id="cuir" @mouseover="showIngredient" @mouseout="hideIngredient">cuir</span>.</p>
      </div>
      <div class="ingredients">
        <div class="ingredient ingredient--cypres" v-show="visibleIngredient == 'cypres'" transition="fade">
          <img src="/images/story-ingredient-cedre.png" alt="cypres">
        </div>
        <div class="ingredient ingredient--cedre" v-show="visibleIngredient == 'cedre'" transition="fade">
          <img src="/images/story-ingredient-cedre.png" alt="cedre">
        </div>
        <div class="ingredient ingredient--oud" v-show="visibleIngredient == 'oud'" transition="fade">
          <img src="/images/story-ingredient-cedre.png" alt="oud">
        </div>
        <div class="ingredient ingredient--rose" v-show="visibleIngredient == 'rose'" transition="fade">
          <img src="/images/story-ingredient-rose.png" alt="rose">
        </div>
        <div class="ingredient ingredient--patchouli" v-show="visibleIngredient == 'patchouli'" transition="fade">
          <img src="/images/story-ingredient-cedre.png" alt="patchouli">
        </div>
        <div class="ingredient ingredient--cuir" v-show="visibleIngredient == 'cuir'" transition="fade">
          <img src="/images/story-ingredient-cedre.png" alt="cuir">
        </div>
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

  export default {
    components: {
      SiteFooter,
    },
    data () {
      return {
        skrollr: store.data.skrollr,
        visibleIngredient: null,
      }
    },
    methods: {
      isMobile () {
        return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
      },
      scrollToFold () {
        let el = document.getElementById('the-fold')
        let foldOffset = el.getBoundingClientRect().top + document.body.scrollTop
        return scrollHelper.top(page, Number(foldOffset), { duration: 400 })
      },
      showIngredient (event) {
        let visibleIngredient = event.currentTarget.getAttribute('data-id')
        this.visibleIngredient = visibleIngredient
      },
      hideIngredient (event) {
        this.visibleIngredient = null
      },
    },
    ready () {
      console.log('Home loaded.')

      if (this.isMobile()) {
        addClass(document.body, 'is-mobile')
      } else {
        addClass(document.body, 'is-not-mobile')
        // Initialize skrollr
        if (! this.skrollr) {
          const skrollrOpts = {}
          this.skrollr = skrollr.init(skrollrOpts)
        }
      }
    },
    destroyed () {
      // Destroy skrollr instance
      if (this.skrollr) {
        this.skrollr.destroy()
      }
    },
  }

  function addClass(el, className) {
    if (el.classList) {
      el.classList.add(className)
    } else {
      el.className += ` ${className}`
    }
  }
</script>

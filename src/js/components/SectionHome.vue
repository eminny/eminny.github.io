<template>
  <div class="slides">
    <!-- SECTION 0: INTRO/HERO -->
    <div class="slide slide--intro">
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
    <div class="slide slide--split" id="the-fold"
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
        <img src="/images/slide-accent-face.png" alt="Faces" class="slide__accent-image">
      </div>
    </div>

    <!-- SECTION 2: THE SCENT -->
    <!--<div class="slide" style="background:#ccc"-->
         <!--data-0="opacity: 0"-->
         <!--data-500p="opacity: 1"></div>-->
  </div>
</template>

<style lang="sass" scoped>

</style>

<script>
  import skrollr from 'skrollr'
  import scroll from 'scroll'
  import store from '../store'
  const page = require('scroll-doc')()

  export default {
    data () {
      return {
        skrollr: store.data.skrollr,
      }
    },
    methods: {
      scrollToFold () {
        let el = document.getElementById('the-fold')
        let foldOffset = el.getBoundingClientRect().top + document.body.scrollTop
        console.log(foldOffset)
        scroll.top(page, foldOffset, { duration: 400 })
      }
    },
    ready () {
      console.log('Home loaded.')

      // Initialize skrollr
      if (! this.skrollr) {
        const skrollrOpts = {}
        this.skrollr = skrollr.init(skrollrOpts)
      }
    },
    destroyed () {

      // Destroy skrollr instance
      if (this.skrollr) {
        this.skrollr.destroy()
      }
    },
  }
</script>

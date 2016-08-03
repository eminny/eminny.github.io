<template>
  <!-- SECTION 0: HERO -->
  <div class="slide slide--intro">
    <div class="slide--intro__logo skrollable skrollable-between"
         data-0="opacity: 1;"
         data-top-center="opacity: 0;"
    ><img src="/images/logo.svg" title="CANDER PARIS"></div>
    <a href="#" @click.prevent="scrollToFold"
       class="slide--intro__icn-scroll skrollable skrollable-between"
       data-0="opacity: 1;"
       data-center-top="opacity: 0;"
    >Scroll Down</a>
  </div>

  <!-- SECTION 1: THE SCENT -->
  <div id="the-fold" class="slide slide--split">
    <div class="slide__product-wrapper">
      <img src="/images/product-vessel.png" alt="Vessel" class="slide__product-image">
      <h2 class="slide__product-heading">Scent One</h2>
      <h4 class="slide__product-desc slide__product-desc--primary">Scent One is an exploration of the beginning.</h4>
      <h4 class="slide__product-desc slide__product-desc--secondary">Scent One est l'exploration du début.</h4>
    </div>
    <div class="slide__accent-wrapper">
      <img src="/images/slide-accent-face.png" alt="Faces" class="slide__accent-image">
    </div>
  </div>
  <div class="slide" style="background:#ededed"></div>
</template>

<style lang="sass"></style>

<script>
  import skrollr from 'skrollr'
  import scroll from 'scroll'
  const page = require('scroll-doc')()

  export default {
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

      skrollr.init()
    },
    destroy () {
      skrollr.destroy()
    },
  }
</script>

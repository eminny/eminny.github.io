<template>
  <div class="slide slide--intro">
    <div class="logo--intro">
      <img src="/images/logo.svg" title="CANDER PARIS">
    </div>
    <a href="#" @click.prevent="scrollToFold" class="icn--scroll-down">Scroll Down</a>
  </div>
  <div id="the-fold" class="slide" style="background:plum"></div>
  <div class="slide" style="background:gray"></div>
</template>

<style lang="sass">
  .logo--intro {
    transform: translateY(-3rem);
    user-select: none;
    width: 20rem;
  }

  .icn--scroll-down {
    background: url('/images/icon-scroll-down.svg') center center no-repeat;
    position: absolute;
    bottom: 10%;
    left: 50%;
    text-indent: -9999px;
    transform: translateX(-50%);
    height: 1.5rem;
    width: 3.4rem;
  }
</style>

<script>
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
    }
  }
</script>

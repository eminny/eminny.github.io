<template>
  <div class="single-page">
    <div class="single-page__content">
      <div class="section-product__intro">
        <div class="section-product__intro__image-wrap">
          <img src="/images/product-page-default.jpg" alt="Product Page Default" class="section-product__intro__image">
        </div>
        <div class="section-product__intro__text-wrap">
          <div class="section-product__intro__text-wrap__inner" v-show="language === 'en'" transition="fade">
            <h1 class="zeta">PRODUCT</h1>
            <!-- <h2 class="delta"><strong>Can<span style="font-size:0.75em">•</span>dor [ 'kandər ]</strong>, <em>noun</em><br>the quality of being open and honest in expression</h2> -->
            <h3 class="p-beta">Our products are manufactured by the oldest and most exclusive French candlemakers in the world, Cire Trudon private label. Founded in 1643, CIR supplied candles to the royal court of King Louis XIV and continues to provide some of highest quality wax in the world today. The brands under their private label production are extremely selective and few.
            <br>The candle vessels are made of hand-blown glass in exquisite colors. Our wax is a non-toxic vegetal blend within the OSPAR by Greenpeace standards.
            <br>Each fragrance is created in Paris by elite perfumer Emmanuel Philip at his atelier, featuring works of Balsam Fir, Rose, Amber, and Sandalwood.  </h3>
            <h3 class="p-beta">Burn instructions: <br> For an ideal burn, we suggest trimming the wick to 3-5mm before each use. The candles should ideally be stored at room temperature.  </h3>
          </div>
        </div>
      </div>
    </div>
    <site-footer></site-footer>
  </div>
</template>

<style lang="sass" scoped>
  @import "../../stylesheets/variables";

  .section-product__intro {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    @media screen and ($large-screens) {
      align-items: flex-start;
      flex-direction: row;
      justify-content: center;
    }
  }

  .section-product__intro__image-wrap,
  .section-product__intro__text-wrap {
    width: 90%;
    @media screen and ($large-screens) {
      padding: 5rem;
      width: 50%;
    }
  }

  .section-product__intro__image-wrap {
    @media screen and ($large-screens) {
      padding-right: 0;
      align-items: flex-start;
    }
  }

  .section-product__intro__image {
    height: auto;
    width: auto;
    max-width: 600px;
    max-height: 550px;
    margin-top: 4rem;
  }

  .section-product__intro__text-wrap {
    margin-bottom: 2rem;

    h1 {
      margin: 4rem 0 2rem 0;
    }

    h3 {
      margin: 2.5rem 0 2rem 0;
    }
  }

  .section-product__intro__text-wrap__inner {
    opacity: 1;
    max-width: 50rem;
    min-height: 27rem;

    @media screen and ($large-screens) {
      position: relative;
    }
  }

  .section-product__intro__language-switch {
    border-top: 1px solid $color__gray-light;
    display: inline-block;
    padding-top: 0.666rem;

    a {
      color: $color__gray;
      letter-spacing: 0.1rem;
      text-decoration: none;
      transition: color $transition-standard;

      &:first-of-type {
        margin-right: 0.666rem;
      }
      &.is-active,
      &:active,
      &:hover {
        color: $color__black;
      }
    }

    @media screen and ($large-screens) {
      position: absolute;
    }
  }

</style>

<script>
  import scroll from 'scroll'
  import store from '../store'
  import SiteFooter from './SiteFooter.vue'
  const page = require('scroll-doc')()

  export default {
    data () {
      return {
        language: store.data.language,
      }
    },
    components: {
      SiteFooter,
    },
    methods: {
      setLanguage (lang) {
        this.language = lang
        this.scrollToTop()
      },
      scrollToTop () {
        scroll.top(page, 0, { duration: 400 })
      },
    },
    ready () {},
  }
</script>

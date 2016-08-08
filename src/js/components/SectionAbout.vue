<template>
  <div class="single-page">
    <div class="single-page__content">
      <div class="section-about__intro">
        <div class="section-about__intro__image-wrap">
          <img src="/images/about-intro-elizabeth-minett.jpg" alt="BY ELIZABETH MINETT">
        </div>
        <div class="section-about__intro__text-wrap">
          <div class="section-about__intro__text-wrap__inner" v-if="language === 'en'" transition="fade">
            <h1 class="zeta">by Elizabeth Minett</h1>
            <h2 class="gamma">Cander candles blends essential oils and fragrances in a soy based candle to create an elevated experience.</h2>
            <h3 class="p-beta">Founded by Elizabeth Minett, each and every candle fragrance is exquisitely crafted. Content about the brand, story, vision, and/or mission of the company. Luxury candles providing and enhancing a refined lifestyle.</h3>
          </div>
          <div class="section-about__intro__text-wrap__inner" v-if="language === 'fr'" transition="fade">
            <h1 class="zeta">par Elizabeth Minett</h1>
            <h2 class="gamma">Bougies Cander mélanges essentiels parfum des sables bitumineux Sina bougie à base de soja pour créer une expérience de presse élevée.</h2>
            <h3 class="p-beta">Fondée par Elizabeth Minett, chaque parfum de bougie est délicieusement conçu. Contenu sur la marque, l'histoire, la vision et / ou de la mission de l'entreprise. Bougies de luxe fournir et améliorer un mode de vie raffiné.</h3>
          </div>
          <div class="section-about__intro__language-switch">
            <a href="#" @click.prevent="setLanguage('en')" class="{{ language === 'en' ? 'is-active' : '' }}">EN</a>
            <a href="#" @click.prevent="setLanguage('fr')" class="{{ language === 'fr' ? 'is-active' : '' }}">FR</a>
          </div>
        </div>
      </div>
      <diary></diary>
    </div>
    <site-footer></site-footer>
  </div>
</template>

<style lang="sass" scoped>
  @import "../../stylesheets/variables";

  .section-about__intro {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    @media screen and ($large-screens) {
      align-items: center;
      flex-direction: row;
      justify-content: center;
    }
  }

  .section-about__intro__image-wrap,
  .section-about__intro__text-wrap {
    width: 90%;
    @media screen and ($large-screens) {
      padding: 5rem;
      width: 50%;
    }
  }

  .section-about__intro__image-wrap {
    @media screen and ($large-screens) {
      padding-right: 0;
      align-items: flex-end;
    }
  }

  .section-about__intro__text-wrap {
    margin-bottom: 2rem;

    h1 {
      margin: 4rem 0 2rem 0;
    }

    h3 {
      margin: 2.5rem 0 2rem 0;
    }

    @media screen and ($large-screens) {

    }
  }

  .section-about__intro__text-wrap__inner {
    opacity: 1;
    max-width: 50rem;
    min-height: 27rem;

    @media screen and ($large-screens) {
      position: relative;
    }
  }

  .section-about__intro__language-switch {
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
      &:active {
        color: $color__black;
      }
    }

    @media screen and ($large-screens) {
      position: absolute;
    }
  }

</style>

<script>
  import Diary from './Diary.vue'
  import SiteFooter from './SiteFooter.vue'
  import store from '../store.js'

  export default {
    data () {
      return {
        language: store.data.language,
      }
    },
    components: {
      Diary,
      SiteFooter,
    },
    methods: {
      setLanguage (lang) {
        this.language = lang
      },
    },
    ready () {},
  }
</script>

<template>
  <div class="single-page">
    <div class="single-page__content">
      <div class="section-about__intro">
        <div class="section-about__intro__image-wrap">
          <img src="/images/about-intro-elizabeth-minett.jpg" alt="BY ELIZABETH MINETT" class="section-about__intro__image">
        </div>
        <div class="section-about__intro__text-wrap">
          <div class="section-about__intro__text-wrap__inner" v-show="language === 'en'" transition="fade">
            <h1 class="zeta">by Elizabeth Minett</h1>
            <h2 class="delta"><strong>Can<span style="font-size:0.75em">•</span>dor [ 'kandər ]</strong>, <em>noun</em><br>the quality of being open and honest in expression</h2>
            <h3 class="p-beta">Cander Paris was founded in 2016 by Elizabeth Minett. Elizabeth was born and raised in a place where candor was the essence of her culture. A childhood filled with the rustic landscapes of harsh winters would forever shape her olfactive tastes. She developed a more refined nose during her years travelling the globe as a bon vivant, especially whilst in France. Cander Paris is inspired not only by her passion for luxury ambiance, but by the intimacy of candid moments, and the quest for genuine expression. She has teamed with world-renowned French perfumer Emmanuel Philip to create her debut collection. Made in France with the excellence and tradition of French perfumery, the candles are exquisitely crafted of the highest quality. Refined, and euphorically indulgent. The fragrances of candid moments.</h3>
            <h3 class="p-beta">Elizabeth was born and raised near Toronto, Canada of Norwegian and Russian heritage. After a chance encounter in an elevator, she was scouted to work as a fashion model and soon moved to Europe. She was an early adopter of the digital influencer trend, and transitioned from the modelling world to create her successful lifestyle website. An auspicious visit to her friend’s perfume lab set her heart aflame for her next evolution as a scent creator. She is one of the youngest female entrepreneurs to have created her own luxury home scent brand. Elizabeth is regularly featured in online publications like Vogue, Elle, Harper’s Bazaar, and Grazia for her style and influence.</h3>
          </div>
          <div class="section-about__intro__text-wrap__inner" v-show="language === 'fr'" transition="fade">
            <h1 class="zeta">par Elizabeth Minett</h1>
            <h2 class="delta"><strong>Can<span style="font-size:0.75em">•</span>deur [ kan.dœr ]</strong>, <em>nom féminin</em><br>charactère du celui qui se montre ingénu</h2>
            <h3 class="p-beta">La maison CANDER Paris a été fondée en 2016 par Elizabeth Minett. C’est au Canada qu’Elizabeth a été élevée dans la plus grande ingénuité. Elle garde de son enfance les souvenirs olfactifs d’une nature sauvage, de paysages rustiques marqués par les saisons. Epicurienne, elle affine progressivement ses capacités sensorielles lors de ses nombreux voyages. Plus qu’une maison de luxe, CANDER Paris est ainsi le fruit d’une véritable quête d’authenticité. C’est la raison pour laquelle Elizabeth a choisi de s’associer au talentueux parfumeur français Emmanuel Philip pour la création de sa première collection. Résultat d’une confection délicate, les bougies CANDER sont fabriquées en France dans le plus pur respect des traditions et savoir-faire de la parfumerie de luxe.</h3>
            <h3 class="p-beta">Elizabeth nait et grandit au Canada près de Toronto où elle bénéficie également d’une culture russe et norvégienne par ses parents. Pendant son adolescence, alors qu’elle se trouve dans un ascenseur, Elizabeth se fait repérer pour devenir mannequin et part rapidement en Europe pour lancer sa carrière. Adepte du monde digital et consciente de l’impact des « influenceurs », elle se transforme en bloggeuse lifestyle et lance avec succès son propre site. C’est finalement au cours d’une visite dans l’atelier de l’un de ses amis parfumeur que se révèle sa vocation de créatrice de parfums. Elle devient ainsi la plus jeune entrepreneur dans le monde de la parfumerie d’ambiance de luxe. Avec son style unique, Elizabeth est souvent représentée dans des publications prestigieuses telles que Vogue, Elle, Harper’s Bazaar ou encore Grazia.</h3>
          </div>
          <div class="section-about__intro__language-switch">
            <a href="#" @click.prevent="setLanguage('en')" class="{{ language === 'en' ? 'is-active' : '' }}">EN</a>
            <a href="#" @click.prevent="setLanguage('fr')" class="{{ language === 'fr' ? 'is-active' : '' }}">FR</a>
          </div>
        </div>
      </div>
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
      align-items: flex-start;
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
      align-items: flex-start;
    }
  }

  .section-about__intro__image {
    margin-top: 4rem;
  }

  .section-about__intro__text-wrap {
    margin-bottom: 2rem;

    h1 {
      margin: 4rem 0 2rem 0;
    }

    h3 {
      margin: 2.5rem 0 2rem 0;
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

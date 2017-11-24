<template>
  <div class="articles-container">
    <section class="wider">
      <h1 class="section__heading--alpha">Press</h1>
      <hr>
      <ul class="articles-list" v-if="articles.length">
        <li class="article" v-for="article in articles">
          <a href="{{ article.website }}" p class='article__image'>
            <img src="{{ article.image }}"></img>
          </p>
          <h3 class="article__name">{{ article.name }}</h3>
          <div class="article__subtitle">{{ article.subtitle }}</div>
        </li>
      </ul>
      <div v-if="!articles.length">
        <p class="articles__empty-state-message">Coming Soon</p>
      </div>
  </section>
    <site-footer></site-footer>
  </div>
</template>

<style lang="sass" scoped>
  @import "stylesheets/section-press";
</style>

<script>
  import { isEmpty } from 'lodash'
  import press from '../press'
  import SiteFooter from './SiteFooter.vue'

  export default {
    components: {
      SiteFooter,
    },
    data () {
      return {
        articles: press.data.articles,
      }
    },
  }
</script>

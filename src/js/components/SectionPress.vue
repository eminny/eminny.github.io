<template>
  <header>
  <!-- Facebook Pixel Code -->
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', '200282564039202');
    fbq('track', 'PageView');
  </script>
  <noscript>
    <img height="1" width="1"
  src="https://www.facebook.com/tr?id=200282564039202&ev=PageView
  &noscript=1"/>
  </noscript>
  <!-- End Facebook Pixel Code -->
  </header>
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

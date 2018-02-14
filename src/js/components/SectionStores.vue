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
  <div>
    <section>
      <h1 class="section__heading--alpha">Retailers</h1>
      <hr>
      <ul class="retailers-list" v-if="retailers.length">
        <li class="retailer" v-for="retailer in retailers">
          <h3 class="retailer__name">{{ retailer.name }}</h3>
          <div class="retailer__locations" v-if="retailer.locations && retailer.locations.length">
            <p v-for="location in retailer.locations">{{{ location }}}</p>
          </div>
          <p class="retailer__website">
            <a href="{{ retailer.website }}" target="_blank" title="Visit {{ retailer.name }}">{{ retailer.website }}</a>
          </p>
          <a href="#" class="retailer__map-btn" :class="retailer.mapRevealed ? 'is-active' : ''" @click.prevent="toggleMapRevealed(retailer)" v-if="hasMapLocation(retailer)">View Map</a>
          <div class="retailer__map" v-if="mapIsVisible(retailer)" transition="fade">
            <google-map :map-id="$index" :coords="retailer.mapCoords"></google-map>
          </div>
        </li>
      </ul>
      <div v-if="!retailers.length">
        <p class="retailers__empty-state-message">Coming Soon</p>
      </div>
  </section>
    <site-footer></site-footer>
  </div>
</template>

<style lang="sass" scoped>
  @import "stylesheets/section-stores";
</style>

<script>
  import { isEmpty } from 'lodash'
  import store from '../store'
  import SiteFooter from './SiteFooter.vue'
  import GoogleMap from './GoogleMap.vue'

  export default {
    components: {
      SiteFooter,
      GoogleMap
    },
    data () {
      return {
        retailers: store.data.retailers,
      }
    },
    methods: {
      hasMapLocation (retailer) {
        if (!isEmpty(retailer.mapCoords)) {
          return true
        }
        return false
      },
      mapIsVisible (retailer) {
        if (retailer.mapRevealed && !isEmpty(retailer.mapCoords)) {
          return true
        }
        return false
      },
      toggleMapRevealed (retailer) {
        retailer.mapRevealed = !retailer.mapRevealed
      },
    },
  }
</script>

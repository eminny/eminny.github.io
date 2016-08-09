<template>
  <div>
    <section>
      <h1 class="section__heading--alpha">Retailers</h1>
      <hr>
      <ul class="retailers-list">
        <li class="retailer" v-for="retailer in retailers">
          <h3 class="retailer__name">{{ retailer.name }}</h3>
          <div class="retailer__locations" v-if="retailer.locations">
            <p v-for="location in retailer.locations">{{{ location }}}</p>
          </div>
          <p class="retailer__website">
            <a href="{{ retailer.website }}" target="_blank" title="Visit {{ retailer.name }}">{{ retailer.website }}</a>
          </p>
          <a href="#" class="retailer__map-btn" :class="retailer.mapRevealed ? 'is-active' : ''" @click.prevent="toggleMapRevealed(retailer)" v-if="hasMap(retailer)">View Map</a>
          <div class="retailer__map" v-if="mapIsVisible(retailer)" transition="fade-slide">
            <img src="{{ retailer.mapUrl }}" alt="{{ retailer.name }}" title="{{ retailer.name }}">
          </div>
        </li>
      </ul>
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

  export default {
    components: {
      SiteFooter,
    },
    methods: {
      hasMap (retailer) {
        if (!isEmpty(retailer.mapUrl)) {
          return true
        }
        return false
      },
      mapIsVisible (retailer) {
        if (retailer.mapRevealed) {
          return true
        }
        return false
      },
      toggleMapRevealed (retailer) {
        retailer.mapRevealed = !retailer.mapRevealed
      },
    },
    data () {
      return {
        retailers: store.data.retailers,
      }
    },
  }
</script>

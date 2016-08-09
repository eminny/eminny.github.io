<template>
  <div class="google-map">
    <div id="map-{{* mapId }}"></div>
  </div>
</template>

<style lang="sass">
  .google-map,
  .google-map > div {
    height: 100%;
  }

  .gm-style-iw * {
    display: block;
    width: 100%;
  }

  .gm-style-iw h4,
  .gm-style-iw p {
    margin: 0;
    padding: 0;
  }

  .gm-style-iw a {
    color: #4272db;
  }

  .gmnoprint,
  .gmnoscreen,
  .gm-style-cc {
    display: none !important;
  }

  .gm-style > div {
    display: none;
  }

  .gm-style > div:first-child {
    display: block;
  }
</style>

<script>
  import store from '../store'
  let GoogleMapsLoader = require('google-maps')

  export default {
    props: [
      'mapId',
      'coords',
    ],
    data () {
      return {
        googleMaps: store.data.googleMaps,
        language: store.data.language,
        gmap: null,
      }
    },
    methods: {
//      geocodeHandler (results, status) {
//        if (status === 'OK') {
//          this.gmap.setCenter(results[0].geometry.location)
//        } else {
//          console.error('Geocode was not successful: ' + status)
//          return false
//        }
//      },
    },
    ready () {
      let vm = this;
      let mapCoords = vm.coords;
      GoogleMapsLoader.KEY = this.googleMaps.apiKey
      GoogleMapsLoader.LANGUAGE = this.language || 'en'
      GoogleMapsLoader.LIBRARIES = ['geometry', 'places']

      GoogleMapsLoader.load((google) => {
        vm.geocoder = new google.maps.Geocoder()
        const mapEl = document.getElementById(`map-${this.mapId}`)
        // create map
        vm.gmap = new google.maps.Map(mapEl, {
          center: new google.maps.LatLng(mapCoords.lat, mapCoords.lng),
          disableDoubleClickZoom: false,
          disableDefaultUI: true,
          zoomControl: false,
          scaleControl: false,
          scrollwheel: false,
          zoom: 15,
          styles: vm.googleMaps.styles,
        })
      })
    },
    destroyed () {
      this.gmap = null
    },
  };
</script>

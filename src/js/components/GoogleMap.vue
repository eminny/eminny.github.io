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
      'address',
    ],
    data () {
      return {
        googleMaps: store.data.googleMaps,
        language: store.data.language,
        map: null,
      }
    },
    methods: {
    },
    ready () {
      GoogleMapsLoader.KEY = this.googleMaps.apiKey
      GoogleMapsLoader.LANGUAGE = this.language || 'en'
      GoogleMapsLoader.LIBRARIES = ['geometry', 'places']

      GoogleMapsLoader.load((google) => {
        const geocoder = new google.maps.Geocoder()
        const mapEl = document.getElementById(`map-${this.mapId}`)
        // create map
        this.map = new google.maps.Map(mapEl, {
          center: new google.maps.LatLng(34.1501469, -118.4491394),
          disableDoubleClickZoom: false,
          disableDefaultUI: true,
          zoomControl: false,
          scaleControl: false,
          scrollwheel: false,
          zoom: 15,
          styles: this.googleMaps.styles,
        })

        // Geocode address to coords
        geocoder.geocode({ 'address': this.address }, (results, status) => {
          if (status == 'OK') {
            this.map.setCenter(results[0].geometry.location);
          } else {
            alert('Geocode was not successful: ' + status);
            return false
          }
        })
      })
    },
    destroyed () {
      delete(this.map)
    },
  };
</script>

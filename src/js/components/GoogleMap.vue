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

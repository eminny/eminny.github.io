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
  <div class="diary">
    <h2 class="diary__heading">The Diary</h2>
    <div class="diary-carousel-wrapper">
      <div class="diary-carousel" id="instafeed"></div>
    </div>
  </div>
</template>

<style lang="sass">
  @import "../../stylesheets/variables";
  $image-size: 35rem;

  .diary {
    display: block;
    width: 100%;
  }

  .diary__heading {
    font-family: $font__family-sans;
    font-size: 16px;
    font-size: 1.6rem;
    line-height: 1.3125;
    margin-bottom: 4rem;
    text-align: center;
    text-transform: uppercase;
  }

  .diary-carousel {
    height: $image-size;

    &.is-empty {
      height: 10rem;
    }
  }

  .diary-carousel__message {
    font-size: 1.2rem;
    text-align: center;
    text-transform: uppercase;
  }

  .diary-carousel__cell,
  a.diary-carousel__cell {
    background: $color__gray-light;
    background-position: center center;
    background-size: cover;
    border-radius: 0;
    display: block;
    height: $image-size;
    margin-right: 4rem;
    text-decoration: none;
    width: $image-size;
  }

</style>

<script>
  import { addClass } from '../helpers'
  const Flickity = require('flickity-bg-lazyload')
  const Instafeed = require("instafeed.js")

  export default {
    props: [
      'url-key',
    ],
    data () {
      return {
        flickityInstance: null,
        instagramLink: 'https://www.instagram.com/canderparis',
        feedOptions: {
          get: 'user',
          userId: '3217141691',
          clientId: '6bcc0d93f5e14265ac5eab12fdc92aef',
          accessToken: '3217141691.6bcc0d9.c10a1c87199e4f808aaa60efeb9748e1',
          limit: 20,
          resolution: 'standard_resolution',
          target: 'instafeed',
          template: '<a class="diary-carousel__cell" href="{{link}}" target="_blank" data-flickity-bg-lazyload="{{image}}"></a>',
          after () {
            if (!this.options || typeof this.options.target !== 'string') {
              throw new Error('Could not initialize: options not found.');
            }

            let flickityInstance = new Flickity('.diary-carousel', {
              bgLazyLoad: 4,
              cellAlign: 'left',
              contain: true,
              pageDots: false,
              percentPosition: false,
              prevNextButtons: false,
              slidesWidth: '35rem',
              wrapAround: true,
              freeScroll: true,
            })

            window.flkty = flickityInstance

          },
          error (msg = '') {
            const numberOfPosts = document.querySelectorAll('.diary-carousel__cell').length

            if (!msg.length) {
              msg = 'No posts found.'
            }

            if (!numberOfPosts) {
              let el = document.getElementById('instafeed')
              addClass(el, 'is-empty')
              el.innerHTML = `<h2 class="diary-carousel__message">${msg}</h2>`
              return
            }
          },
        },
      };
    },
    ready () {
      const feed = new Instafeed(this.feedOptions)
      feed.run()
    },
    destroyed () {
      // Destroy skrollr instance
      if (window.flkty) {
        window.flkty.destroy()
      }
    },
  };
</script>

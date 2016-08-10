<template>
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

  .diary-wrap {
  }

  .diary-carousel {
    height: $image-size;
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
  const Flickity = require('flickity-bg-lazyload')
  const Instafeed = require("instafeed.js")

  export default {
    props: [
      'url-key',
    ],
    data () {
      return {
        flickityInstance: null,
        instagramLink: 'https://www.instagram.com/',
        feedOptions: {
          get: 'user',
          userId: '901047522',
          clientId: '71ad22535cb64f8b874db8255e387f1a',
          accessToken: '901047522.71ad225.e746b7277a5c4df7a8ef2604d05319b8',
          limit: 20,
          resolution: 'standard_resolution',
          target: `instafeed`,
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
              prevNextButtons: false,
              slidesWidth: '35rem',
            })

            window.flkty = flickityInstance

          },
        },
      };
    },
    ready () {
      console.debug('Initialized social widget');

      const feed = new Instafeed(this.feedOptions);

      feed.run();
    },
    destroyed () {
      // Destroy skrollr instance
      if (window.flkty) {
        window.flkty.destroy()
      }
    },
  };
</script>

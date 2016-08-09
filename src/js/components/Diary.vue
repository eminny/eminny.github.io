<template>
  <div class="diary">
    <h2 class="diary__heading">The Diary</h2>
    <div class="diary-carousel-wrapper">
      <div class="diary-carousel" id="instafeed"></div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  @import "../../stylesheets/variables";

  .diary {
    //background: #ededed;
    display: block;
    width: 100%;
  }

  .diary__heading {
    font-family: $font__family-sans;
    font-size: 16px;
    font-size: 1.6rem;
    line-height: 1.3125;
    text-align: center;
    text-transform: uppercase;
  }

  .diary-wrap {
    // background: $color__gray-light;
  }

  .diary-carousel {
    height: 30rem;
  }

  .diary-carousel__cell {
    background: #8C8;
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
    display: block;
    height: 30rem;
    margin-right: 10px;
    width: 30rem;
  }

</style>

<script>
  const Flickity = require('flickity')
  const Instafeed = require("instafeed.js")

  export default {
    props: [
      'url-key',
    ],
    data () {
      return {
        flickityInstance: null,
        instagramLink: 'https://www.instagram.com/onlinefreund/',
        feedOptions: {
          get: 'user',
          userId: '144360708',
          clientId: 'b55ad4edadf844c98ceb2c64205dafc0',
          accessToken: '144360708.b55ad4e.5f3e4a6ec30942088355e8f56f095308',
          limit: 20,
          resolution: 'low_resolution',
          target: `instafeed`,
          template: '<a class="diary-carousel__cell" href="{{link}}" target="_blank" data-flickity-bg-lazyload="{{image}}"></a>',
          after () {
            if (!this.options || typeof this.options.target !== 'string') {
              throw new Error('Could not initialize: options not found.');
            }

            let flickityInstance = new Flickity('.diary-carousel', {
              bgLazyLoad: true,
              cellAlign: 'left',
              pageDots: false,
              prevNextButtons: false,
              slidesWidth: '300px',
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

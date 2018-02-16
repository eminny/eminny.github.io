<template>
    <div class="page">
      <h1>Thanks {{ forWhat }}</h1>
    </div>
</template>
<style lang="sass" scoped>
  @import "../../stylesheets/variables";

  .page {
    align-items: center;
    display: flex;
    height: calc(100vh - #{$header-height});
    justify-content: center;
    transform: translateY(-2rem);
  }

  h1 {
    font-size: 1.8rem;
    text-transform: uppercase;
  }
</style>
<script>
  export default {
    computed:{
      forWhat () {
        if (this.$route.params.forWhat == 'subscribing') {
          return 'for subscribing!'
        }
        if (this.$route.params.forWhat == 'contacting') {
          return 'for contacting us! We will get back to you shortly.'
        }
      }
    }
  }
</script>

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
  <div class="page-404">
    <h1>Not Found</h1>
  </div>
</template>
<style lang="sass" scoped>
  @import "../../stylesheets/variables";

  .page-404 {
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

</script>

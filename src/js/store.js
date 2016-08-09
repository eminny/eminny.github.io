import { EventEmitter as Emitter } from 'events';

let store = new Emitter();

store.data = {
  scrollPos: {
    top: 0,
    left: 0,
  },
  menuOverlay: {
    visible: false,
    navImageMap: {
      'default': '/images/menu-accent-about.jpg',
      'about': '/images/menu-accent-about.jpg',
      'stores': '/images/menu-accent-stores.jpg',
      'contact': '/images/menu-accent-contact.jpg',
    },
  },
  router: void 0,
  skrollr: void 0,
  language: 'en',
  retailers: [
    {
      name: 'Barneys New York',
      locations: [
        'Madison Avenue Flagship<br>660 Madison Avenue<br>New York, NY 10065',
      ],
      website: 'http://barneys.com',
      mapUrl: 'https://maps.googleapis.com/maps/api/staticmap?center=660+Madison+Avenue+New+York+10065&size=800x250&zoom=15&style=element:labels|visibility:on&style=element:geometry.stroke|visibility:off&style=feature:landscape|element:geometry|saturation:-100&style=feature:water|saturation:-100|invert_lightness:true&key=AIzaSyDGWEnF8tC8zkdjhfLjEwDAjKVvtTOxORs',
      mapRevealed: false,
    },
    {
      name: 'Colette',
      locations: [
        '213 Rue Saint Honoré<br>75001 Paris, France',
      ],
      website: 'http://colette.fr',
      mapUrl: 'https://maps.googleapis.com/maps/api/staticmap?center=213+Rue+Saint+Honore+Paris+France&size=800x250&zoom=15&style=element:labels|visibility:on&style=element:geometry.stroke|visibility:off&style=feature:landscape|element:geometry|saturation:-100&style=feature:water|saturation:-100|invert_lightness:true&key=AIzaSyDGWEnF8tC8zkdjhfLjEwDAjKVvtTOxORs',
      mapRevealed: false,
    },
    {
      name: 'Opening Ceremony',
      website: 'https://www.openingceremony.com/',
      mapUrl: '',
      mapRevealed: false,
    },
  ],
  googleMaps: {
    apiKey: 'AIzaSyDGWEnF8tC8zkdjhfLjEwDAjKVvtTOxORs',
  }
};

export default store;

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
      mapAddress: '660+Madison+Avenue+New+York+10065',
      mapRevealed: false,
    },
    {
      name: 'Colette',
      locations: [
        '213 Rue Saint Honoré<br>75001 Paris, France',
      ],
      website: 'http://colette.fr',
      mapAddress: '213+Rue+Saint+Honore+Paris+France',
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
    styles: [
      {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "saturation": 36
          },
          {
            "color": "#333333"
          },
          {
            "lightness": 40
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#ffffff"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#fefefe"
          },
          {
            "lightness": 20
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#fefefe"
          },
          {
            "lightness": 17
          },
          {
            "weight": 1.2
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          },
          {
            "lightness": 20
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          },
          {
            "lightness": 21
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dedede"
          },
          {
            "lightness": 21
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "lightness": 17
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "lightness": 29
          },
          {
            "weight": 0.2
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "lightness": 18
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f2f2f2"
          },
          {
            "lightness": 19
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e9e9e9"
          },
          {
            "lightness": 17
          }
        ]
      }
    ],
  }
};

export default store;

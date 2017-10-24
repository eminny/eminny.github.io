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
      'stores': '/images/menu-accent-stores-1.jpg',
      'contact': '/images/menu-accent-contact.png',
    },
  },
  modal: {
    visible: false,
    title: 'Sold out',
    body: 'Unfortunately, this item is currently sold out. When the item is back in stock we will notify you by email.',
  },
  darkMode: false,
  router: void 0,
  skrollr: void 0,
  language: 'en',
  retailers: [
    {
      name: 'Kirna Zabête',
      locations: [
        '477 Broome Street<br>New York, NY 10013<br>USA',
      ],
      website: 'http://www.kirnazabete.com',
      // mapCoords: {
      //   lat: 40.722699,
      //   lng: -74.002094
      // },
      // mapRevealed: false,
    },
    // {
    //   name: 'Barneys New York',
    //   locations: [
    //     'Madison Avenue Flagship<br>660 Madison Avenue<br>New York, NY 10065',
    //   ],
    //   website: 'http://barneys.com',
    //   mapCoords: {
    //     lat: 40.7647180,
    //     lng: -73.9711280
    //   },
    //   mapRevealed: false,
    // },
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

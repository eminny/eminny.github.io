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
      'home': '',
      'about': '/images/menu-accent-about.jpg',
      'stores': '/images/menu-accent-stores-1.jpg',
      'press': '/images/press-image.jpg',
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
      website: 'http://kirnazabete.com',
      // mapCoords: {
      //   lat: 40.722699,
      //   lng: -74.002094
      // },
      // mapRevealed: false,
    },
    {
      name: 'Kirna Zabête',
      locations: [
        'The Royal Poinciana Plaza<br>340 Royal Poinciana Way Suite 305<br>Palm Beach, FL 33480<br>USA'
      ],
      website: 'https://theroyalpoincianaplaza.com/business/kirna-zabete/'
    },
    {
      name: 'Luisa Via Roma',
      locations: [
        'Via Roma 19/21<br>50123 Florence, Italy'
      ],
      website: 'http://www.luisaviaroma.com/'
    },
    {
      name: 'Megusta',
      locations: [
        'Lange Jansstraat 15<br>3512 BA Utecht<br>The Netherlands'
      ],
      website: 'https://www.megusta.nl/'
    },
    {
      name: 'Chenchun Boutique',
      locations: [
        'Tainan, Taiwan'
      ],
      website: 'https://www.chen-chun.com/'
    },
    {
      name: 'Beige',
      locations: [
        'Kaohsiung, Taiwan'
      ],
      website: 'https://www.facebook.com/BEIGEbyC/'
    },
    {
      name: 'Coggles',
      website: 'https://www.coggles.com/'
    }
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

const sortRetailers = retailers => retailers.sort((a, b) => {
  return a.name < b.name ? -1 : 1
})

store.data.retailers = sortRetailers(store.data.retailers)

export default store;

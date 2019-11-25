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
      'product': '/images/product-image.jpg',
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
      name: 'Bergdorf Goodman',
      locations: [
        '754 5th Ave<br />NY, NY 10019',
      ],
      website: 'http://www.bergdorfgoodman.com/',
    },
    {
      name: 'Nordstrom Flagship',
      locations: [
        '225 West 57th Street<br />NY, NY 10019',
      ],
      website: 'http://nordstrom.com',
    },
    {
      name: 'Granville',
      locations: [
        '6809 Phillips Pl Ct.<br />Charlotte, NC 28210',
      ],
      website: 'http://granville-charlotte.com',
    },
    {
      name: 'The Paris Market',
      locations: [
        '70B Boat House Row<br />Palmetto Bluff, SA 29910',
      ],
      website: 'http://theparismarket.com',
    },
    {
      name: 'Illuminated Candle Bar',
      locations: [
        '2415 Montevallo Rd<br />Mountain Brook, AL 35223',
      ],
      website: 'http://illuminatedbham.com',
    },
    {
      name: 'Ron Robinson at Fred Segal',
      locations: [
        '8118 Melrose Ave<br />Los Angeles, CA 90046',
      ],
      website: 'https://ronrobinson.com/fred-segal-melrose-store/',
    },
    {
      name: 'Kirna Zabete',
      locations: [
        'United States, Storewide',
      ],
      website: 'http://kirnazabete.com',
    },
    {
      name: 'Harvey Nichols x Pad Lifestyle',
      locations: [
        'United Kingdom Storewide',
      ],
      website: 'https://www.padlifestyle.com/search?q=cander+paris'
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

const sortRetailers = retailers => retailers.sort((a, b) => {
  return a.name < b.name ? -1 : 1
})

store.data.retailers = sortRetailers(store.data.retailers)

export default store;

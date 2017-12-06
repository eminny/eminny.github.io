import { EventEmitter as Emitter } from 'events';

let press = new Emitter();

press.data = {
  scrollPos: {
    top: 0,
    left: 0,
  },
  // menuOverlay: {
  //   visible: false,
  //   navImageMap: {
  //     'home': '/images/menu-accent-about.jpg',
  //     'about': '/images/menu-accent-about.jpg',
  //     'stores': '/images/menu-accent-stores-1.jpg',
  //     'press': '/images/menu-accent-contact.png',
  //     'contact': '/images/menu-accent-contact.png',
  //   },
  // },
  modal: {
    visible: false,
    title: 'Coming soon',
    body: 'Press articles will be updated soon.',
  },
  darkMode: false,
  router: void 0,
  skrollr: void 0,
  language: 'en',
  articles: [
    {
      name: 'New York Observer',
      subtitle: ' ',
      image: '/images/press/observer-press-clipping-final.jpg',
      website: 'http://observer.com/2017/10/elizabeth-minett-interview-cander-paris-home/',
    },
    {
      name: 'South Florida Luxury Guide',
      subtitle: 'Miami Art Basel Edition',
      image: '/images/press/south-florida-luxury-guide.jpg'
    },
    {
      name: 'Bustle',
      subtitle: ' ',
      image: '/images/press/bustle-press-clip.jpg'
    },
    {
      name: 'The Coveteur',
      subtitle: ' ',
      image: '/images/press/coveteur-press-clip.jpg'
    },
    {
      name: 'The Coveteur',
      subtitle: ' ',
      image: '/images/press/coveteur-press-clip-2.jpg',
      website: 'http://coveteur.com/2017/12/01/luxurious-candles-holiday-gift-guide/'
    },
    {
      name: 'US Weekly',
      subtitle: ' ',
      image: '/images/press/us-weekly-press-clip.jpg'
    },
    {
      name: 'Esquire',
      subtitle: ' ',
      image: '/images/press/esquire-press-clip.jpg',
      website: 'http://www.esquire.com/style/mens-accessories/g13818132/best-candles-apartment-home/'
    },
    {
        name: 'Glamour',
        subtitle: ' ',
        image: '/images/press/glamour-press-clip.jpg',
        website: 'https://www.glamour.com/gallery/best-candles-to-gift-for-holiday-2017#6'
      },
      {
        name: 'Into the Gloss',
        subtitle: ' ',
        image: '/images/press/into-the-gloss-press-clip.jpg',
        website: 'https://intothegloss.com/2017/11/best-holiday-candles-2017/'
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
};

export default press;

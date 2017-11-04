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
      image: '/images/Observer_Press_Clipping_Final.JPG',
      website: 'http://observer.com/2017/10/elizabeth-minett-interview-cander-paris-home/',
    },
    {
      name: 'South Florida Luxury Guide',
      subtitle: 'Miami Art Basel Edition',
      image: '/images/South_Florida_Luxury_Guide.JPG'
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

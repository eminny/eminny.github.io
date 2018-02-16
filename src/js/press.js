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
      date: new Date(2017, 10, 2) // January starts at 0th index, adjust accordingly e.g. 10 = November in this case
    },
    {
      name: 'South Florida Luxury Guide',
      subtitle: 'Miami Art Basel Edition',
      image: '/images/press/south-florida-luxury-guide.jpg',
      date: new Date(2017, 10, 2)
    },
    {
      name: 'Bustle',
      subtitle: ' ',
      image: '/images/press/bustle-press-clip.jpg',
      date: new Date(2017, 10, 15)
    },
    {
      name: 'The Coveteur',
      subtitle: ' ',
      image: '/images/press/coveteur-press-clip.jpg',
      date: new Date(2017, 10, 15)
    },
    {
      name: 'The Coveteur',
      subtitle: ' ',
      image: '/images/press/coveteur-press-clip-2.jpg',
      website: 'http://coveteur.com/2017/12/01/luxurious-candles-holiday-gift-guide/',
      date: new Date(2017, 11, 5)
    },
    {
      name: 'US Weekly',
      subtitle: ' ',
      image: '/images/press/us-weekly-press-clip.jpg',
      date: new Date(2017, 10, 15)
    },
    {
      name: 'Esquire',
      subtitle: ' ',
      image: '/images/press/esquire-press-clip.jpg',
      website: 'http://www.esquire.com/style/mens-accessories/g13818132/best-candles-apartment-home/',
      date: new Date(2017, 11, 6)
    },
    {
      name: 'Glamour',
      subtitle: ' ',
      image: '/images/press/glamour-press-clip.jpg',
      website: 'https://www.glamour.com/gallery/best-candles-to-gift-for-holiday-2017#6',
      date: new Date(2017, 11, 6)
    },
    {
      name: 'Into the Gloss',
      subtitle: ' ',
      image: '/images/press/into-the-gloss-press-clip.jpg',
      website: 'https://intothegloss.com/2017/11/best-holiday-candles-2017/',
      date: new Date(2017, 11, 6)
    },
    {
      name: 'Forbes',
      subtitle: ' ',
      image: '/images/press/forbes-press-clip.jpg',
      website: 'https://www.forbes.com/sites/abinlot/2017/12/16/the-gift-guide-for-the-discerning-creative/',
      date: new Date(2017, 11, 21)
    },
    {
      name: 'W Magazine',
      subtitle: ' ',
      image: '/images/press/w-press-clip.jpg',
      website: 'https://www.wmagazine.com/gallery/editor-approved-last-minute-holiday-beauty-gifts',
      date: new Date(2017, 11, 21)
    },
    {
      name: 'Brides Online',
      subtitle: ' ',
      image: '/images/press/brides-press-clip.jpg',
      website: 'https://www.brides.com/gallery/last-minute-holiday-gift-ideas-for-busy-brides',
      date: new Date(2017, 11, 21)
    },
    {
      name: 'GQ',
      subtitle: ' ',
      image: 'images/press/gq-press-clip.jpg',
      website: 'https://www.gq.com/story/the-best-holiday-candles',
      date: new Date(2017, 11, 26)
    }],
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
};

const sortArticles = articles => articles.sort((a, b) => {
  if (a.date.getTime() === b.date.getTime()) {
    return a.name < b.name ? -1 : 1
  } else {
    return b.date.getTime() - a.date.getTime()
  }
})

press.data.articles = sortArticles(press.data.articles)

// function sortArticles(articles) {
//   articles.sort(function(a, b) {
//     if (a.date > b.date) {
//       return -1;
//     } else if (a.date < b.date) {
//       return 1;
//     } else {
//       if (a.name < b.name) {
//         return -1;
//       } else if (a.name > b.name) {
//         return 1;
//       } else {
//         return 0;
//       }
//     }
//   })
// }

// press.data.articles = sortedArticles;

export default press;

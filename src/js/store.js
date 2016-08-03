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
};

export default store;

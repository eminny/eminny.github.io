import Vue from 'vue'

// Components
const SectionAbout = Vue.extend(require('./components/SectionAbout.vue'))
const SectionContact = Vue.extend(require('./components/SectionContact.vue'))
const SectionHome = Vue.extend(require('./components/SectionHome.vue'))
const SectionStores = Vue.extend(require('./components/SectionStores.vue'))
const SectionTerms = Vue.extend(require('./components/SectionTerms.vue'))

// Routes
export default {
  '/': {
    component: SectionHome
  },
  '/about': {
    component: SectionAbout
  },
  '/contact': {
    component: SectionContact
  },
  '/stores': {
    component: SectionStores
  },
  '/terms': {
    component: SectionTerms
  }
}

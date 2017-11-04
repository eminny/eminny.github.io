import Vue from 'vue'

// Components
const SectionAbout = Vue.extend(require('./components/SectionAbout.vue'))
const SectionContact = Vue.extend(require('./components/SectionContact.vue'))
const SectionHome = Vue.extend(require('./components/SectionHome.vue'))
const SectionStores = Vue.extend(require('./components/SectionStores.vue'))
const SectionPress = Vue.extend(require('./components/SectionPress.vue'))
const SectionTerms = Vue.extend(require('./components/SectionTerms.vue'))
const SectionPrivacy = Vue.extend(require('./components/SectionPrivacy.vue'))
const SectionThanks = Vue.extend(require('./components/SectionThanks.vue'))
const Error404 = Vue.extend(require('./components/Error404.vue'))

// Routes
export default {
  '*': {
    component: Error404,
  },
  '/': {
    name: 'home',
    component: SectionHome,
  },
  '/about': {
    name: 'about',
    component: SectionAbout,
  },
  '/contact': {
    name: 'contact',
    component: SectionContact,
  },
  '/stores': {
    name: 'stores',
    component: SectionStores,
  },
  '/press': {
    name: 'press',
    component: SectionPress
  },
  '/terms': {
    name: 'terms',
    component: SectionTerms,
  },
  '/privacy': {
    name: 'privacy',
    component: SectionPrivacy,
  },
  '/thanks/:forWhat': {
    name: 'thanks',
    component: SectionThanks,
  },
}

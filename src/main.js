import 'vuetify/dist/vuetify.min.css'

// Register and initialize Firebase
import './db'

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Vuetify from 'vuetify'
import VueFire from 'vuefire'
import { app } from 'firebase'

Vue.use(VueFire)
Vue.use(VueRouter)
Vue.use(Vuetify)

const router = new VueRouter({
  routes: [
    { path: '/images', component: () => import('./components/Images') },
    {
      path: '/images/:id',
      component: () => import('./components/Details'),
      props: true
    },
    { path: '/', redirect: '/images' }
  ]
})

new Vue({
  el: '#app',
  components: { App },
  data: { message: '', show: false },
  template: '<app :message="message" :show="show"> </app>',
  router
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(reg => {
    reg.onupdatefound = () => {
      const sw = reg.installing
      sw.onstatechange = () => {
        if (sw.state == 'installed') {
          if (navigator.serviceWorker.controller) {
            // New version
            app.show = true
            app.message = 'A new version is available.'
          } else {
            // Contents are catched
            app.show = true
            app.message = 'Contents are now offline.'
          }
        }
      }
    }
  })
}

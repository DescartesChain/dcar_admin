// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Toaster from 'v-toaster'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import $ from 'jquery'

import 'v-toaster/dist/v-toaster.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import './assets/styles/iconfont/iconfont.css'

import '@/assets/styles/global.css'

// import '../node_modules/vue-toaseter/src/vue-toaster.css'
library.add(fas, far, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueAwesomeSwiper)
Vue.use(Toaster, {timeout: 5000})

const store = new Vuex.Store({
  state: {
    sidebarState: 'show'
  },
  mutations: {
    toggle (state, data) {
      state.sidebarState = data
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

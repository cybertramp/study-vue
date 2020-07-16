
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(Buefy)

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
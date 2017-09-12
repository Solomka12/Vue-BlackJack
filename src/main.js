import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'
import VModal from 'vue-js-modal'

Vue.use(Notifications)
Vue.use(VModal, { dialog: true })

new Vue({
  el: '#app',
  render: h => h(App)
})

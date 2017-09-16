import Vue from 'vue';
import App from './App.vue';
import Notifications from 'vue-notification';
import VModal from 'vue-js-modal';
import Trend from 'vuetrend';
import Vuebar from 'vuebar';
// import Icons from 'vue-awesome/icons';

Vue.use(Vuebar);
Vue.use(Notifications);
Vue.use(VModal, { dialog: true });
Vue.use(Trend);

new Vue({
  el: '#app',
  render: h => h(App)
})

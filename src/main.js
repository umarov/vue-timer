// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import * as firebase from 'firebase';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Vuetify);

const config = {
  apiKey: 'AIzaSyBvvpU-ld3jS3Fq7JcleH_a77HlVtH9TOw',
  authDomain: 'codeshoptimer.firebaseapp.com',
  databaseURL: 'https://codeshoptimer.firebaseio.com',
  projectId: 'codeshoptimer',
  storageBucket: 'codeshoptimer.appspot.com',
  messagingSenderId: '222344146536',
};

firebase.initializeApp(config);
window.firebaseMessaging = firebase.messaging();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

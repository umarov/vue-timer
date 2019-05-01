// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import firebase, { messaging } from 'firebase';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import router from './router';

const config = {
  apiKey: 'AIzaSyBvvpU-ld3jS3Fq7JcleH_a77HlVtH9TOw',
  authDomain: 'codeshoptimer.firebaseapp.com',
  databaseURL: 'https://codeshoptimer.firebaseio.com',
  projectId: 'codeshoptimer',
  storageBucket: 'codeshoptimer.appspot.com',
  messagingSenderId: '222344146536',
};

firebase.initializeApp(config);

Vue.config.productionTip = false;
Vue.use(Vuetify);

export default new Vue({
  el: '#app',
  router,
  data() {
    return {
      firebaseMessaging: messaging(),
      swRegistration: {},
    };
  },
  created() {
    if ('serviceWorker' in navigator) {
      this.swRegistration = navigator.serviceWorker
        .register('sw.js', {
          scope: './',
        })
        .then((registration) => {
          this.firebaseMessaging.useServiceWorker(registration);
        })
        .catch((err) => {
          console.log('Service Worker registration failed');
          console.error(err);
        });
    } else {
      this.swRegistration = Promise.reject(false);
    }
  },
  render: (h) => h(App),
});

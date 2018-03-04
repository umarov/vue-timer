// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import firebase, { messaging } from "firebase";
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import App from "./App.vue";
import router from "./router";

const config = {
  apiKey: "AIzaSyBvvpU-ld3jS3Fq7JcleH_a77HlVtH9TOw",
  authDomain: "codeshoptimer.firebaseapp.com",
  databaseURL: "https://codeshoptimer.firebaseio.com",
  projectId: "codeshoptimer",
  storageBucket: "codeshoptimer.appspot.com",
  messagingSenderId: "222344146536"
};

firebase.initializeApp(config);
// @ts-ignore
window.firebaseMessaging = messaging();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js", {
        scope: "./"
      });

      // @ts-ignore
      window.firebaseMessaging.useServiceWorker(registration);
      // @ts-ignore
      window.swRegistration = registration;
      dispatchEvent(new CustomEvent("serviceWorkerRegistered"));
    } catch (err) {
      console.log("Service Worker registration failed");
      console.error(err);
    }
  });
}

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});

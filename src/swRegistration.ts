import { firebaseMessaging } from "./firebaseMessaging";

export let serviceWorkerRegistration: Promise<void>;

export const register = () => {
  if ("serviceWorker" in navigator) {
    serviceWorkerRegistration = navigator.serviceWorker
      .register("sw.js", {
        scope: "./"
      })
      .then(registration => {
        firebaseMessaging.useServiceWorker(registration);
      })
      .catch(err => {
        console.log("Service Worker registration failed");
        console.error(err);
      });
  } else {
    serviceWorkerRegistration = Promise.reject();
  }
};

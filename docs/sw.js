importScripts("https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js", "https://www.gstatic.com/firebasejs/7.9.3/firebase-messaging.js", "https://umarov.dev/code-shop-timer/precache-manifest.57dd0fa3c56577be0ed2740534978416.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.skipWaiting();
workbox.clientsClaim();

const config = {
  apiKey: "AIzaSyBvvpU-ld3jS3Fq7JcleH_a77HlVtH9TOw",
  authDomain: "codeshoptimer.firebaseapp.com",
  databaseURL: "https://codeshoptimer.firebaseio.com",
  projectId: "codeshoptimer",
  storageBucket: "codeshoptimer.appspot.com",
  messagingSenderId: "222344146536"
};

workbox.routing.registerRoute(
  new RegExp("https://umarov.dev/code-shop-timer"),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  /.*(?:googleapis)\.com.*$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "googleapis"
  })
);

workbox.routing.registerRoute(
  /.*(?:gstatic)\.com.*$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "gstatic"
  })
);

workbox.routing.registerRoute(
  /.*(?:cloudflare)\.com.*$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "cloudflare"
  })
);

let timerAmount;

const notificationBroadcastChannel = new BroadcastChannel("timerNotification");
const restartBroadcastChannel = new BroadcastChannel("timerRestart");
const timerValueBroadcastChannel = new BroadcastChannel("timerValue");

notificationBroadcastChannel.onmessage = ({ data }) => {
  timerAmount = data;
};

const openExistingWindow = (location, clients, timerAmount) => {
  const urlToOpen = new URL(
    `code-shop-timer/#/display/${timerAmount}`,
    location.origin
  ).href;

  return clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      }

      return clients.openWindow(urlToOpen);
    });
};

self.addEventListener("notificationclick", event => {
  const { notification, action } = event;

  if (action === "yes") {
    let promise;
    if (timerAmount) {
      promise = openExistingWindow(self.location, self.clients, timerAmount);
    } else {
      promise = new Promise(resolve => {
        const timerNotifications = new BroadcastChannel("timerNotification");

        timerNotifications.onmessage = ({ data }) => {
          resolve(data);
        };

        timerValueBroadcastChannel.postMessage();
      });
    }

    event.waitUntil(
      promise.then(() => {
        restartBroadcastChannel.postMessage("restart");

        notification.close();
      })
    );
  }
});

const prepareAndSendNotification = () => {
  const notificationPayload = {
    body: "Timer is up!",
    icon: "img/timer.png",
    vibrate: [200, 100, 200, 100, 200, 100, 400],
    tag: "request",
    actions: [{ action: "yes", title: "Restart Timer", icon: "img/check.png" }]
  };

  return self.registration.showNotification(
    "Timer is up!",
    notificationPayload
  );
};

self.firebase.initializeApp(config);
const messaging = self.firebase.messaging();
messaging.setBackgroundMessageHandler(prepareAndSendNotification);

workbox.precaching.precacheAndRoute(self.__precacheManifest);


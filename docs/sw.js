importScripts("https://umarov.github.io/code-shop-timer/precache-manifest.549b30aea3cc598b4f6e7aa422c76702.js", "https://storage.googleapis.com/workbox-cdn/releases/3.0.1/workbox-sw.js");

importScripts(
  "https://www.gstatic.com/firebasejs/4.12.0/firebase-app.js",
  "https://www.gstatic.com/firebasejs/4.12.0/firebase-messaging.js"
);

workbox.loadModule("workbox-routing");
workbox.loadModule("workbox-strategies");
workbox.loadModule("workbox-precaching");

const config = {
  apiKey: "AIzaSyBvvpU-ld3jS3Fq7JcleH_a77HlVtH9TOw",
  authDomain: "codeshoptimer.firebaseapp.com",
  databaseURL: "https://codeshoptimer.firebaseio.com",
  projectId: "codeshoptimer",
  storageBucket: "codeshoptimer.appspot.com",
  messagingSenderId: "222344146536"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

workbox.routing.registerRoute(
  "https://fonts.googleapis.com/(.*)",
  workbox.strategies.cacheFirst({
    cacheName: "googleapis",
    cacheableResponse: {
      statuses: [0, 200]
    },
    networkTimeoutSeconds: 4
  })
);

workbox.routing.registerRoute(
  "https://www.gstatic.com/firebasejs/4.12.0/(.*)",
  workbox.strategies.cacheFirst({
    cacheName: "gstatic",
    cacheableResponse: {
      statuses: [0, 200]
    },
    networkTimeoutSeconds: 4
  })
);

workbox.routing.registerRoute(
  "https://unpkg.com/workbox-sw@3.0.0-(*)/build/importScripts/(.*)",
  workbox.strategies.cacheFirst({
    cacheName: "gstatic",
    cacheableResponse: {
      statuses: [0, 200]
    },
    networkTimeoutSeconds: 4
  })
);

workbox.routing.registerRoute(
  "https://fonts.gstatic.com/(.*)",
  workbox.strategies.cacheFirst({
    cacheName: "gstatic",
    cacheableResponse: {
      statuses: [0, 200]
    },
    networkTimeoutSeconds: 4
  })
);

workbox.routing.registerRoute(
  "https://cdnjs.cloudflare.com/ajax/libs/animate.css(.*)",
  workbox.strategies.cacheFirst({
    cacheName: "gstatic",
    cacheableResponse: {
      statuses: [0, 200]
    },
    networkTimeoutSeconds: 4
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

messaging.setBackgroundMessageHandler(prepareAndSendNotification);


importScripts('https://unpkg.com/workbox-sw@2.1.2/build/importScripts/workbox-sw.prod.v2.1.2.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

const config = {
  apiKey: 'AIzaSyBvvpU-ld3jS3Fq7JcleH_a77HlVtH9TOw',
  authDomain: 'codeshoptimer.firebaseapp.com',
  databaseURL: 'https://codeshoptimer.firebaseio.com',
  projectId: 'codeshoptimer',
  storageBucket: 'codeshoptimer.appspot.com',
  messagingSenderId: '222344146536',
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

const workboxSW = new self.WorkboxSW();

workboxSW.router.registerRoute(
  'https://fonts.googleapis.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'googleapis',
    cacheableResponse: {
      statuses: [0, 200],
    },
    networkTimeoutSeconds: 4,
  }),
);

workboxSW.router.registerRoute(
  'https://www.gstatic.com/firebasejs/4.5.0/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'gstatic',
    cacheableResponse: {
      statuses: [0, 200],
    },
    networkTimeoutSeconds: 4,
  }),
);

workboxSW.router.registerRoute(
  'https://unpkg.com/workbox-sw@2.1.2/build/importScripts/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'gstatic',
    cacheableResponse: {
      statuses: [0, 200],
    },
    networkTimeoutSeconds: 4,
  }),
);

workboxSW.router.registerRoute(
  'https://fonts.gstatic.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'gstatic',
    cacheableResponse: {
      statuses: [0, 200],
    },
    networkTimeoutSeconds: 4,
  }),
);

workboxSW.router.registerRoute(
  'https://cdnjs.cloudflare.com/ajax/libs/animate.css(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'gstatic',
    cacheableResponse: {
      statuses: [0, 200],
    },
    networkTimeoutSeconds: 4,
  }),
);

workboxSW.precache([
  {
    "url": "fdf50702baa329c27c9c.worker.js",
    "revision": "e45cacecffb751d4dcd6976a90da19a9"
  },
  {
    "url": "index.html",
    "revision": "7c83cd2bea0def5ec9302417fa607e1e"
  },
  {
    "url": "static/css/app.c4b4359cd458df2bf5d046b0ac7408d6.css",
    "revision": "92b83db4c965b546da30f70244ab22b0"
  },
  {
    "url": "static/js/0.18c91a5207fd8c137bfd.js",
    "revision": "664f796aaa3cd32c99f99f53f4ea615d"
  },
  {
    "url": "static/js/1.ca0f5c0311f14e9fd506.js",
    "revision": "26163fe2f0cde9c5549f404aedf047fb"
  },
  {
    "url": "static/js/2.70f5c697c7c9c6902eb9.js",
    "revision": "d8b1ae46349030d9bd71441f8a9d8156"
  },
  {
    "url": "static/js/5.e03821a9cb3105fcfeda.js",
    "revision": "9eca25711c3b76e0f5af70478dd7182d"
  },
  {
    "url": "static/js/app.07920110dfa45bc942ce.js",
    "revision": "491eed1a581863cb45c6228ad0f85441"
  },
  {
    "url": "static/js/manifest.1037e2509f36ab9f38d2.js",
    "revision": "bc0e104bea5fdc9e3ef44db61920dbb0"
  },
  {
    "url": "static/js/vendor.e2913ba6ace3c8647d71.js",
    "revision": "96955957ba9feb3e8f696774e31e62b1"
  }
]);

let timerAmount;

const notificationBroadcastChannel = new BroadcastChannel('timerNotification');
const restartBroadcastChannel = new BroadcastChannel('timerRestart');
const timerValueBroadcastChannel = new BroadcastChannel('timerValue');

notificationBroadcastChannel.onmessage = ({ data }) => {
  timerAmount = data;
};

const openExistingWindow = (location, clients, timerAmount) => {
  const urlToOpen = new URL(`code-shop-timer/#/display/${timerAmount}`, location.origin).href;

  return clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then((windowClients) => {
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

self.addEventListener('notificationclick', (event) => {
  const { notification, action } = event;

  if (action === 'yes') {
    let promise;
    if (timerAmount) {
      promise = openExistingWindow(self.location, self.clients, timerAmount);
    } else {
      promise = new Promise((resolve) => {
        const timerNotifications = new BroadcastChannel('timerNotification');

        timerNotifications.onmessage = ({ data }) => {
          resolve(data);
        };

        timerValueBroadcastChannel.postMessage();
      });
    }

    event.waitUntil(promise.then(() => {
      restartBroadcastChannel.postMessage('restart');

      notification.close();
    }));
  }
});

const prepareAndSendNotification = () => {
  const notificationPayload = {
    body: 'Timer is up!',
    icon: 'static/images/timer.png',
    vibrate: [200, 100, 200, 100, 200, 100, 400],
    tag: 'request',
    actions: [{ action: 'yes', title: 'Restart Timer', icon: 'static/images/check.png' }],
  };

  return self.registration.showNotification('Timer is up!', notificationPayload);
};

messaging.setBackgroundMessageHandler(prepareAndSendNotification);

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

workboxSW.precache([]);

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

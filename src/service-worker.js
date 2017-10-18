importScripts('workbox-sw.prod.v2.1.0.js');
// importScripts('https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/4.5.0/firebase-messaging.js');

const workboxSW = new self.WorkboxSW();

workboxSW.router.registerRoute('https://fonts.googleapis.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'googleapis',
    cacheableResponse: {
      statuses: [0, 200]
    },
    networkTimeoutSeconds: 4
  })
);

workboxSW.router.registerRoute('https://fonts.gstatic.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'gstatic',
    cacheableResponse: {
      statuses: [0, 200]
    },
    networkTimeoutSeconds: 4
  })
);

workboxSW.router.registerRoute('https://cdnjs.cloudflare.com/ajax/libs/animate.css(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'gstatic',
    cacheableResponse: {
      statuses: [0, 200]
    },
    networkTimeoutSeconds: 4
  })
);

workboxSW.precache([]);
let timerAmount;

const notificationBroadcastChannel = new BroadcastChannel('timerNotification');
const restartBroadcastChannel = new BroadcastChannel('timerRestart');

notificationBroadcastChannel.onmessage = ({ data }) => {
  timerAmount = data;

  const notificationPayload = {
    body: 'Timer is up!',
    icon: 'static/images/timer.png',
    vibrate: [200, 100, 200, 100, 200, 100, 400],
    tag: 'request',
    actions: [
      { action: 'yes', title: 'Restart Timer', icon: 'status/images/check.png' },
    ],
  };
  this.registration.showNotification('Timer', notificationPayload);
};

const openExistingWindow = (location, clients, timerAmount) => {
  const urlToOpen = new URL(`/#/display/${timerAmount}`, location.origin).href;

  return clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true
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
    restartBroadcastChannel.postMessage('restart');

    event.waitUntil(openExistingWindow(self.location, self.clients, timerAmount));

    notification.close();
  }
});

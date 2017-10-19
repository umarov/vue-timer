importScripts('https://unpkg.com/workbox-sw@2.1.0/build/importScripts/workbox-sw.prod.v2.1.0.js');
importScripts('https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.5.0/firebase-messaging.js');

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

workboxSW.router.registerRoute('https://fonts.googleapis.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'googleapis',
    cacheableResponse: {
      statuses: [0, 200]
    },
    networkTimeoutSeconds: 4
  })
);

workboxSW.router.registerRoute('https://www.gstatic.com/firebasejs/4.5.0/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'gstatic',
    cacheableResponse: {
      statuses: [0, 200]
    },
    networkTimeoutSeconds: 4
  })
);

workboxSW.router.registerRoute('https://unpkg.com/workbox-sw@2.1.0/build/importScripts/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'gstatic',
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

workboxSW.precache([
  {
    "url": "bd6038d0cf3281f1ae12.worker.js",
    "revision": "d8ceac6efc2ffd639379e1eacb8cd870"
  },
  {
    "url": "index.html",
    "revision": "fe1955090137c2573a5c0b258c434963"
  },
  {
    "url": "static/css/app.4cbd75d60eb50db74b37959b15142bf1.css",
    "revision": "3011359c8d779aa0f12336c09c825b18"
  },
  {
    "url": "static/js/0.4f08e339badd38d89cff.js",
    "revision": "1a817ae67c845d2a8f4e48cce8b0cc54"
  },
  {
    "url": "static/js/1.a97123e0e58e29b81507.js",
    "revision": "569968bb90890b491cdc6f66713cff88"
  },
  {
    "url": "static/js/2.e3f3a914e9a866bb6ddf.js",
    "revision": "cd3777fa42166556e0c20a518e9cc5fc"
  },
  {
    "url": "static/js/5.e3f578064a4329777bd3.js",
    "revision": "75cb6705be66b14a2e74e3afccb5a23f"
  },
  {
    "url": "static/js/app.26431eb1697b321bba5a.js",
    "revision": "d349940f796aba2475efb83af1ca3936"
  },
  {
    "url": "static/js/manifest.404fc09c435036d49fce.js",
    "revision": "f3fecd0e770053bbd4c917652a76d2b7"
  },
  {
    "url": "static/js/vendor.f9e1237bb4adaa19ce1a.js",
    "revision": "ce0889ad2daf11611b2b7a06443918c0"
  }
]);


let timerAmount;

const notificationBroadcastChannel = new BroadcastChannel('timerNotification');
const restartBroadcastChannel = new BroadcastChannel('timerRestart');


notificationBroadcastChannel.onmessage = ({ data }) => {
  timerAmount = data;
}

const openExistingWindow = (location, clients, timerAmount) => {
  const urlToOpen = new URL(`code-shop-timer/#/display/${timerAmount}`, location.origin).href;

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


const prepareAndSendNotification = () => {
  const notificationPayload = {
    body: 'Timer is up!',
    icon: 'static/images/timer.png',
    vibrate: [200, 100, 200, 100, 200, 100, 400],
    tag: 'request',
    actions: [
      { action: 'yes', title: 'Restart Timer', icon: 'static/images/check.png' },
    ],
  };

  return self.registration.showNotification('Timer is up!', notificationPayload);
};

messaging.setBackgroundMessageHandler(prepareAndSendNotification);

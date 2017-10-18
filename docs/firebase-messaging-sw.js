importScripts('https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.5.0/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '222344146536'
});

const messaging = firebase.messaging();

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


self.addEventListener('push', (event) => {
  event.waitUntil(prepareAndSendNotification());
});


// messaging.setBackgroundMessageHandler((payload) => {
//   console.log(payload);
// });

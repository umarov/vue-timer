import * as functions from 'firebase-functions';
import axios from 'axios';

const whitelist = ['http://localhost:8080', 'http://umarov.github.io', 'https://umarov.github.io'];
const cors = require('cors')({
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
});
// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
export const sendNotification = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    console.log(request.body)
    const { timerAmount, notificationToken } = request.body;
    try {
      await makeNotificationRequest(timerAmount, notificationToken);
      response.send('Success');
    } catch (err) {
      console.error(err);
      response.status(400).send('Failed');
    }
  });
});

function makeNotificationRequest(timerAmount, notificationToken) {
  const notificationPayload = {
    body: 'Timer is up!',
    icon: 'static/images/timer.png',
    vibrate: [200, 100, 200, 100, 200, 100, 400],
    data: {
      timerAmount,
    },
    tag: 'request',
    actions: [{ action: 'yes', title: 'Restart Timer', icon: 'static/images/check.png' }],
    token: notificationToken,
    priority: 'high',
  };

  return axios.post('https://fcm.googleapis.com/fcm/send', {
    notification: notificationPayload,
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `key=${functions.config().gcmpushnotification.key}`,
    }
  });
}

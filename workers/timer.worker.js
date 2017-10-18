import timerIcon from '../src/assets/img/favicon.ico';

let intervalId = 0;
let timerValue = 0;
let notification;
let notificationToken;

const doubleDigitChecker = (value) => { return value.length === 1 ? `0${value}` : value; };
const calculateSeconds = milliseconds => doubleDigitChecker(`${(milliseconds / 100) % 60}`.split('.')[0]);
const calculateMinutes = milliseconds => doubleDigitChecker(`${milliseconds / 6000}`.split('.')[0]);
const notificationBroadcastChannel = new BroadcastChannel('timerNotification');
const restartBroadcastChannel = new BroadcastChannel('timerRestart');

function startTimer(timerAmount, notificationAllowed) {
  timerValue = timerAmount;

  if (notification) {
    notification.close();
  }

  return setInterval(() => {
    if (timerValue < 2) {
      timerValue = 0;

      if (Notification.permission === 'granted' && notificationAllowed) {
        makeRequestForPushNotification(timerAmount);
      }

      postMessage({
        timerValue,
        milliseconds: doubleDigitChecker(`${timerValue % 100}`),
        seconds: calculateSeconds(timerValue),
        minutes: calculateMinutes(timerValue),
      });
      clearInterval(intervalId);
    } else {
      timerValue -= 1;

      postMessage({
        timerValue,
        milliseconds: doubleDigitChecker(`${timerValue % 100}`),
        seconds: calculateSeconds(timerValue),
        minutes: calculateMinutes(timerValue),
      });
    }
  }, 10);
}

function makeRequestForPushNotification(timerAmount) {
  notificationBroadcastChannel.postMessage(timerAmount);
  const myHeaders = new Headers();
  const notificationPayload = {
    body: 'Timer is up!',
    icon: 'static/images/timer.png',
    vibrate: [200, 100, 200, 100, 200, 100, 400],
    tag: 'request',
    actions: [
      { action: 'yes', title: 'Restart Timer', icon: 'static/images/check.png' },
    ],
  };

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'key=AAAAM8S-bmg:APA91bF70jClkUJI-UtUuLbr1rgw1WkldiDCtiSrYuVryofUyDsu6Kz3LhwEuyaF1PWQHb0UZceAvRfFEu2ZE64IFH6VMyUD4ecR0kr8qgO1FLRexnZA1phqXk-duYQRmqazJotAMvV3');
  fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      notification: notificationPayload,
      to: notificationToken
    })
  }).catch((response) => console.log(JSON.stringify(response)))
}

restartBroadcastChannel.onmessage = () => {
  clearInterval(intervalId);

  intervalId = startTimer(timerValue, true);
}

self.addEventListener('timerstart', (event) => {
  const { timerAmount, notificationAllowed } = event.detail;
  clearInterval(intervalId);

  intervalId = startTimer(timerAmount, notificationAllowed);
});

self.onmessage = (event) => {
  const { data } = event;

  if (data.startTimer) {
    dispatchEvent(new CustomEvent('timerstart', {
      detail: {
        timerAmount: event.data.timerAmount,
        notificationAllowed: event.data.notificationAllowed,
      },
    }));
  } else if (data.resetTimer) {
    timerValue = event.data.timerAmount;

    postMessage({
      timerValue,
      milliseconds: doubleDigitChecker(`${timerValue % 100}`),
      seconds: calculateSeconds(timerValue),
      minutes: calculateMinutes(timerValue),
    });
    clearInterval(intervalId);
  } else if (data.setNotificationToken) {
    notificationToken = data.notificationToken;
  } else if (data.checkTimerValue) {
    postMessage({
      timerValue,
      milliseconds: doubleDigitChecker(`${timerValue % 100}`),
      seconds: calculateSeconds(timerValue),
      minutes: calculateMinutes(timerValue),
    });
  } else {
    clearInterval(intervalId);
  }
};

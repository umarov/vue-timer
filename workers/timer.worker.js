import timerIcon from '../src/assets/img/favicon.ico';

const localUrl = 'http://localhost:5000/codeshoptimer/us-central1/sendNotification';
const prodUrl = 'https://us-central1-codeshoptimer.cloudfunctions.net/sendNotification';
const worker = self;
let intervalId = 0;
let timerValue = 0;
let timerEndTime = 0;
let notification;
let notificationToken;

const doubleDigitChecker = value => (value.length === 1 ? `0${value}` : value);
const calculateSeconds = milliseconds =>
  doubleDigitChecker(`${(milliseconds / 100) % 60}`.split('.')[0]);
const calculateMinutes = milliseconds => doubleDigitChecker(`${milliseconds / 6000}`.split('.')[0]);
const notificationBroadcastChannel = new BroadcastChannel('timerNotification');
const timerValueBroadcastChannel = new BroadcastChannel('timerValue');
const restartBroadcastChannel = new BroadcastChannel('timerRestart');

function startTimer(timerAmount, notificationAllowed, fullAmount) {
  timerValue = timerAmount;

  if (notification) {
    notification.close();
  }

  return setInterval(() => {
    if (timerValue < 2) {
      timerValue = 0;
      timerEndTime = Date.now();

      if (Notification.permission === 'granted' && notificationAllowed && notificationToken) {
        makeRequestForPushNotification(timerAmount);
      }

      postMessage({
        timerValue,
        percentageForDisplay: timerValue / fullAmount * 100,
        fullTimerDisplay: makeFullTimerDisplay(timerValue),
        timerEndTime,
      });
      clearInterval(intervalId);
    } else {
      timerValue -= 1;

      postMessage({
        timerValue,
        percentageForDisplay: timerValue / fullAmount * 100,
        fullTimerDisplay: makeFullTimerDisplay(timerValue),
      });
    }
  }, 10);
}

function makeRequestForPushNotification(timerAmount) {
  notificationBroadcastChannel.postMessage(timerAmount);
  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');

  fetch(prodUrl, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      timerAmount,
      notificationToken,
    }),
  }).catch(response => console.log(JSON.stringify(response)));
}

timerValueBroadcastChannel.onmessage = () => {
  notificationBroadcastChannel.postMessage(timerValue);
};

restartBroadcastChannel.onmessage = () => {
  clearInterval(intervalId);

  intervalId = startTimer(timerValue, true, timerValue);
};

self.addEventListener('timerstart', (event) => {
  const { timerAmount, notificationAllowed, fullAmount } = event.detail;
  clearInterval(intervalId);

  intervalId = startTimer(timerAmount, notificationAllowed, fullAmount);
});

self.onmessage = (event) => {
  const { data } = event;

  if (data.startTimer) {
    dispatchEvent(new CustomEvent('timerstart', {
      detail: {
        timerAmount: event.data.timerAmount,
        fullAmount: event.data.fullAmount,
        notificationAllowed: event.data.notificationAllowed,
      },
    }));
  } else if (data.resetTimer) {
    timerValue = event.data.timerAmount;

    postMessage({
      timerValue,
      fullTimerDisplay: makeFullTimerDisplay(timerValue),
      percentageForDisplay: 100,
    });
    clearInterval(intervalId);
  } else if (data.setNotificationToken) {
    notificationToken = data.notificationToken;
  } else if (data.checkTimerValue) {
    postMessage({
      timerValue,
      fullTimerDisplay: makeFullTimerDisplay(timerValue),
      timerEndTime,
      percentageForDisplay: timerValue / event.data.timerAmount * 100,
    });
  } else {
    clearInterval(intervalId);
  }
};

function makeFullTimerDisplay(timerValue) {
  return `${calculateMinutes(timerValue)}:${calculateSeconds(timerValue)}:${doubleDigitChecker(`${timerValue % 100}`)}`;
}

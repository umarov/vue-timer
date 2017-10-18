import timerIcon from '../src/assets/img/favicon.ico';

let intervalId = 0;
let timerValue = 0;
let notification;

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
        notificationBroadcastChannel.postMessage(timerAmount);
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
  } else {
    clearInterval(intervalId);
  }
};

import timerIcon from '../src/assets/img/favicon.ico';

let intervalId = 0;
let timerValue = 0;
let notification;

const doubleDigitChecker = (value) => { return value.length === 1 ? `0${value}` : value; };

const calculateSeconds = milliseconds => doubleDigitChecker(`${(milliseconds / 100) % 60}`.split('.')[0]);

const calculateMinutes = milliseconds => doubleDigitChecker(`${milliseconds / 6000}`.split('.')[0]);

function showNotification(timerAmount, notificationAllowed) {
  notification = new Notification('Timer Ended', {
    body: 'Click to restart the timer',
    icon: timerIcon,
    vibrate: [200, 100, 200, 100, 200, 100, 400],
    tag: 'request',
  });

  notification.addEventListener('click', () => {
    dispatchEvent(new CustomEvent('timerstart', {
      detail: {
        timerAmount,
        notificationAllowed,
      },
    }));
  });

  setTimeout(notification.close.bind(notification), 7000);
}

function startTimer(timerAmount, notificationAllowed) {
  timerValue = timerAmount;

  if (notification) {
    notification.close();
  }

  return setInterval(() => {
    timerValue -= 1;

    postMessage({
      timerValue,
      milliseconds: doubleDigitChecker(`${timerValue % 100}`),
      seconds: calculateSeconds(timerValue),
      minutes: calculateMinutes(timerValue),
    });

    if (timerValue < 1 && Notification.permission === 'granted' && notificationAllowed) {
      dispatchEvent(new CustomEvent('timernotification', {
        detail: {
          timerAmount,
          notificationAllowed,
        },
      }));
    }
  }, 10);
}

self.addEventListener('timernotification', (event) => {
  const { timerAmount, notificationAllowed } = event.detail;
  clearInterval(intervalId);

  showNotification(timerAmount, notificationAllowed);
});

self.addEventListener('timerstart', (event) => {
  const { timerAmount, notificationAllowed } = event.detail;
  clearInterval(intervalId);

  intervalId = startTimer(timerAmount, notificationAllowed);
});

self.onmessage = (event) => {
  const data = event.data;

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

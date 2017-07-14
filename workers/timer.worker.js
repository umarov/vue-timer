let intervalId = 0;
let timerValue = 0;
const doubleDigitChecker = (value) => { return value.length === 1 ? `0${value}` : value; };

const calculateSeconds = milliseconds => doubleDigitChecker(`${(milliseconds / 100) % 60}`.split('.')[0]);

const calculateMinutes = milliseconds => doubleDigitChecker(`${milliseconds / 6000}`.split('.')[0]);

self.onmessage = (event) => {
  const data = event.data;

  if (data.startTimer) {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      timerValue += 1;
      postMessage({
        timerValue,
        milliseconds: doubleDigitChecker(`${timerValue % 100}`),
        seconds: calculateSeconds(timerValue),
        minutes: calculateMinutes(timerValue),
      });
    }, 10);
  } else if (data.resetTimer) {
    timerValue = 0;

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

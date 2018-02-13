// eslint-disable-next-line
import * as TimerWorker from 'worker-loader!../../../workers/timer.worker';
import sound from '../../assets/audio/foghorn-daniel_simon.mp3';

const audio = new Audio(sound);
audio.volume = 0.5;

export default {
  name: 'timer-display',
  components: {
    'timer-notification': () => import('./TimerNotification/TimerNotification.vue'),
  },
  props: ['timerAmount'],
  data() {
    return {
      progressSize: '100',
      timerValue: 0,
      percentageForDisplay: 0,
      fullTimerDisplay: '00:00:00',
      timerEndTime: 0,
      timerActive: false,
      timerWorker: new TimerWorker(),
    };
  },
  created() {
    document.addEventListener('visibilitychange', () => {
      this.timerWorker.postMessage({ checkTimerValue: true });
    });

    setTimeout(() => {
      window.firebaseMessaging.onMessage(() => {
        this.resetTimer();
      });
    }, 100);

    this.notificationAllowed = false;
    this.timerWorker.onmessage = (event) => {
      if (!document.hidden) {
        this.$nextTick(() => {
          const {
            timerValue, timerEndTime, percentageForDisplay, fullTimerDisplay,
          } = event.data;

          if (timerValue === 0) {
            const timeDiff = (Date.now() - timerEndTime) / 10;
            if (this.notificationAllowed && timeDiff < 10) {
              audio.play();
            }

            this.resetTimer();
          } else {
            requestAnimationFrame(() => {
              this.percentageForDisplay = percentageForDisplay;
              this.timerValue = timerValue;
              this.fullTimerDisplay = fullTimerDisplay;
            });
          }
        });
      }
    };

    const matchUpdater = size => (mediaQueryList) => {
      if (mediaQueryList.matches) {
        this.progressSize = size;
      }
    };

    const mediaQueryLists = [
      { query: window.matchMedia('(min-width: 950px)'), size: '600' },
      { query: window.matchMedia('(max-width: 949px)'), size: '450' },
      { query: window.matchMedia('(min-width: 600px)'), size: '450' },
      { query: window.matchMedia('(max-width: 599px)'), size: '400' },
      { query: window.matchMedia('(min-width: 426px)'), size: '380' },
      { query: window.matchMedia('(max-width: 425px)'), size: '350' },
      { query: window.matchMedia('(min-width: 321px)'), size: '280' },
      { query: window.matchMedia('(max-width: 320px)'), size: '250' },
    ];

    mediaQueryLists.map(mqlObj => mqlObj.query.addListener(matchUpdater.bind(this)(mqlObj.size)));
    mediaQueryLists.map(mqlObj => matchUpdater.bind(this)(mqlObj.size)(mqlObj.query));

    this.timerWorker.postMessage({
      resetTimer: true,
      timerAmount: this.timerAmount,
      fullAmount: this.timerAmount,
    });
    this.timerActive = false;

    setTimeout(() => {
      const circularOverlay = document.querySelector('.progress-circular__overlay');
      if (circularOverlay) {
        circularOverlay.style.transition = 'none';
        circularOverlay.style.color = '#4caf50';
      }
    }, 500);
  },
  destroyed() {
    this.resetTimer();
    this.timerWorker.terminate();
  },
  methods: {
    startTimer() {
      this.timerActive = true;
      if (this.timerValue === this.timerAmount) {
        audio.pause();
        audio.currentTime = 0;

        this.timerWorker.postMessage({
          startTimer: true,
          timerAmount: this.timerAmount,
          fullAmount: this.timerAmount,
          notificationAllowed: this.notificationAllowed,
        });
      } else {
        this.resumeTimer();
      }
    },
    resumeTimer() {
      this.timerActive = true;

      this.timerWorker.postMessage({
        startTimer: true,
        timerAmount: this.timerValue,
        fullAmount: this.timerAmount,
      });
    },
    pauseTimer() {
      this.timerActive = false;

      this.timerWorker.postMessage({ startTimer: false });
    },
    resetTimer() {
      this.timerActive = false;

      this.timerWorker.postMessage({
        resetTimer: true,
        timerAmount: this.timerAmount,
        fullAmount: this.timerAmount,
      });
    },
    allowNotification(notificationValue) {
      this.notificationAllowed = notificationValue;
    },
  },
};

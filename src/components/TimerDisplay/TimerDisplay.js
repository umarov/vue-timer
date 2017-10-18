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
  props: [
    'timerAmount',
  ],
  data() {
    return {
      progressSize: '100',
      progressAmount: 0,
      timerValue: 0,
      milliseconds: '00',
      seconds: '00',
      minutes: '00',
      paused: false,
      intervalObject: {},
      timerWorker: new TimerWorker(),
    };
  },
  mounted() {
    document.addEventListener('visibilitychange', () => {
      this.timerWorker.postMessage({ checkTimerValue: true });
    });

    this.notificationAllowed = false;
    this.timerWorker.onmessage = (event) => {
      requestAnimationFrame(() => {
        const {
          timerValue,
          milliseconds,
          seconds,
          minutes,
        } = event.data;

        if (timerValue === 0) {
          if (this.notificationAllowed) {
            audio.play();
          }

          this.resetTimer();
        } else {
          this.timerValue = timerValue;
          this.progressAmount = this.timerValue;

          this.milliseconds = milliseconds;
          if (this.seconds !== seconds) {
            this.seconds = seconds;
          }

          if (this.minutes !== minutes) {
            this.minutes = minutes;
          }
        }
      });
    };

    const matchUpdater = size => (mediaQueryList) => {
      if (mediaQueryList.matches) { this.progressSize = size; }
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

    this.timerWorker.postMessage({ resetTimer: true, timerAmount: this.timerAmount });
    this.paused = false;
    document.querySelector('.progress-circular__overlay').style.transition = 'none';
  },
  destroyed() {
    this.resetTimer();
    this.timerWorker.terminate();
  },
  methods: {
    startTimer() {
      audio.pause();
      audio.currentTime = 0;
      this.paused = false;

      this.timerWorker.postMessage({
        startTimer: true,
        timerAmount: this.timerAmount,
        notificationAllowed: this.notificationAllowed,
      });
    },
    resumeTimer() {
      this.paused = false;

      this.timerWorker.postMessage({ startTimer: true, timerAmount: this.timerValue });
    },
    pauseTimer() {
      this.paused = true;

      this.timerWorker.postMessage({ startTimer: false });
    },
    resetTimer() {
      this.paused = false;

      this.timerWorker.postMessage({ resetTimer: true, timerAmount: this.timerAmount });
    },
    allowNotification(notificationValue) {
      this.notificationAllowed = notificationValue;
    },
  },
};

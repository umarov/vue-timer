// eslint-disable-next-line
import * as TimerWorker from 'worker-loader!../../../workers/timer.worker';
import sound from '../../assets/audio/foghorn-daniel_simon.mp3';

const audio = new Audio(sound);
audio.volume = 0.5;

let timerWorker;

export default {
  name: 'timer-display',
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
      notificationPermission: Notification.permission,
      notificationAllowed: false,
      intervalObject: {},
    };
  },
  mounted() {
    if (this.notificationPermission === 'denied') {
      this.notificationAllowed = false;
    } else if (this.notificationPermission === 'default') {
      this.notificationAllowed = false;
    } else {
      this.notificationAllowed = true;
    }

    timerWorker = new TimerWorker();
    timerWorker.onmessage = (event) => {
      if (!document.hidden) {
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
      }
    };

    const matchUpdater = size => (mediaQueryList) => {
      if (mediaQueryList.matches) { this.progressSize = size; }
    };

    const mediaQueryLists = [
      { query: window.matchMedia('(min-width: 950px)'), size: '550' },
      { query: window.matchMedia('(max-width: 949px)'), size: '450' },
      { query: window.matchMedia('(min-width: 600px)'), size: '450' },
      { query: window.matchMedia('(max-width: 599px)'), size: '300' },
    ];

    mediaQueryLists.map(mqlObj => mqlObj.query.addListener(matchUpdater.bind(this)(mqlObj.size)));
    mediaQueryLists.map(mqlObj => matchUpdater.bind(this)(mqlObj.size)(mqlObj.query));

    timerWorker.postMessage({ resetTimer: true, timerAmount: this.timerAmount });
    this.paused = false;
    document.querySelector('.progress-circular__overlay').style.transition = 'none';
  },
  destroyed() {
    this.resetTimer();
    timerWorker.terminate();
  },
  methods: {
    startTimer() {
      audio.pause();
      audio.currentTime = 0;
      this.paused = false;

      timerWorker.postMessage({
        startTimer: true,
        timerAmount: this.timerAmount,
        notificationAllowed: this.notificationAllowed,
      });
    },
    resumeTimer() {
      this.paused = false;

      timerWorker.postMessage({ startTimer: true, timerAmount: this.timerValue });
    },
    pauseTimer() {
      this.paused = true;

      timerWorker.postMessage({ startTimer: false });
    },
    resetTimer() {
      this.paused = false;

      timerWorker.postMessage({ resetTimer: true, timerAmount: this.timerAmount });
    },
    onChangeTimerValue() {
      this.$emit('change-timer-value');
    },
    subscribeForNotifications() {
      Notification.requestPermission((permission) => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          this.notificationAllowed = !this.notificationAllowed;
        }
      });
    },
  },
};

<template>
  <div id="timer">
    <v-container fluid>
      <v-layout row justify-space-around class="text-xs-center">
        <v-flex>
          <v-btn outline flat primary v-on:click.native="onChangeTimerValue()">Change timer value</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row center justify-space-around class="text-xs-center">
        <v-flex>
          <v-btn outline
                 flat
                 primary
                 v-on:click.native="subscribeForNotifications()"
                 v-if="notificationAllowed"
                 class="green--text">
                 Nofitications & Sound: On
                 <v-icon>notifications</v-icon>
          </v-btn>
          <v-btn outline
                 flat
                 primary
                 v-on:click.native="subscribeForNotifications()"
                 v-else-if="notificationPermission === 'default'"
                 class="grey--text">
                 Nofitications & Sound: Need permission
                 <v-icon>notifications_off</v-icon>
          </v-btn>
          <v-btn outline
                 flat
                 primary
                 v-on:click.native="subscribeForNotifications()"
                 v-else-if="notificationPermission === 'denied'"
                 class="grey--text">
                 Nofitications & Sound: Denied
                 <v-icon>notifications_off</v-icon>
          </v-btn>
          <v-btn outline
                 flat
                 primary
                 v-on:click.native="subscribeForNotifications()"
                 v-else
                 class="red--text">
                 Nofitications & Sound: Off
                 <v-icon>notifications_none</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="timer">
      <div class="timer-content">
        <v-progress-circular
          v-bind:size="progressSize"
          v-bind:width="15"
          v-bind:rotate="-90"
          v-bind:value="(progressAmount / timerAmount) * 100"
          class="primary--text timer-content__circular-progress ">
          <span class="timer-content__values">
            {{ minutes }}:{{ seconds }}:{{ milliseconds }}
          </span>
        </v-progress-circular>
      </div>
      <div class="timer-buttons">
        <v-btn light
               v-if="timerValue === timerAmount"
               class="btn--light-flat-focused timer-button timer-button--start"
               v-on:click.native="startTimer()">
          Start
        </v-btn>
        <v-btn light
               v-else-if="paused"
               class="btn--light-flat-focused timer-button timer-button--start"
               v-on:click.native="resumeTimer()">
          Resume
        </v-btn>
        <v-btn light
               v-else
               class="btn--light-flat-focused timer-button timer-button--stop"
               v-on:click.native="pauseTimer()">
          Pause
        </v-btn>
        <v-btn light
               class="btn--light-flat-focused timer-button timer-button--reset"
               v-on:click.native="resetTimer()">
          Reset
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import * as TimerWorker from 'worker-loader!../../workers/timer.worker';
import sound from '../assets/audio/foghorn-daniel_simon.mp3';

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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .timer {
    display: flex;
    flex-direction: column;
  }

  .timer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .timer-content__values {
    flex: 1;
    text-align: center;
    font-weight: 200;
  }

  @media (min-width: 1200px) {
    .timer {
      flex-direction: row;
      justify-content: center;
    }

    .timer-buttons {
      flex: 1;
      flex-direction: column;
      justify-content: center;
    }

    .timer-button {
      width: 200px;
    }

    .timer-content {
      flex: 2;
    }

    .timer-content__values {
      font-size: 100px;
    }
  }

  @media (max-width: 1199px) {
    .timer-buttons {
      justify-content: space-between;
    }

    .timer-button {
      width: 33vw;
    }

    .timer-content__values {
      font-size: calc(10% + 9vw);
    }
  }

  .timer-content__circular-progress {
    flex: 1;
    margin: 20px;
    width: 15vw;
    height: 15vw;
  }

  .timer-buttons {
    display: flex;
  }

  .timer-button {
    height: 50px;
    margin: 20px;
    color: white;
  }

  .timer-button--start {
    background-color: rgb(27, 208, 27);
  }

  .timer-button--stop {
    background-color: rgb(153, 9, 9);
  }

  .timer-button--reset {
    background-color: rgb(49, 160, 255);
  }


</style>


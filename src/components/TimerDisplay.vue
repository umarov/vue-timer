<template>
  <div id="timer">
    <div class="timer">
      <div class="timer-content">
        <v-progress-circular
          v-bind:size="300"
          v-bind:width="15"
          v-bind:rotate="-90"
          v-bind:value="(timerValue / timerAmount) * 100"
          class="primary--text timer-content__circular-progress"
        >
          {{ minutes }}:{{ seconds }}:{{ milliseconds }}
        </v-progress-circular>
      </div>
      <div class="timer-buttons">
        <v-btn light
               v-if="timerValue === 0"
               class="btn--light-flat-focused timer-button timer-button--start"
               v-on:click.native="startTimer()">
          Start
        </v-btn>
        <v-btn light
               v-else-if="paused"
               class="btn--light-flat-focused timer-button timer-button--start"
               v-on:click.native="startTimer()">
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

const timerWorker = new TimerWorker();

export default {
  name: 'timer-display',
  props: [
    'timerAmount',
  ],
  data() {
    return {
      timerValue: 0,
      milliseconds: '00',
      seconds: '00',
      minutes: '00',
      paused: false,
      intervalObject: {},
    };
  },
  mounted() {
    timerWorker.onmessage = (event) => {
      if (!document.hidden) {
        requestAnimationFrame(() => {
          const {
            timerValue,
            milliseconds,
            seconds,
            minutes,
          } = event.data;

          this.timerValue = timerValue;
          this.milliseconds = milliseconds;
          if (this.seconds !== seconds) {
            this.seconds = seconds;
          }

          if (this.minutes !== minutes) {
            this.minutes = minutes;
          }
        });
      }
    };
  },
  destroyed() {
    timerWorker.terminate();
  },
  methods: {
    startTimer() {
      this.paused = false;

      timerWorker.postMessage({ startTimer: true, message: this.timerValue });
    },
    pauseTimer() {
      this.paused = true;

      timerWorker.postMessage({ startTimer: false });
    },
    resetTimer() {
      this.paused = false;

      timerWorker.postMessage({ resetTimer: true });
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
    align-content: center;
  }

  .timer-content__values {
    flex: 1;
    text-align: center;
    font-size: 15vw;
    font-weight: 200;
  }

  .timer-buttons {
    display: flex;
  }

  .timer-button {
    flex: 1;
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

  .timer-content__circular-progress {
    flex: 1;
    margin: 20px;
  }
</style>


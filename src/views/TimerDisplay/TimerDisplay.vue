<template>
  <div id="timer" class="animated slideInUp">
    <timer-notification :timer-worker="timerWorker" @notification-state="allowNotification"></timer-notification>
    <audio ref="audio" src="audio/foghorn-daniel_simon.mp3">
    </audio>
    <div class="timer">
      <div class="timer-content__values green--text">
        {{ fullTimerDisplay }}
      </div>
      <div class="timer-content">
        <svg xmlns="http://www.w3.org/2000/svg" height="300" width="300" style="transform: rotate(-90deg);">
          <circle fill="transparent" cx="150" cy="150" r="147.5" stroke-width="5" stroke-dasharray="926.77" stroke-dashoffset="0" class="progress-circular__underlay"></circle>
          <circle fill="transparent" cx="150" cy="150" r="147.5" stroke-width="5" stroke-dasharray="926.77" :stroke-dashoffset="926.77 - (926.77 * percentageForDisplay/100)" class="progress-circular__overlay" style="transition: none;"></circle>
        </svg>
      </div>
      <div class="timer-buttons">
        <v-btn light fab outline color="blue" class="btn--light-flat-focused white--text timer-button" @click.native="resetTimer()">
          <v-icon>loop</v-icon>
        </v-btn>
        <v-btn light fab outline color="red" v-if="timerActive" class="btn--light-flat-focused white--text timer-button" @click.native="pauseTimer()">
          <v-icon>pause_circle_outline</v-icon>
        </v-btn>
        <v-btn light fab outline color="green" v-else class="btn--light-flat-focused white--text timer-button" @click.native="startTimer()">
          <v-icon>play_circle_outline</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

let audio: HTMLAudioElement;

export default Vue.extend({
  name: "timer-display",
  components: {
    "timer-notification": () =>
      import("@/components/TimerNotification/TimerNotification.vue")
  },
  props: ["timerAmount"],
  data() {
    return {
      progressSize: 100,
      timerValue: 0,
      percentageForDisplay: 0,
      fullTimerDisplay: "00:00:00",
      timerEndTime: 0,
      timerActive: false,
      notificationAllowed: false,
      timerWorker: new Worker("./worker/timer.worker.js")
    };
  },
  created() {
    document.addEventListener("visibilitychange", () => {
      this.timerWorker.postMessage({ checkTimerValue: true });
    });

    setTimeout(() => {
      // @ts-ignore
      window.firebaseMessaging.onMessage(() => {
        this.resetTimer();
      });
    }, 100);

    this.notificationAllowed = false;
    this.timerWorker.onmessage = event => {
      if (!document.hidden) {
        this.$nextTick(() => {
          const {
            timerValue,
            timerEndTime,
            percentageForDisplay,
            fullTimerDisplay
          } = event.data;

          if (timerValue === 0) {
            const timeDiff = (Date.now() - timerEndTime) / 10;
            if (this.notificationAllowed && timeDiff < 10) {
              const audio = this.$refs.audio as HTMLAudioElement;
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

    const matchUpdater = (size: number) => (mediaQueryList: MediaQueryList) => {
      if (mediaQueryList.matches) {
        this.progressSize = size;
      }
    };

    const mediaQueryLists = [
      { query: window.matchMedia("(min-width: 950px)"), size: "600" },
      { query: window.matchMedia("(max-width: 949px)"), size: "450" },
      { query: window.matchMedia("(min-width: 600px)"), size: "450" },
      { query: window.matchMedia("(max-width: 599px)"), size: "400" },
      { query: window.matchMedia("(min-width: 426px)"), size: "380" },
      { query: window.matchMedia("(max-width: 425px)"), size: "350" },
      { query: window.matchMedia("(min-width: 321px)"), size: "280" },
      { query: window.matchMedia("(max-width: 320px)"), size: "250" }
    ];

    mediaQueryLists.map(mqlObj =>
      mqlObj.query.addListener(matchUpdater.bind(this)(mqlObj.size))
    );
    mediaQueryLists.map(mqlObj =>
      matchUpdater.bind(this)(mqlObj.size)(mqlObj.query)
    );

    this.timerWorker.postMessage({
      resetTimer: true,
      timerAmount: this.timerAmount,
      fullAmount: this.timerAmount
    });
    this.timerActive = false;

    setTimeout(() => {
      const circularOverlay: HTMLDivElement = document.querySelector(
        ".progress-circular__overlay"
      ) as HTMLDivElement;

      if (circularOverlay) {
        circularOverlay.style.transition = "none";
        circularOverlay.style.color = "#4caf50";
      }
    }, 500);
  },
  destroyed() {
    this.resetTimer();
    this.timerWorker.terminate();
  },
  methods: {
    startTimer(): void {
      this.timerActive = true;
      if (this.timerValue === this.timerAmount) {
        const audio = this.$refs.audio as HTMLAudioElement;

        audio.pause();
        audio.currentTime = 0;

        this.timerWorker.postMessage({
          startTimer: true,
          timerAmount: this.timerAmount,
          fullAmount: this.timerAmount,
          notificationAllowed: this.notificationAllowed
        });
      } else {
        this.resumeTimer();
      }
    },
    resumeTimer(): void {
      this.timerActive = true;

      this.timerWorker.postMessage({
        startTimer: true,
        timerAmount: this.timerValue,
        fullAmount: this.timerAmount
      });
    },
    pauseTimer(): void {
      this.timerActive = false;

      this.timerWorker.postMessage({ startTimer: false });
    },
    resetTimer(): void {
      this.timerActive = false;

      this.timerWorker.postMessage({
        resetTimer: true,
        timerAmount: this.timerAmount,
        fullAmount: this.timerAmount
      });
    },
    allowNotification(notificationValue: boolean): void {
      this.notificationAllowed = notificationValue;
    }
  }
});
</script>

<style scoped>
.timer {
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 15px;
}

#timer {
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 15px;
}

.timer-content__values {
  flex: 1;
  text-align: center;
  font-weight: 200;
}

.timer {
  display: grid;
  justify-content: center;
}

.timer-buttons {
  flex-direction: row;
  justify-content: space-between;
}

.timer-button {
  width: 100px;
}

.timer-content {
  display: flex;
  justify-content: center;
  flex: 2;
}

.timer-content__values {
  font-size: 10vw;
}

.timer-content__circular-progress {
  justify-content: center;
  animation-duration: 1s;
}

.timer-buttons {
  display: flex;
}

.timer-button {
  width: 100px;
  height: 100px;
}

@media screen and (max-width: 425px) {
  .timer-button {
    width: 70px;
    height: 70px;
  }
}
</style>

<template>
  <div
    id="timer">
    <timer-notification
      :timer-worker="timerWorker"
      @notification-state="allowNotification"/>
    <audio
      ref="audio"
      src="audio/foghorn-daniel_simon.mp3"/>
    <div class="timer">
      <div class="timer-content__values green--text">
        {{ fullTimerDisplay }}
      </div>
      <div class="timer-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="300"
          width="300"
          style="transform: rotate(-90deg);">
          <circle
            fill="transparent"
            cx="150"
            cy="150"
            r="147.5"
            stroke-width="5"
            stroke-dasharray="926.77"
            stroke-dashoffset="0"
            class="progress-circular__underlay"/>
          <circle
            fill="transparent"
            cx="150"
            cy="150"
            r="147.5"
            stroke-width="5"
            stroke-dasharray="926.77"
            :stroke-dashoffset="percentageForDisplay"
            class="progress-circular__overlay"
            style="transition: none;"/>
        </svg>
      </div>
      <div class="timer-buttons">
        <div>
          <v-btn
            light
            fab
            outline
            color="blue"
            class="btn--light-flat-focused white--text timer-button"
            @click.native="resetTimer()">
            <v-icon>stop</v-icon>
          </v-btn>
          <p class="text-xs-center subheading blue--text">Stop</p>
        </div>
        <div v-if="timerActive">
          <v-btn
            light
            fab
            outline
            color="orange"
            class="btn--light-flat-focused white--text timer-button"
            @click.native="pauseTimer()">
            <v-icon>pause_circle_outline</v-icon>
          </v-btn>
          <p class="text-xs-center subheading orange--text">Pause</p>

        </div>

        <div v-else>
          <v-btn
            light
            fab
            outline
            color="green"
            class="btn--light-flat-focused white--text timer-button"
            @click.native="startTimer()">
            <v-icon>play_circle_outline</v-icon>
          </v-btn>
          <p class="text-xs-center subheading green--text">Start</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

let audio: HTMLAudioElement;

export default Vue.extend({
  name: "TimerDisplay",
  components: {
    "timer-notification": () =>
      import("@/components/TimerNotification/TimerNotification.vue")
  },
  props: {
    timerAmount: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      progressSize: 100,
      timerValue: 0,
      percentageForDisplay: 0,
      fullTimerDisplay: "00:00:00:00",
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

    // @ts-ignore
    this.$root.firebaseMessaging.onMessage(() => {
      this.resetTimer();
    });

    this.notificationAllowed = false;
    this.timerWorker.onmessage = event => {
      if (!document.hidden) {
        const {
          timerValue,
          percentageForDisplay,
          fullTimerDisplay
        } = event.data;

        if (timerValue === 0) {
          const { timerEndTime } = event.data;
          const timeDiff = (Date.now() - timerEndTime) / 10;
          if (this.notificationAllowed && timeDiff < 10) {
            const audio = this.$refs.audio as HTMLAudioElement;
            audio.play();
          }

          this.resetTimer();
        } else {
          requestAnimationFrame(() => {
            this.percentageForDisplay = percentageForDisplay;
            this.fullTimerDisplay = fullTimerDisplay;
          });

          setTimeout(() => {
            this.timerValue = timerValue;
          }, 0);
        }
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

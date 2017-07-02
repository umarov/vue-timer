<template>
  <div id="timer">
    <h2>Code shop timer</h2>
    <div class="timer">
      <div class="timer-content">
        <p class="timer-content__values">{{ minutes }}:{{ seconds }}:{{ milliseconds }}</p>
      </div>
      <div class="timer-buttons">
        <v-btn light
               class="btn--light-flat-focused timer-button timer-button--start"
               v-on:click.native="startTimer()">
          Start timer
        </v-btn>
        <v-btn light
               class="btn--light-flat-focused timer-button timer-button--stop"
               v-on:click.native="stopTimer()">
          Stop timer
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'timer',
  data() {
    return {
      timerValue: 0,
      milliseconds: '00',
      seconds: '00',
      minutes: '00',
      intervalObject: {},
    };
  },
  watch: {
    timerValue(val) {
      this.milliseconds = this.doubleDigitChecker(`${val % 100}`);
      this.seconds = this.calculateSeconds(val);
      this.minutes = this.calculateMinutes(val);
    },
  },
  methods: {
    startTimer() {
      this.stopTimer();
      this.intervalObject = setInterval(() => {
        this.timerValue += 1;
      }, 10);
    },
    stopTimer() {
      clearInterval(this.intervalObject);
    },
    doubleDigitChecker(value) {
      return value.length === 1 ? `0${value}` : value;
    },
    calculateSeconds(milliseconds) {
      return this.doubleDigitChecker(`${(milliseconds / 100) % 60}`.split('.')[0]);
    },
    calculateMinutes(milliseconds) {
      return this.doubleDigitChecker(`${milliseconds / 6000}`.split('.')[0]);
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
  }

  .timer-content__values {
    flex: 1;
    text-align: center;
    font-size: 20vw;
    font-weight: 200;
  }

  .timer-buttons {
    display: flex;
  }

  .timer-button {
    flex: 1;
    margin: 20px;
    height: 20vw;
    font-size: 5vw;
  }

  .timer-button--start {
    background-color: rgb(27, 208, 27);
  }

  .timer-button--stop {
    background-color: rgb(153, 9, 9);
  }
</style>

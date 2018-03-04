<template>
  <div id="timer-input">
    <div class="time-values">
      <v-container fluid>
        <v-layout
          row
          justify-space-around
          class="text-xs-center">
          <code class="time-values__minutes">{{ minutes }}:{{ seconds }}</code>
        </v-layout>
      </v-container>
    </div>
    <div class="time-adjusters">
      <v-container fluid>
        <v-layout
          row
          justify-space-around
          class="text-xs-center">
          <div class="number-inputs">
            <v-btn 
              round 
              color="blue" 
              class="white--text" 
              v-for="number in 9" 
              @click="addSeconds(number)" 
              :key="number">{{ number }}</v-btn>
            <v-btn 
              class="last-number-input-button white--text" 
              round 
              color="blue" 
              @click="addSeconds(0)">0</v-btn>
          </div>
        </v-layout>
      </v-container>
    </div>

    <div class="time-submitter">
      <v-container fluid>
        <v-layout
          row
          justify-space-around
          class="text-xs-center">
          <v-flex xs6>
            <v-btn
              flat
              class="red--text"
              @click.native="resetValues()">Reset</v-btn>
          </v-flex>

          <v-flex xs6>
            <v-btn
              raised
              class="white--text"
              color="green"
              @click.native="onTimerAmountSet()">Prepare timer</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimerInput",
  data() {
    return {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      longPressed: false,
      longPressTimeout: 0
    };
  },
  watch: {
    milliseconds(millisecond) {
      if (millisecond > 99) {
        this.seconds += 1;
        this.milliseconds = millisecond % 100;
      } else {
        this.milliseconds = millisecond;
      }
    },
    seconds(second) {
      if (second > 59) {
        this.minutes += 1;
        this.seconds = second % 60;
      } else {
        this.seconds = second;
      }
    }
  },
  mounted() {},
  destroyed() {
    this.resetValues();
  },
  methods: {
    resetValues() {
      this.minutes = 0;
      this.seconds = 0;
      this.milliseconds = 0;
    },
    startLongpress(action, type, timeoutValue = 1000) {
      this.longPressed = true;

      this.longPressTimeout = setTimeout(() => {
        if (this.longPressed) {
          action(type);
          this.startLongpress(action, type, timeoutValue * 0.81);
        }
      }, timeoutValue * 0.81);
    },
    stopLongpress() {
      clearTimeout(this.longPressTimeout);
      this.longPressed = false;
    },
    addSeconds(seconds) {
      this.seconds = +`${this.seconds}${seconds}`;
    },
    onTimerAmountSet() {
      let timerAmountInMillis = this.milliseconds;
      if (this.seconds > 0) {
        timerAmountInMillis += this.seconds * 100;
      }

      if (this.minutes > 0) {
        timerAmountInMillis += this.minutes * 6000;
      }

      if (timerAmountInMillis > 0) {
        this.$router.push({
          name: "timer-display",
          params: { timerAmount: timerAmountInMillis }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.time-values {
  font-size: 30px;
}

#timer-input {
  display: grid;
  grid-template-rows: 1fr 3fr 1fr;
  grid-row-gap: 15px;
}

.number-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.last-number-input-button {
  grid-column-start: 2;
}
</style>

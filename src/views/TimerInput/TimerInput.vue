<template>
  <div id="timer-input">
    <div class="time-values">
      <v-container fluid>
        <v-layout row justify-space-around class="text-xs-center">
          <v-flex xs4>
            <span class="time-values__minutes">{{ minutes }}</span>
            <p class="body-1">Minutes</p>
          </v-flex>

          <v-flex xs4>
            <span class="time-values__seconds">{{ seconds }}</span>
            <p class="body-1">Seconds</p>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div class="time-adjusters">
      <v-container fluid>
        <v-layout row justify-space-around class="text-xs-center">
          <div class="time-adjusters_minutes">
            <v-btn fab
                   class="green white--text mb-4"
                   @click.native="increment('minute')"
                   @mousedown.native="startLongpress(increment, 'minute')"
                   @mouseup.native="stopLongpress()">
              <v-icon>add</v-icon>
            </v-btn>

            <v-btn outline
                   fab
                   class="red--text mb-4"
                   @click.native="decrement('minute')"
                   @mousedown.native="startLongpress(decrement, 'minute')"
                   @mouseup.native="stopLongpress()">
              <v-icon>remove</v-icon>
            </v-btn>
          </div>

          <div class="time-adjusters_seconds">
            <v-btn fab
                   class="green white--text mb-4"
                   @click.native="increment('second')"
                   @mousedown.native="startLongpress(increment, 'second')"
                   @mouseup.native="stopLongpress()">
              <v-icon>add</v-icon>
            </v-btn>

            <v-btn outline
                   fab
                   class="red--text mb-4"
                   @click.native="decrement('second')"
                   @mousedown.native="startLongpress(decrement, 'second')"
                   @mouseup.native="stopLongpress()">
              <v-icon>remove</v-icon>
            </v-btn>
          </div>
        </v-layout>
      </v-container>
    </div>

    <div class="time-submitter">
      <v-container fluid>
        <v-layout row justify-space-around class="text-xs-center">
          <v-flex xs6>
            <v-btn flat class="red--text" @click.native="resetValues()">Reset</v-btn>
          </v-flex>

          <v-flex xs6>
            <v-btn raised class="white--text" color="green" @click.native="onTimerAmountSet()">Prepare timer</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "timer-input",
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
    increment(type) {
      switch (type) {
        case "minute":
          this.minutes += 1;
          break;
        case "second":
          this.seconds += 1;
          break;
        case "millisecond":
          this.milliseconds += 1;
          break;
        default:
          break;
      }
    },
    decrement(type) {
      switch (type) {
        case "minute":
          if (this.minutes < 1) {
            this.minutes = 0;
          } else {
            this.minutes -= 1;
          }

          break;
        case "second":
          if (this.seconds < 1) {
            this.seconds = 0;
          } else {
            this.seconds -= 1;
          }

          break;
        case "millisecond":
          if (this.milliseconds < 1) {
            this.milliseconds = 0;
          } else {
            this.milliseconds -= 1;
          }

          break;
        default:
          break;
      }
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
  grid-template-rows: 30% 30% 30%;
  grid-row-gap: 15px;
}
</style>

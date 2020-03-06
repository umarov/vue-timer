<template>
  <div id="timer-input">
    <div class="time-values">
      <v-container fluid>
        <v-layout row justify-space-around class="text-center">
          <code class="time-values__minutes"
            >{{ hours }}:{{ minutes }}:{{ seconds }}</code
          >
        </v-layout>
      </v-container>
    </div>
    <div class="time-adjusters">
      <v-container fluid>
        <v-layout row justify-space-around class="text-center">
          <div class="number-inputs">
            <v-btn
              rounded
              color="blue"
              class="white--text"
              v-for="number in 9"
              @click="addSeconds(number)"
              :key="number"
            >
              {{ number }}
            </v-btn>
            <v-btn
              class="last-number-input-button white--text"
              rounded
              color="blue"
              @click="addSeconds(0)"
            >
              0
            </v-btn>
          </div>
        </v-layout>
      </v-container>
    </div>

    <div class="time-submitter">
      <v-container fluid>
        <v-layout class="d-flex justify-space-around">
          <v-btn text class="red--text" @click.native="resetValues()">
            Reset
          </v-btn>

          <v-btn
            raised
            class="white--text"
            color="green"
            @click.native="onTimerAmountSet()"
          >
            Prepare timer
          </v-btn>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TimerInput",
  data() {
    return {
      totalNumber: 0,
      longPressed: false,
      longPressTimeout: 0
    };
  },
  computed: {
    seconds(): string {
      if (this.totalNumber / 10 < 1) {
        return `0${this.totalNumber}`;
      }

      const stringNumber = this.totalNumber.toString();

      return stringNumber.substring(stringNumber.length - 2);
    },
    minutes(): string {
      const totalMinutes = Math.floor(this.totalNumber / 100);

      if (totalMinutes / 10 < 1) {
        return `0${totalMinutes}`;
      }

      const stringNumber = totalMinutes.toString();

      return stringNumber.substring(stringNumber.length - 2);
    },
    hours(): string {
      const totalHours = Math.floor(this.totalNumber / 10000);

      if (totalHours / 10 < 1) {
        return `0${totalHours}`;
      }

      return `${totalHours}`;
    }
  },
  destroyed() {
    this.resetValues();
  },
  methods: {
    resetValues() {
      this.totalNumber = 0;
    },
    addSeconds(value: number) {
      if (this.totalNumber < 100000) {
        this.totalNumber = +`${this.totalNumber}${value}`;
      }
    },
    onTimerAmountSet() {
      const seconds = +this.seconds;
      const minutes = +this.minutes;
      const hours = +this.hours;
      const timerAmountInMillis =
        seconds * 100 + minutes * 6000 + hours * 3600000;

      if (timerAmountInMillis > 0) {
        this.$router.push({
          name: "timer-display",
          params: { timerAmount: timerAmountInMillis.toString() }
        });
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.time-values {
  font-size: 30px;
}

#timer-input {
  display: grid;
  grid-template-rows: 1fr 3fr 1fr;
}

.number-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
}

.last-number-input-button {
  grid-column-start: 2;
}
</style>

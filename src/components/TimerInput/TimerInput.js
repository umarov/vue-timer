export default {
  name: 'timer-input',
  data() {
    return {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      longPressed: false,
      longPressTimeout: 0,
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
    },
  },
  mounted() {

  },
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
        case 'minute':
          this.minutes += 1;
          break;
        case 'second':
          this.seconds += 1;
          break;
        case 'millisecond':
          this.milliseconds += 1;
          break;
        default:
          break;
      }
    },
    decrement(type) {
      switch (type) {
        case 'minute':
          if (this.minutes < 1) {
            this.minutes = 0;
          } else {
            this.minutes -= 1;
          }

          break;
        case 'second':
          if (this.seconds < 1) {
            this.seconds = 0;
          } else {
            this.seconds -= 1;
          }

          break;
        case 'millisecond':
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
        this.$router.push({ name: 'timer-display', params: { timerAmount: timerAmountInMillis } });
      }
    },
  },
};

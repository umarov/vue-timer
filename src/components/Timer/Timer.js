import TimerDisplay from '@/components/TimerDisplay/TimerDisplay.vue';
import TimerInput from '@/components/TimerInput/TimerInput.vue';

export default {
  name: 'timer',
  components: {
    TimerDisplay,
    TimerInput,
  },
  data() {
    return {
      timerAmount: null,
    };
  },
  mounted() {

  },
  destroyed() {
  },
  methods: {
    timerAmountSet(value) {
      this.timerAmount = value;
    },
    onChangeTimerValue() {
      this.timerAmount = null;
    },
  },
};

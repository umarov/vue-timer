<template>
  <div class="timer-content">
    <timer-input></timer-input>
    <timer-display :timer-amount="6000"></timer-display>
  </div>
</template>

<script>
  import TimerDisplay from './TimerDisplay';
  import TimerInput from './TimerInput';

  export default {
    name: 'timer',
    components: {
      TimerDisplay,
      TimerInput,
    },
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

    },
    destroyed() {
    },
    methods: {
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
  <div class="timer-content">
    <timer-input v-if="!timerAmount" v-on:timer-amount-set="timerAmountSet"></timer-input>
    <timer-display v-if="timerAmount && timerAmount > 0" :timer-amount="timerAmount" v-on:change-timer-value="onChangeTimerValue"></timer-display>
  </div>


</template>

<script src="./Timer.js" type="text/javascript"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

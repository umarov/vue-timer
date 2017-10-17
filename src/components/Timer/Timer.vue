<template>
  <div class="timer-container animated fadeInDown">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'timer',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .timer-container {
    display: grid;
  }
</style>

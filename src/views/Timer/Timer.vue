<template>
  <div class="timer-container animated fadeInDown">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "timer"
});
</script>

<style scoped>
.timer-container {
  display: grid;
}
</style>

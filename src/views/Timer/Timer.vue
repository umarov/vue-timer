<template>
  <div class="timer-container">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Timer',
});
</script>

<style scoped>
.timer-container {
  display: grid;
}
</style>

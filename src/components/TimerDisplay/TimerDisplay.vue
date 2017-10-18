<template>
  <div id="timer" class="animated slideInUp">
    <timer-notification v-bind:timer-worker="timerWorker" v-on:notification-state="allowNotification"></timer-notification>
    <div class="timer">
      <div class="timer-content__values green--text">
        {{ minutes }}:{{ seconds }}:{{ milliseconds }}
      </div>
      <div class="timer-content">
        <v-progress-circular
          v-bind:size="300"
          v-bind:width="5"
          v-bind:rotate="-90"
          color="green"
          v-bind:class="{ pulse: paused }"
          v-bind:value="(progressAmount / timerAmount) * 100"
          class="primary--text timer-content__circular-progress animated infinite">
        </v-progress-circular>
      </div>
      <div class="timer-buttons">
        <v-btn light
                fab
                outline
                color="blue"
                class="btn--light-flat-focused white--text timer-button"
                v-on:click.native="resetTimer()">
          <v-icon>loop</v-icon>
        </v-btn>
        <v-btn light
                fab
                outline
                color="green"
                v-if="timerValue === timerAmount"
                class="btn--light-flat-focused white--text timer-button"
                v-on:click.native="startTimer()">
          <v-icon>play_circle_outline</v-icon>
        </v-btn>
        <v-btn light
                fab
                outline
                color="green"
                v-else-if="paused"
                class="btn--light-flat-focused white--text timer-button"
                v-on:click.native="resumeTimer()">
          <v-icon>play_circle_filled</v-icon>
        </v-btn>
        <v-btn light
                fab
                outline
                color="red"
                v-else
                class="btn--light-flat-focused white--text timer-button"
                v-on:click.native="pauseTimer()">
          <v-icon>pause_circle_outline</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script src="./TimerDisplay.js" type="text/javascript"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./TimerDisplay.scss" scoped></style>


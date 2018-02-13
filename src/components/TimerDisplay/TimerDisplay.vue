<template>
  <div id="timer" class="animated slideInUp">
    <timer-notification :timer-worker="timerWorker" @notification-state="allowNotification"></timer-notification>
    <div class="timer">
      <div class="timer-content__values green--text">
        {{ fullTimerDisplay }}
      </div>
      <div class="timer-content">
        <!-- <v-progress-circular :size="300" :width="5" :rotate="-90" color="green" :class="{ pulse: paused }" :value="percentageForDisplay" class="primary--text timer-content__circular-progress animated infinite">
        </v-progress-circular> -->
        <svg xmlns="http://www.w3.org/2000/svg" height="300" width="300" style="transform: rotate(-90deg);">
          <circle fill="transparent" cx="150" cy="150" r="147.5" stroke-width="5" stroke-dasharray="926.77" stroke-dashoffset="0" class="progress-circular__underlay"></circle>
          <circle fill="transparent" cx="150" cy="150" r="147.5" stroke-width="5" stroke-dasharray="926.77" :stroke-dashoffset="926.77 - (926.77 * percentageForDisplay/100)" class="progress-circular__overlay" style="transition: none;"></circle>
        </svg>
      </div>
      <div class="timer-buttons">
        <v-btn light fab outline color="blue" class="btn--light-flat-focused white--text timer-button" @click.native="resetTimer()">
          <v-icon>loop</v-icon>
        </v-btn>
        <v-btn light fab outline color="red" v-if="timerActive" class="btn--light-flat-focused white--text timer-button" @click.native="pauseTimer()">
          <v-icon>pause_circle_outline</v-icon>
        </v-btn>
        <v-btn light fab outline color="green" v-else class="btn--light-flat-focused white--text timer-button" @click.native="startTimer()">
          <v-icon>play_circle_outline</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script src="./TimerDisplay.js" type="text/javascript"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./TimerDisplay.scss" scoped></style>


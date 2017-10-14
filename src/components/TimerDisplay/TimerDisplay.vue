<template>
  <div id="timer">
    <v-container fluid>
      <v-layout row justify-space-around class="text-xs-center">
        <v-flex>
          <v-btn outline flat v-on:click.native="onChangeTimerValue()">Change timer value</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row center justify-space-around class="text-xs-center">
        <v-flex>
          <v-btn outline
                 flat
                 color="green"
                 v-on:click.native="subscribeForNotifications()"
                 v-if="notificationAllowed"
                 class="green--text">
                 Nofitications & Sound: On
                 <v-icon>notifications</v-icon>
          </v-btn>
          <v-btn outline
                 flat
                 color="green"
                 v-on:click.native="subscribeForNotifications()"
                 v-else-if="notificationPermission === 'default'"
                 class="grey--text">
                 Nofitications & Sound: Need permission
                 <v-icon>notifications_off</v-icon>
          </v-btn>
          <v-btn outline
                 flat
                 color="green"
                 v-on:click.native="subscribeForNotifications()"
                 v-else-if="notificationPermission === 'denied'"
                 class="grey--text">
                 Nofitications & Sound: Denied
                 <v-icon>notifications_off</v-icon>
          </v-btn>
          <v-btn outline
                 flat
                 color="green"
                 v-on:click.native="subscribeForNotifications()"
                 v-else
                 class="red--text">
                 Nofitications & Sound: Off
                 <v-icon>notifications_none</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="timer">
      <div class="timer-content">
        <v-progress-circular
          v-bind:size="progressSize"
          v-bind:width="15"
          v-bind:rotate="-90"
          v-bind:value="(progressAmount / timerAmount) * 100"
          class="primary--text timer-content__circular-progress ">
          <span class="timer-content__values">
            {{ minutes }}:{{ seconds }}:{{ milliseconds }}
          </span>
        </v-progress-circular>
      </div>
      <div class="timer-buttons">
        <v-btn light
               v-if="timerValue === timerAmount"
               class="btn--light-flat-focused timer-button timer-button--start"
               v-on:click.native="startTimer()">
          Start
        </v-btn>
        <v-btn light
               v-else-if="paused"
               class="btn--light-flat-focused timer-button timer-button--start"
               v-on:click.native="resumeTimer()">
          Resume
        </v-btn>
        <v-btn light
               v-else
               class="btn--light-flat-focused timer-button timer-button--stop"
               v-on:click.native="pauseTimer()">
          Pause
        </v-btn>
        <v-btn light
               class="btn--light-flat-focused timer-button timer-button--reset"
               v-on:click.native="resetTimer()">
          Reset
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script src="./TimerDisplay.js" type="text/javascript"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./TimerDisplay.scss" scoped></style>


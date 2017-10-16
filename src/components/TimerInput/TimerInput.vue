<template>
  <div>
    <v-toolbar class="green" dark>
      <v-toolbar-title class="white--text">Code Shop Timer</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <div class="time-values">
      <v-container fluid>
        <v-layout row justify-space-around class="text-xs-center">
          <v-flex xs4>
            <span class="time-values__minutes">{{ minutes }}</span>
            <p class="body-1">Minutes</p>
          </v-flex>

          <v-flex xs4>
            <span class="time-values__seconds">{{ seconds }}</span>
            <p class="body-1">Seconds</p>
          </v-flex>

          <v-flex xs4>
            <span class="time-values__milliseconds">{{ milliseconds }}</span>
            <p class="body-1">Milliseconds</p>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div class="time-adjusters">
      <v-container fluid>
        <v-layout row justify-space-around class="text-xs-center">
          <div class="time-adjusters_minutes">
            <v-btn fab
                   class="green white--text mb-4"
                   v-on:click.native="increment('minute')"
                   v-on:mousedown.native="startLongpress(increment, 'minute')"
                   v-on:mouseup.native="stopLongpress()">
              <v-icon>add</v-icon>
            </v-btn>

            <v-btn outline
                   fab
                   class="red--text mb-4"
                   v-on:click.native="decrement('minute')"
                   v-on:mousedown.native="startLongpress(decrement, 'minute')"
                   v-on:mouseup.native="stopLongpress()">
              <v-icon>remove</v-icon>
            </v-btn>
          </div>

          <div class="time-adjusters_seconds">
            <v-btn fab
                   class="green white--text mb-4"
                   v-on:click.native="increment('second')"
                   v-on:mousedown.native="startLongpress(increment, 'second')"
                   v-on:mouseup.native="stopLongpress()">
              <v-icon>add</v-icon>
            </v-btn>

            <v-btn outline
                   fab
                   class="red--text mb-4"
                   v-on:click.native="decrement('second')"
                   v-on:mousedown.native="startLongpress(decrement, 'second')"
                   v-on:mouseup.native="stopLongpress()">
              <v-icon>remove</v-icon>
            </v-btn>
          </div>

          <div class="time-adjusters_milliseconds">
            <v-btn fab
                   class="green white--text mb-4"
                   v-on:click.native="increment('millisecond')"
                   v-on:mousedown.native="startLongpress(increment, 'millisecond')"
                   v-on:mouseup.native="stopLongpress()">
              <v-icon>add</v-icon>
            </v-btn>

            <v-btn outline
                   fab
                   class="red--text mb-4"
                   v-on:click.native="decrement('millisecond')"
                   v-on:mousedown.native="startLongpress(decrement, 'millisecond')"
                   v-on:mouseup.native="stopLongpress()">
              <v-icon>remove</v-icon>
            </v-btn>
          </div>
        </v-layout>
      </v-container>
    </div>

    <div class="time-submitter">
      <v-container fluid>
        <v-layout row justify-space-around class="text-xs-center">
          <v-flex xs6>
            <v-btn outline flat class="red--text" v-on:click.native="resetValues()">Reset</v-btn>
          </v-flex>

          <v-flex xs6>
            <v-btn outline flat color="green" v-on:click.native="onTimerAmountSet()">Prepare timer</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script src="./TimerInput.js" type="text/javascript"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .time-values {
    font-size: 30px;
  }
</style>

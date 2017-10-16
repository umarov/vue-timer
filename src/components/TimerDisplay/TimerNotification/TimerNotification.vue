<template>
  <div>
    <v-layout row center justify-space-around class="text-xs-center">
      <v-flex>
        <v-btn outline
                flat
                color="green"
                v-on:click.native="subscribeForNotifications()"
                v-if="notificationAllowed"
                class="green--text">
                Nofitications: On
                <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn outline
                flat
                color="green"
                v-on:click.native="subscribeForNotifications()"
                v-else-if="notificationPermission === 'default'"
                class="grey--text">
                Nofitications: Need permission
                <v-icon>notifications_off</v-icon>
        </v-btn>
        <v-btn outline
                flat
                color="green"
                v-on:click.native="subscribeForNotifications()"
                v-else-if="notificationPermission === 'denied'"
                class="grey--text">
                Nofitications: Denied
                <v-icon>notifications_off</v-icon>
        </v-btn>
        <v-btn outline
                flat
                color="green"
                v-on:click.native="subscribeForNotifications()"
                v-else
                class="red--text">
                Nofitications: Off
                <v-icon>notifications_none</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>
<script src="./TimerNotification.js"></script>

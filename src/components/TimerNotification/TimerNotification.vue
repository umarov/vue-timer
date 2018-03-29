<template>
  <div>
    <v-layout
      v-if="token"
      row
      center
      justify-space-around
      class="text-xs-center">
      <v-flex>
        <v-btn
          outline
          flat
          color="green"
          @click.native="subscribeForNotifications()"
          v-if="notificationAllowed"
          class="green--text">
          Nofitications: On
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn
          outline
          flat
          color="green"
          @click.native="subscribeForNotifications()"
          v-else-if="notificationPermission === 'default'"
          class="grey--text">
          Nofitications: Need permission
          <v-icon>notifications_off</v-icon>
        </v-btn>
        <v-btn
          outline
          flat
          color="green"
          @click.native="subscribeForNotifications()"
          v-else-if="notificationPermission === 'denied'"
          class="grey--text">
          Nofitications: Denied
          <v-icon>notifications_off</v-icon>
        </v-btn>
        <v-btn
          outline
          flat
          color="green"
          @click.native="subscribeForNotifications()"
          v-else
          class="red--text">
          Nofitications: Off
          <v-icon>notifications_none</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  name: "TimerNotification",
  props: {
    timerWorker: {
      type: Worker,
      default: {}
    }
  },
  data() {
    return {
      notificationPermission: Notification.permission,
      notificationAllowed: null,
      token: null,
      worker: this.timerWorker
    };
  },
  async mounted() {
    try {
      await this.$root.swRegistration;

      this.setupTokens();
    } catch {
      console.error("SW not supported");
    }
  },
  methods: {
    setupTokens() {
      this.$root.firebaseMessaging
        .getToken()
        .then(this.onTokenReceived)
        .catch(this.notificationNotAllowed)
        .then(this.fireEventWithNotificationState);

      this.$root.firebaseMessaging.onTokenRefresh(() => {
        this.$root.firebaseMessaging
          .getToken()
          .then(this.onTokenReceived)
          .catch(this.notificationNotAllowed)
          .then(this.fireEventWithNotificationState);
      });
    },
    onTokenReceived(currentToken) {
      if (currentToken) {
        this.token = currentToken;
        this.sendTokenToWorker(currentToken);
        this.notificationAllowed = this.getCachedOverride();
      } else {
        this.notificationNotAllowed();
      }
    },
    notificationNotAllowed() {
      this.notificationAllowed = false;
    },
    sendTokenToWorker(token) {
      this.worker.postMessage({
        setNotificationToken: true,
        notificationToken: token
      });
    },
    fireEventWithNotificationState() {
      this.$emit("notification-state", this.getCachedOverride());
    },
    subscribeForNotifications() {
      this.$root.firebaseMessaging
        .requestPermission()
        .then(() => {
          this.notificationAllowed = !this.notificationAllowed;
          this.setCachedOverride(this.notificationAllowed);
        })
        .catch(() => {
          this.setCachedOverride(false);
        });
    },
    getCachedOverride() {
      return localStorage.getItem("notification-override") === "true";
    },
    setCachedOverride(notificationOverride) {
      localStorage.setItem("notification-override", notificationOverride);
      this.fireEventWithNotificationState();
    }
  }
};
</script>

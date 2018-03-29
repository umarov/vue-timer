<template>
  <div>
    <v-layout
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
      notificationPermission: "default",
      notificationAllowed: false,
      token: "",
      worker: this.timerWorker
    };
  },
  async mounted() {
    try {
      this.notificationPermission = await Notification.requestPermission();
      await this.$root.swRegistration;
      this.setupTokens();
    } catch {
      console.error("SW not supported");
    }
  },
  watch: {
    notificationAllowed: "setCachedOverride"
  },
  methods: {
    async setupTokens() {
      await this.getToken();
      this.$root.firebaseMessaging.onTokenRefresh(() => this.getToken());
    },
    async getToken() {
      try {
        const token = await this.$root.firebaseMessaging.getToken();
        this.onTokenReceived(token);
      } catch (err) {
        this.notificationNotAllowed();
      }
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
    async subscribeForNotifications() {
      try {
        await this.$root.firebaseMessaging.requestPermission();
        this.notificationAllowed = !this.notificationAllowed;
      } catch (err) {
        this.notificationAllowed = false;
      }
    },
    getCachedOverride() {
      return localStorage.getItem("notification-override") === "yes";
    },
    setCachedOverride(notificationOverride) {
      localStorage.setItem(
        "notification-override",
        notificationOverride ? "yes" : "no"
      );
      this.fireEventWithNotificationState();
    }
  }
};
</script>

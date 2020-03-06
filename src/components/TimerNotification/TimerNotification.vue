<template>
  <div>
    <v-layout class="d-flex justify-center text-center mt-5">
      <v-btn
        outlined
        text
        color="green"
        @click.native="subscribeForNotifications()"
        v-if="notificationAllowed"
        class="green--text"
      >
        Nofitications: On
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn
        outlined
        text
        color="green"
        @click.native="subscribeForNotifications()"
        v-else-if="notificationPermission === 'default'"
        class="grey--text"
      >
        Nofitications: Need permission
        <v-icon>notifications_off</v-icon>
      </v-btn>
      <v-btn
        outlined
        text
        color="green"
        @click.native="subscribeForNotifications()"
        v-else-if="notificationPermission === 'denied'"
        class="grey--text"
      >
        Nofitications: Denied
        <v-icon>notifications_off</v-icon>
      </v-btn>
      <v-btn
        outlined
        text
        color="green"
        @click.native="subscribeForNotifications()"
        v-else
        class="red--text"
      >
        Nofitications: Off
        <v-icon>notifications_none</v-icon>
      </v-btn>
    </v-layout>
  </div>
</template>

<script>
import { firebaseMessaging } from "../../firebaseMessaging";
import { serviceWorkerRegistration } from "../../swRegistration";

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
      this.notificationPermission = Notification.permission;
      await serviceWorkerRegistration;
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
      firebaseMessaging.onTokenRefresh(() => this.getToken());
    },
    async getToken() {
      try {
        const token = await firebaseMessaging.getToken();
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
        await firebaseMessaging.requestPermission();
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

export default {
  name: 'timer-notification',
  props: {
    timerWorker: {
      type: Worker,
    },
  },
  data() {
    return {
      notificationPermission: Notification.permission,
      notificationAllowed: null,
      worker: this.timerWorker,
    };
  },
  mounted() {
    window.firebaseMessaging.useServiceWorker(window.swRegistration);
    window
      .firebaseMessaging
      .getToken()
      .then((currentToken) => {
        if (currentToken) {
          this.sendTokenToWorker(currentToken);
          this.notificationAllowed = this.getCachedOverride();
        } else {
          this.notificationAllowed = false;
        }
      })
      .catch(() => {
        this.notificationAllowed = false;
      })
      .then(() => {
        this.$emit('notification-state', this.notificationAllowed);
      });

    window
      .firebaseMessaging
      .onTokenRefresh(() => {
        window
          .firebaseMessaging
          .getToken()
          .then((refreshedToken) => {
            if (refreshedToken) {
              this.sendTokenToWorker(refreshedToken);
              this.notificationAllowed = this.getCachedOverride();
            } else {
              this.notificationAllowed = false;
            }
          })
          .catch(() => {
            this.notificationAllowed = false;
          })
          .then(() => {
            this.$emit('notification-state', this.notificationAllowed);
          });
      });
  },
  methods: {
    sendTokenToWorker(token) {
      this.worker.postMessage({ setNotificationToken: true, notificationToken: token });
    },
    subscribeForNotifications() {
      window
        .firebaseMessaging
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
      return localStorage.getItem('notification-override') === 'true';
    },
    setCachedOverride(notificationOverride) {
      localStorage.setItem('notification-override', notificationOverride);
      this.$emit('notification-state', notificationOverride);
    },
  },
};

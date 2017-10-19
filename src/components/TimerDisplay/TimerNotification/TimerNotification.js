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
    if (window.swRegistration) {
      this.setupTokens();
    } else {
      document.addEventListener('serviceWorkerRegistered', () => {
        this.setupTokens();
      });
    }
  },
  methods: {
    setupTokens() {
      window
        .firebaseMessaging
        .getToken()
        .then(this.onTokenReceived)
        .catch(this.notificationNotAllowed)
        .then(this.fireEventWithNotificationState);
      window
        .firebaseMessaging
        .onTokenRefresh(() => {
          window
            .firebaseMessaging
            .getToken()
            .then(this.onTokenReceived)
            .catch(this.notificationNotAllowed)
            .then(this.fireEventWithNotificationState);
        });
    },
    onTokenReceived(currentToken) {
      if (currentToken) {
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
        notificationToken: token,
      });
    },
    fireEventWithNotificationState() {
      this.$emit('notification-state', this.getCachedOverride());
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
      this.fireEventWithNotificationState();
    },
  },
};

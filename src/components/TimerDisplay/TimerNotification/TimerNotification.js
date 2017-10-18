export default {
  name: 'timer-notification',
  data() {
    return {
      notificationPermission: Notification.permission,
      notificationAllowed: null,
    };
  },
  mounted() {
    this.notificationAllowed = Notification.permission === 'granted' && this.getCachedOverride();
    this.$emit('notification-state', this.notificationAllowed);
  },
  methods: {
    subscribeForNotifications() {
      Notification.requestPermission((permission) => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          this.notificationAllowed = !this.notificationAllowed;
          this.setCachedOverride(this.notificationAllowed);
        } else {
          this.setCachedOverride(false);
        }
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

webpackHotUpdate(5,{

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony default export */ __webpack_exports__[\"a\"] = ({\n  name: 'timer-notification',\n  data: function data() {\n    return {\n      notificationPermission: Notification.permission,\n      notificationAllowed: null\n    };\n  },\n  mounted: function mounted() {\n    this.notificationAllowed = Notification.permission;\n  },\n\n  methods: {\n    subscribeForNotifications: function subscribeForNotifications() {\n      var _this = this;\n\n      Notification.requestPermission(function (permission) {\n        // If the user accepts, let's create a notification\n        if (permission === 'granted') {\n          _this.notificationAllowed = !_this.notificationAllowed;\n          _this.setCachedOverride(_this.notificationAllowed);\n        } else {\n          _this.setCachedOverride(false);\n        }\n      });\n    },\n    getCachedOverride: function getCachedOverride() {\n      return localStorage.getItem('notification-override') === 'true';\n    },\n    setCachedOverride: function setCachedOverride(notificationOverride) {\n      localStorage.setItem('notification-override', notificationOverride);\n      this.$emit('notification-state', notificationOverride);\n    }\n  }\n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDEuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvVGltZXJEaXNwbGF5L1RpbWVyTm90aWZpY2F0aW9uL1RpbWVyTm90aWZpY2F0aW9uLmpzPzI5NTkiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndGltZXItbm90aWZpY2F0aW9uJyxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbm90aWZpY2F0aW9uUGVybWlzc2lvbjogTm90aWZpY2F0aW9uLnBlcm1pc3Npb24sXG4gICAgICBub3RpZmljYXRpb25BbGxvd2VkOiBudWxsLFxuICAgIH07XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5ub3RpZmljYXRpb25BbGxvd2VkID0gTm90aWZpY2F0aW9uLnBlcm1pc3Npb247XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBzdWJzY3JpYmVGb3JOb3RpZmljYXRpb25zKCkge1xuICAgICAgTm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKChwZXJtaXNzaW9uKSA9PiB7XG4gICAgICAgIC8vIElmIHRoZSB1c2VyIGFjY2VwdHMsIGxldCdzIGNyZWF0ZSBhIG5vdGlmaWNhdGlvblxuICAgICAgICBpZiAocGVybWlzc2lvbiA9PT0gJ2dyYW50ZWQnKSB7XG4gICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25BbGxvd2VkID0gIXRoaXMubm90aWZpY2F0aW9uQWxsb3dlZDtcbiAgICAgICAgICB0aGlzLnNldENhY2hlZE92ZXJyaWRlKHRoaXMubm90aWZpY2F0aW9uQWxsb3dlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRDYWNoZWRPdmVycmlkZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0Q2FjaGVkT3ZlcnJpZGUoKSB7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25vdGlmaWNhdGlvbi1vdmVycmlkZScpID09PSAndHJ1ZSc7XG4gICAgfSxcbiAgICBzZXRDYWNoZWRPdmVycmlkZShub3RpZmljYXRpb25PdmVycmlkZSkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25vdGlmaWNhdGlvbi1vdmVycmlkZScsIG5vdGlmaWNhdGlvbk92ZXJyaWRlKTtcbiAgICAgIHRoaXMuJGVtaXQoJ25vdGlmaWNhdGlvbi1zdGF0ZScsIG5vdGlmaWNhdGlvbk92ZXJyaWRlKTtcbiAgICB9LFxuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9UaW1lckRpc3BsYXkvVGltZXJOb3RpZmljYXRpb24vVGltZXJOb3RpZmljYXRpb24uanMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWxCQTtBQVhBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///41\n");

/***/ })

})
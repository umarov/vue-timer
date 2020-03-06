<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="green" dark>
        <v-btn icon v-show="showBackButton" dark @click="goBack">
          <v-icon>arrow_back</v-icon>
        </v-btn>

        <v-toolbar-title>Timer</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>

      <v-content fluid class="pa-2 mt-12">
        <transition
          :duration="90"
          mode="out-in"
          :enter-active-class="enterClasses"
          :leave-active-class="leaveClasses"
        >
          <router-view />
        </transition>
      </v-content>

      <v-bottom-navigation
        v-show="showBottomBar"
        absolute
        :value="true"
        v-model="activeTab"
        color="transparent"
      >
        <v-btn text color="teal" value="home" @click="navigate('/')">
          <span>Home</span>
          <v-icon>home</v-icon>
        </v-btn>
        <v-btn text color="teal" value="timer" @click="navigate('/timer')">
          <span>Timer</span>
          <v-icon>timelapse</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeTab: "",
      showBackButton: false,
      showBottomBar: false,
      enterTransitionName: "",
      leaveTransitionName: ""
    };
  },
  computed: {
    enterClasses() {
      return `animated ${this.enterTransitionName}`;
    },
    leaveClasses() {
      return `animated ${this.leaveTransitionName}`;
    }
  },
  watch: {
    $route(to) {
      const { showBackButton, showBottomBar } = to.meta;
      this.showBackButton = showBackButton;
      this.showBottomBar = showBottomBar;
      this.activeTab = to.name;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    navigate(state) {
      this.enterTransitionName =
        state === "/timer" ? "slideInRight" : "slideInLeft";
      this.leaveTransitionName =
        state === "/" ? "slideOutRight" : "slideOutLeft";

      this.$router.push(state);
    }
  }
};
</script>

<style lang="scss">
body {
  overflow-x: hidden;
  overflow-y: hidden;
  font-family: "Roboto", monospace;
  color: #2c3e50;
}

v-tabs-item {
  color: white;
}

.bottom-tabs {
  position: fixed;
  bottom: 0;
}

.animated {
  animation-duration: 299ms;
  will-change: transform;
}
</style>

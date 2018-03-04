<template>
  <div id="app">
    <v-toolbar class="green" dark>
      <v-btn icon dark v-show="showBackButton" @click="goBack">
        <v-icon color="white">arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Code Shop Timer</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content fluid class="pa-2">
      <router-view></router-view>
    </v-content>

    <v-tabs v-show="showBottomBar" class="bottom-tabs" v-model="activeTab" light fixed icons centered>
      <v-tabs-bar class="green">
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tabs-item key="home" href="home" @click="navigate('/')">
          <v-icon color="white">home</v-icon>
          <span class="white--text">Home</span>
        </v-tabs-item>
        <v-tabs-item key="timer" href="timer" @click="navigate('/timer')">
          <v-icon color="white">timelapse </v-icon>
          <span class="white--text">Set Timer</span>
        </v-tabs-item>
      </v-tabs-bar>
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      activeTab: "",
      showBackButton: false,
      showBottomBar: false
    };
  },
  watch: {
    $route(route) {
      const { showBackButton, showBottomBar } = route.meta;
      this.showBackButton = showBackButton;
      this.showBottomBar = showBottomBar;
      this.activeTab = route.name;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    navigate(state) {
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

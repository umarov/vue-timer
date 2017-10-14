<template>
  <div id="app">
    <v-toolbar class="green" dark>
      <v-toolbar-title class="white--text">Code Shop Timer</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <div class="app-content">
      <router-view></router-view>
    </div>

    <v-tabs class="bottom-tabs" light fixed icons centered>
      <v-tabs-bar class="green">
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tabs-item href="#tab-1">
          <v-icon color="white">home</v-icon>
          <span class="white--text">Home</span>
        </v-tabs-item>
        <v-tabs-item href="#tab-1">
          <v-icon color="white">timelapse</v-icon>
          <span class="white--text">Set Timer</span>
        </v-tabs-item>
        <v-tabs-item href="#tab-1">
          <v-icon color="white">timer</v-icon>
          <span class="white--text">Timer</span>
        </v-tabs-item>
      </v-tabs-bar>
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss" scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}

#app {
  height: 100vh;
  width: 100vw;
}

v-tabs-item {
  color: white;
}

.bottom-tabs {
  position: fixed;
  bottom: 0;
}

.app-content {
  font-family: 'Roboto', monospace;
  color: #2c3e50;
}
</style>

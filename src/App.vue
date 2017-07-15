<template>
  <div id="app">
    <v-toolbar dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Code Shop Timer</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
.app-content {
  font-family: 'Roboto Mono', monospace;
  color: #2c3e50;
}
</style>

<template>
  <div>
    <h4>Welcome to Timer Home</h4>
    <p>This allows you to set timers and be notified when they are finished</p>
    <p>The timer runs in a Web Worker in the background and sends a notification once it's done</p>
    <p>This will also work offline using Service Workers</p>
  </div>
</template>
<script>
export default {
  name: "TimerHome"
};
</script>

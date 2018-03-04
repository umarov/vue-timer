module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "src/sw.js",
      swDest: "sw.js"
      // ...other Workbox options...
    }
  }
};

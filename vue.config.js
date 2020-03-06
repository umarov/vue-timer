module.exports = {
  pwa: {
    name: "Code Shop Timer",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/sw.js",
      importScripts: [
        "https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js",
        "https://www.gstatic.com/firebasejs/7.9.3/firebase-messaging.js"
      ]
    }
  },
  publicPath:
    process.env.NODE_ENV === "production"
      ? "https://umarov.dev/code-shop-timer/"
      : "/"
};

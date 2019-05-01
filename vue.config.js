module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/code-shop-timer/'
    : '/',
  pwa: {
    name: "Code Shop Timer",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/sw.js",
      swDest: "sw.js",
      precacheManifestFilename: "wb-manifest.[manifestHash].js"
    }
  },
};

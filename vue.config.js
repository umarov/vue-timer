module.exports = {
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/sw.js",
      swDest: "sw.js"
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      return {
        output: {
          publicPath: "https://umarov.github.io/code-shop-timer"
        }
      };
    } else {
      return {};
    }
  }
};

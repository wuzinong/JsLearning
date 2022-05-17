const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.externals(["vue", "vue-router"]);
  },
  configureWebpack: {
    output: {
      libraryTarget: "system",
    },
  },
});

const singleSpaDefaults = require("webpack-config-single-spa");
const { merge } = require("webpack-merge");
module.exports = () => {
  const defaultConfig = singleSpaDefaults({
    orgName: "study",
    projectName: "bran",
  });
  return merge(defaultConfig, {
    devServer: {
      port: 9001,
    },
  });
};

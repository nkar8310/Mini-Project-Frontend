const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "MiniProject",
    projectName: "MiniProjectFE",
    webpackConfigEnv,
    argv,
  });

  // Define SCSS rule
  const scssRule = {
    test: /\.scss$/,
    use: [
      'style-loader', // Injects styles into the DOM
      'css-loader',   // Translates CSS into CommonJS
      'sass-loader'   // Compiles Sass to CSS
    ],
  };

  // Add the SCSS rule to the existing rules
  defaultConfig.module.rules.push(scssRule);

  return defaultConfig;
};

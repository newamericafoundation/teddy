const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.

  // For example, add typescript loader:
  defaultConfig.module.rules.push({
    test: /\.s?css/,
    include: path.resolve(__dirname, "../src"),
    use: ["style-loader", "css-loader", "sass-loader"]
  });

  return defaultConfig;
};

var path = require('path');

module.exports = {
  entry: "./src/time-slots-calculator.js",
  output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "js/open-hours-calc.js"
  },
  module: {
      rules: [
          {
              test: /\.js?$/,
              loader: "babel-loader",
              exclude: /node_modules/,
              options: {
                  presets: ["@babel/preset-env"]
              }
          }
      ]
  }
};
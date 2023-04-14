const path = require('path');
const { createReactAppWebpack } = require('react-app-rewired');

function overrideWebpack(config, env) {
    config.resolve.fallback = {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify")
    };
    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
          fullySpecified: false
      }
    });
    config.experiments = {
      topLevelAwait: true,
    };
    return config;
  }
  
  module.exports = {
    webpack: overrideWebpack,
  };
  
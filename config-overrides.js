const { override, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser.js', // यहाँ `.js` एक्सटेंशन जोड़ें
    })
  ),
  (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
      process: require.resolve('process/browser.js'), // यहाँ `.js` एक्सटेंशन जोड़ें
    };
    return config;
  }
);
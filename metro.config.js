const crypto = require.resolve("crypto-browserify");
const url = require.resolve("url/");
module.exports = {
  resolver: {
    extraNodeModules: {
      crypto,
      url,
      axios: require.resolve("axios"),
      fs: require.resolve("expo-file-system"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      net: require.resolve("react-native-tcp"),
      os: require.resolve("os-browserify/browser.js"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("readable-stream"),
      vm: require.resolve("vm-browserify"),
      "form-data": require.resolve("form-data"),
    },
  },
};

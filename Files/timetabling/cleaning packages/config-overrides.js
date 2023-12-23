module.exports = function override(config, env) {
  console.log("override");
  let loaders = config.resolve;
  loaders.fallback = {
    fs: false,
    tls: false,
    net: false,
    // http: require.resolve("stream-http"),
    https: false,
    // zlib: require.resolve("browserify-zlib"),
    // path: require.resolve("path-browserify"),
    // url: false, // Adicione esta linha
    // url: require.resolve("url/"), // Adicione esta linha
    // timers: require.resolve("timers-browserify"),
    // stream: require.resolve("stream-browserify"),
    // util: require.resolve("util/"),
    // crypto: require.resolve("crypto-browserify"),
  };

  return config;
};

module.exports = {
  reactStrictMode: true,
  fs: false,
  webpack: (config) => {
    config.experiments = {topLevelAwait: true};
    return config;
  },
};

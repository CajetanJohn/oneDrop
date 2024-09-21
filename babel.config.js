module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      ['@babel/plugin-proposal-decorators', { "legacy": true }],
      ['module:react-native-dotenv', {
        "moduleName": "@env", // Optional, but allows you to use '@env' as a module
        "path": ".env", // Specify the path to your .env file
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": true,
      }],
    ],
  };
};

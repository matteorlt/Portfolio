// Configuration webpack pour résoudre les conflits
const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": false,
      "crypto": false
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      THREE: 'three'
    })
  ]
}; 
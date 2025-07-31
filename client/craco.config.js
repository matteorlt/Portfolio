const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          "path": require.resolve("path-browserify"),
          "fs": false,
          "crypto": false
        }
      }
    },
    plugins: {
      add: [
        new webpack.ProvidePlugin({
          THREE: 'three'
        })
      ]
    }
  }
}; 
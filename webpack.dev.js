const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/user.html' },
        { from: /^\/admin/, to: '/admin.html' },
      ],
    },
    port: 9000,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
    compress: true,
  },
});

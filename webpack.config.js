import webpack from 'webpack';
import pkg from './package.json';
var pkgName = pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1);
var banner = `/*!
 * ${pkgName} v${pkg.version}
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author} (${pkg.homepage})
 * @license MIT
 */`;

module.exports = {
  output: {
    library: pkgName,
    libraryExport: 'default',
    libraryTarget: 'umd',
    filename: `${pkg.name}.js`
  },
  externals: {
    jquery: 'jQuery'
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            compact: false
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({ banner, raw: true })
  ]
};

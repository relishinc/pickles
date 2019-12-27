import webpack from 'webpack';
import pkg from './package.json';
var banner = `
   ${pkg.name} - ${pkg.description}
   Author: ${pkg.author}
   Version: v${pkg.version}
   Url: ${pkg.homepage}
`;

module.exports = {
  output: {
    library: pkg.name,
    libraryExport: 'default',
    libraryTarget: 'umd',
    filename: `${pkg.name}.js`
  },
  externals: {
    jquery: 'jQuery'
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
     new webpack.BannerPlugin( banner )
  ]  
};

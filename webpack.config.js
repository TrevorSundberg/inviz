// MIT Licensed by Trevor Sundberg
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const path = require('path');
const version = '1.0.0';

function createModule(name) {
  return {
    mode: 'production',
    entry: {
      main: `./index-${name}.js`,
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `inviz-${name}-${version}.js`
    },
    module: {
      rules: [
        {
          test: /\.render\.js$/,
          use: ['file-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'inviz',
        template: 'index.htm',
        filename: `./inviz-${name}-${version}.htm`,
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
      }),
      new SriPlugin({
        hashFuncNames: ['sha512'],
      }),
    ]
  };
}

module.exports = [createModule('lite'), createModule('full')];

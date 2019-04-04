// MIT Licensed by Trevor Sundberg
const path = require('path');
const version = '1.0.0';

module.exports = {
  mode: 'production',
  entry: {
    lite: './index-lite.js',
    full: './index-full.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `inviz-[name]-${version}.js`
  },
  module: {
    rules: [
      {
        test: /\.render\.js$/,
        use: ['file-loader']
      }
    ]
  }
};

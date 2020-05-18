const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: "production",
  target: "node",
  output: {
    filename: 'index.cjs', 
    path: path.resolve(__dirname, 'dist'),
  },
};

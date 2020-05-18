const path = require('path');
const nodeExternals = require('webpack-node-externals');

const baseConfig = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: 'babel-loader' },
        ]
      }
    ]
  },
  entry: './src/index.ts',
  target: "node",

}
const prodConfig  = {
  mode: "production",
  target: "node",
  output: {
    filename: 'index.cjs', 
    path: path.resolve(__dirname, 'dist'),
  }  
}

const devConfig  = {

  externals: [nodeExternals()],
  mode : 'development',

  devtool: 'inline-cheap-source-map',

  externals: [nodeExternals()], 
  output: {
    filename: 'index.js', 
    path: path.resolve(__dirname, 'lib'),
  }
  
}


module.exports  = (env, argv) => {
  console.log(env, argv)
  config = env.production ? {...baseConfig, ...prodConfig} : {...baseConfig, ...devConfig};
  return config;
}
 
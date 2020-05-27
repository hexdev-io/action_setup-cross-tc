const path = require('path');
 

const baseConfig = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: 'babel-loader' ,
          options: {
            presets: [
              ['@babel/preset-env', {targets: {node: 'current'}}],
              '@babel/preset-typescript',
            ] 
          }
        },
        ]
      }
    ]
  },
  entry: './src/index.ts',
  target: "node",

}
const prodConfig  = {
  mode: "production",
  output: {
    filename: 'index.cjs', 
    path: path.resolve(__dirname, 'dist'),
  }  
}

// We just copy paste this shiz for now 
const staticDeps = Object.keys({  
    "@actions/core": "^1.2.4",
"@actions/tool-cache": "^1.5.5",
"@yarnpkg/pnpify": "^2.0.0-rc.22",
"node-color-log": "^3.0.2",
"tree-node-cli": "^1.3.0"
})

const nodeExternalPnpFilter = ( {context, request }, callback) => {
  const isPnPModule= /(\.yarn\/unplugged\/)/;
  const isGlobalPnPModule = /(yarn-global\/cache\/)/

  // There is no way to query the module type. but we are building down to commonjs anyway
  const importType="commonjs"
 
  if (context.match( isPnPModule) || context.match(isGlobalPnPModule) ){
    return callback(null, `${importType} ${request}`);
  }
   callback();
}

const devConfig  = {
  mode : 'development',

  devtool: 'inline-cheap-source-map',

  externals: [ ...staticDeps, nodeExternalPnpFilter],

  output: {
    filename: 'index.js', 
    path: path.resolve(__dirname, 'lib'),
  }
  
}


module.exports  = (...args) => {
 
 // env.production ? {...baseConfig, ...prodConfig} :
  config =  {...baseConfig, ...devConfig};
  return config;
}
 
module.exports = {
  module: {
    loaders: [
      {
        test: /\.vue$/, // regex all files ending in `.vue`
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        presets: ['es2015', 'stage-0']
      },
    ]
  },
  // vue-loader config
  vue: {
    autoprefixer: {
      browsers: ['last 3 version']
    }
  },
  entry: {
    app: ['./src/js/main.js']
  },
  output: {
    filename: 'bundle.js',
    path: '/build/js'
  }
};

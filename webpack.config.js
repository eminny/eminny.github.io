var path = require('path');
var webpack = require('webpack');

module.exports = function (env) {

    var webpackConfig = {
        context: 'src/js',
        externals: {},
        plugins: [],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    presets: ['es2015', 'stage-1']
                },
                {
                    test: /\.vue$/,
                    loader: 'vue',
                    presets: ['es2015', 'stage-1']
                }
            ]
        },
        // vue-loader configurations
        vue: {
            autoprefixer: {
                browsers: ['last 3 version']
            }
        },
        entry: {
            app: ['./src/js/app.js']
        },
        output: {
            path: path.join(__dirname, "dist"),
            publicPath: "build/",
            filename: "[name].js",
            chunkFilename: "[chunkhash].js"
        },
    };

    if (env === 'production') {
        webpackConfig.plugins.push(
            new webpackManifest(publicPath, config.root.dest),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.NoErrorsPlugin()
        )
    }

    return webpackConfig;
}

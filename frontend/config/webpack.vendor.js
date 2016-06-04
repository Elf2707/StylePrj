var webpack = require('webpack');
var helpers = require('../app/shared/helpers');

module.exports = {
    entry: {
        'polyfills': './frontend/app/shared/polyfills.ts',
        'vendor': './frontend/app/shared/vendor.ts',
    },

    resolve: {
        extensions: ['', '.js', '.ts']
    },

    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('public/js'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=../assets/[name].[hash].[ext]'
            },
            //Bootstrap
            {test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},
            {test: /\.(woff|woff2)$/, loader: "url-loader?name=../assets/[name].[hash].[ext]'&limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf$/, loader: 'file?name=../assets/[name].[hash].[ext]'},
            {test: /\.eot$/, loader: 'file?name=../assets/[name].[hash].[ext]'},
            {test: /\.svg$/, loader: 'file?name=../assets/[name].[hash].[ext]'}
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'polyfills']
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
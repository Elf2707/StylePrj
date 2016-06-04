var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('../app/shared/helpers');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        'polyfills': './frontend/app/shared/polyfills.ts',
        'vendor': './frontend/app/shared/vendor.ts',
        'app': './frontend/app/main.ts'
    },

    resolve: {
        extensions: ['', '.js', '.ts']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=../assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                include: helpers.root('app'),
                loader: 'postcss!raw'
            },
            //Bootstrap
            {test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},
            {test: /\.(woff|woff2)$/, loader: "url-loader?name=../assets/[name].[hash].[ext]'&limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf$/, loader: 'file?name=../assets/[name].[hash].[ext]'},
            {test: /\.eot$/, loader: 'file?name=../assets/[name].[hash].[ext]'},
            {test: /\.svg$/, loader: 'file?name=../assets/[name].[hash].[ext]'}
        ]
    },

    postcss: function () {
        return [precss, autoprefixer({browsers: ['last 2 versions']})]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            filename: '/../../index.html',
            template: 'frontend/public/htmltemplate/index.html'
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
var webpack             = require('webpack');
var path                = require('path');
var ExtractTextPlugin   = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin   = require("html-webpack-plugin");

// 环境变量, dev, (test), online
var WEBPACK_ENV            = process.env.WEBPACK_ENV || 'dev';

//webpack config
var config = {
    devServer: {
        host: 'localhost.charlesproxy.com',
    },
    entry: {
        'app'                     : ['./src/index.jsx']
    },
    output: {
        path       : __dirname + '/dist/',         //文件存放的位置
        publicPath : WEBPACK_ENV === 'online' ? '//static.iyqrj.com/star-mall-bk/dist/' : '/dist/',
        filename   : 'js/[name].js'
    },
    resolve: {
        alias: {
            node_modules        : path.join(__dirname, '/node_modules'),
            util                : path.join(__dirname, '/src/util'),
            component           : path.join(__dirname, '/src/component'),
            service             : path.join(__dirname, '/src/service'),
            page                : path.join(__dirname, '/src/page'),
            images              : path.join(__dirname, '/src/images')
        }
    },
    module : {
        loaders : [
            {test: /\.css$/, loader: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback : 'style-loader'
            })},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract({
                use: 'css-loader!sass-loader',
                fallback : 'style-loader'
            })},
            {test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=10000&name=resource/[name].[ext]'},
            {test: /\.(string)$/, loader: 'html-loader' },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    plugins : [
        // 提出公共部分
        new webpack.optimize.CommonsChunkPlugin({
            name        : 'common',
            filename    : 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
        new HtmlWebpackPlugin({
            filename        : 'view/index.html',
            title           : '后台管理系统',
            favicon         : 'favicon.ico',
            template        : './src/index.html',
            inject          : true,
            hash            : true,
            chunks          : ['common','app'],
            chunksSortMode  : 'dependency',
            minify          : {
                removeComments: true,
                collapseWhitespace: false
            }
        })
    ]
};

module.exports = config;
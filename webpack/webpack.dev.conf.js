/**
 * Created by DELL on 2017/6/2.
 */
var webpack = require('webpack')
var config = require('./config')
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
// var pathToVue = path.resolve(node_modules, 'vue/dist/vue.js');
// var HtmlWebpackPlugin = require('html-webpack-plugin');//生成html文件
module.exports={
    entry: {  //入口
        app: './src/main.js'
    },
    output: {
        path:  '/dist',//发布目录
        publicPath: '/', //热加载目录
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.vue'],  //自动解析扩展名
        alias: { //别名
            'vue-router': 'vue-router/dist/vue-router.js',
            'vue$': 'vue/dist/vue.common.js',
            // 'assets': path.resolve(__dirname, '../src/assets'),
            // 'components': path.resolve(__dirname, '../src/components'),
            // 'vux-components': 'vux/src/components'
        }
    },
    module: {
        rules:[
            {test: /\.vue$/, loader: 'vue-loader'},
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader',query: {presets: ['es2015','stage-0']}},
            {test: /\.(css|scss)/, loader: "style-loader!css-loader?modules=true!postcss-loader!sass-loader"},
            // {test: /\.css$/, loader: 'style-loader!css-loader'},
            // {test: /\.(css|scss)$/, loader: {use:[
            //     { loader: 'css-loader', options:{modules:true, importLoaders:1, localIdentName:'[local]_[hash:base64:5]', sourceMap: true,},},
            //     {loader: 'postcss-loader',}, {loader:'sass-loader',},], fallbackLoader: 'style-loader',}},
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
        ]
    },
    devtool: '#source-map',//sass
    plugins:[]
}
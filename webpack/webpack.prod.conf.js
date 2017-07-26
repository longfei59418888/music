/**
 * Created by DELL on 2017/6/2.
 */
var webpack = require('webpack')
var config = require('./config')
var path = require('path');
var fs = require('fs');


//用于提取公共文件
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToVue = path.resolve(node_modules, 'vue/dist/vue.js');
var pathToVueX = path.resolve(node_modules, 'vuex/dist/vuex.js');
var CleanWebpackPlugin = require('clean-webpack-plugin'); // 删除文件
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css提取
var HtmlWebpackPlugin = require('html-webpack-plugin');//生成html文件

module.exports={
    entry: {  //入口
        app: './src/main.js',
        //添加要打包在vendors.js里面的库，将公共文件合并为一个
        vendors:['vue','vuex','vue-router','axios','vue-scroller']
    },
    output: {
        path: config.dist,//发布目录
        //以文件内容的MD5生成Hash名称的script来防止缓存
        filename:'js/[name].[chunkhash].js',
        //异步加载的模块是要以文件形式加载，生成的文件名是以chunkFilename配置的
        // chunkFilename: 'js/[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],  //自动解析扩展名
        alias: { //别名
            //用于公共文件提取
            'vue$': 'vue/dist/vue.common.js',
            'vue-router': 'vue-router/dist/vue-router.js',
            'vuex.js': pathToVueX
            // 'src': path.resolve(__dirname, '../src'),
            // 'assets': path.resolve(__dirname, '../src/assets'),
            // 'components': path.resolve(__dirname, '../src/components'),
            // 'vux-components': 'vux/src/components'
        }
    },
    module: {
        loaders: [
            {test: /\.vue$/, loader: 'vue-loader'},
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader',query: {presets: ['es2015','stage-0']}},
            // {test: /\.css$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })},
            {test: /\.(css|scss)$/, loader: ExtractTextPlugin.extract({use:[
                    { loader: 'css-loader', options:{modules:true},},
                    {loader: 'postcss-loader',}, {loader:'sass-loader',},], fallbackLoader: 'style-loader',})},
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192&name=./image/[hash].[ext]'}
        ],
    },

    //devtool: '#source-map',//sass
    plugins:[
        //提取公共代码的插件，用于提取多个入口文件的公共脚本部分，然后生成一个vendors.js。注意HTML代码中要加载这个公共文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'js/vendors.js'
        }),
        new CleanWebpackPlugin(['js','css'], {  //目录下文件
            root: config.dist,  //目录
            verbose: true,
            dry: false,
        }),
        //在文件开头插入banner
        new webpack.BannerPlugin("The file is creted by yangmin.--"+ new Date()),
        //压缩js文件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({  //全局变量,在全局可以用
            'APP_NAME': 'name',
            'SERVER_URL':'192.168.0.1'
        }),
        /*插件：单独使用style标签加载css文件.contenthash代表的是文本文件内容的hash值，也就是只有style文件的hash值*/
        new ExtractTextPlugin({
            filename: 'css/main.[chunkhash].css',
            allChunks: true
        }),
        /*插件：动态生成html，在webpack完成前端资源打包以后，自动将打包后的资源路径和版本号写入HTML中，达到自动化的效果。*/
        new HtmlWebpackPlugin({  //生成html文件
            title:'title',   //标题
            filename:path.resolve(config.dist, 'index.html'),   //指定html生成目录
            template:'webpack/index.html',   //html模板
            inject: true,
            chunks:['vendors','app'],//加载指定模块中的文件，否则页面会加载所有文件
            hash:false,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:false,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            },
        })
    ]
}

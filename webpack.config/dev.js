const path = require('path')
const root = path.resolve(__dirname, '..')

var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const baseConfig = require('./base')

//合并两个配置项
module.exports = merge(baseConfig, {
    entry: [
        'webpack/hot/dev-server', // 热替换处理入口文件
        path.join(root, 'src/main.js')
    ],
    devServer: {
        /* 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。
         devServer.historyApiFallback 默认禁用*/
        historyApiFallback: true,
        /*一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台*/
        inline: true,
        /*显示编译进度*/
        progress: true,
        /*服务器监听端口*/
        port: 3000,
    },

    /* 选择一种 source map 格式来增强调试过程
    参照https://webpack.docschina.org/configuration/devtool/#src/components/Sidebar/Sidebar.jsx*/
    devtool: 'source-map',

    /*添加热替换插件*/
    plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(root, 'index.html'), // 模板文件
            inject: 'body' // js的script注入到body底部
        })
    ]
})

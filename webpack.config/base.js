const path = require('path')
const root = path.resolve(__dirname, '..')

module.exports = {
    //入口,join:将路径A,B连接成A/B,并返回地址
    entry: path.join(root, 'src/main.js'),

    //出口
    output: {
        path: path.join(root, 'dist'),
        filename: 'main.js'
    },

    //配置模块如何解析
    resolve: {

        //配置路径别名
        alias: {
            components: path.join(root, 'src/components'),
            views: path.join(root, 'src/views'),
            styles: path.join(root, 'src/styles'),
            store: path.join(root, 'src/store')
        },

        //自动解析确定的拓展,默认值为：['.wasm', '.mjs', '.js', '.json']
        extensions: ['.js', '.vue']

        //告诉 webpack 解析模块时应该搜索的目录
        // modules: [path.join(root, 'node_modules')]
    },
    // 这组选项与上面的 resolve 对象的属性集合相同，但仅用于解析 webpack 的 loader 包
    resolveLoader: {
        modules: [path.join(root, 'node_modules')]
    },
    module: {
        //配置模块的loader
        rules: [
            {test: /\.vue$/, loader: 'vue-loader'}, // 所有.vue结尾的文件，使用vue-loader
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
                loader: "file-loader"
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {test: /\.js$/, loader: "babel-loader", exclude: /node_modules/} // .js文件使用babel-loader，切记排除node_modules目录
        ]
    }

}
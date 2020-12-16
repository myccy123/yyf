const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
//引入webpack库
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: isProduction ? '/static/vue_vision' : '/',
    configureWebpack: config => {
        if (isProduction) {
            config.plugins.push(new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,  //10 Kb
                    minRatio: 0.8
                })
            )

        }
    },
    runtimeCompiler: true,
    pages: {
        pc: {
            entry: 'src/framework/pc/p_login.js',
            template: 'public/p_login.html',
            filename: 'p_login.html'
        },
        mobile: {
            entry: 'src/framework/mobile/m_login.js',
            template: 'public/m_login.html',
            filename: 'm_login.html',
        }
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
    mode:'development',
    entry:{
        "test":'./src/index.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].bundle.js'
    },
    devtool:'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({template: './index.html'})
    ],
    devServer:{
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
}

module.exports = config;


const path = require('path');
const webpack = require('webpack');
module.exports={
    mode:"development",
    entry:{
        app:'./src/test1.js',
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js',
        publicPath:'/'
    },
    plugins:[
      new webpack.HotModuleReplacementPlugin()    
    ],
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 name: "commons",
    //                 chunks: "initial",
    //                 minChunks:2
    //             }
    //         }
    //     }
    // },
    devServer:{
        host:'127.0.0.1',
        inline:true,
        hot:true,
        port:9000,
        https:true,
        open:true
    }
}
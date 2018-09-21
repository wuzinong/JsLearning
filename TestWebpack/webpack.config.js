
const path = require('path');
const webpack = require('webpack');
module.exports={
    entry:{
        app:'./src/test1.js',
        adminApp:'./src/test2.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name]bundle.js'
    }
}
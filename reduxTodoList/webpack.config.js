var path = require('path');

module.exports = {
    entry:'./src/index.jsx',
    output:{
        path:path.join(__dirname,'/dist'),
        filename:'bundle.js'
    },
    resolve:{
        extensions:['.js','.jsx']
    },
    mode:'development',
    module:{
        rules:[
            {
                test:/\.js|jsx$/,
                loader:'babel-loader',
                query:{
                    presets:[ "@babel/preset-env","@babel/preset-react",]
                }
            }
        ]
    }
}
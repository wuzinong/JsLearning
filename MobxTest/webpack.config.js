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
                options:{
                    presets:[
                        "@babel/preset-env",
                        "@babel/preset-react",
                        {
                            plugins: [
                                [ "@babel/plugin-proposal-decorators", { "legacy": true } ],
                                '@babel/plugin-proposal-class-properties'
                              ]
                        }
                    ],
                   
                }
                // query:{
                //     plugins: [
                //           "@babel/plugin-proposal-class-properties",
                //           "@babel/plugin-proposal-decorators",
                //           {
                //             "legacy": true
                //           }
                //       ],
                //     presets:[ "@babel/preset-env","@babel/preset-react",]
                // }
            }
        ]
    }
}
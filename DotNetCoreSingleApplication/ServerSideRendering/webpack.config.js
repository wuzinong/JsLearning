
const path = require('path');

module.exports = {
    mode:"development",
    entry:{
        "main-server":"./ClientApp/boot-server.ts"
    },
    resolve:{
        extensions:[".js",".ts"]
    },
    module:{
        rules:[
            {test:/\.ts/,loader:"ts-loader"}
        ]
    },
    target:"node",
    devtool:"inline-source-map",
    output:{
        path:path.join(__dirname,"./ClientApp/dist"),
        filename:"[name].js",
        libraryTarget:"commonjs"
    }
}
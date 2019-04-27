const path = require('path');
const webpack = require('webpack');


module.exports = {
    mode: 'production',
    entry: {
        vendors: ['react', 'react-dom', 'react-router']
    },
    output: {
       //point out the file for generated dll
        path: path.resolve(__dirname, 'public/vendor'),
        // dll name
        filename: '[name].dll.js',
        // Global variable name, e.g for venders is vendors_dll_lib
        // This name should align with the name in DllPlugin 
        library: '[name]_dll_lib'
    },
    plugins: [
        new webpack.DllPlugin({
            // put them in public is because we'll clean wwwroot folder when trigger build
            path: path.join(__dirname, 'public', 'vendor', '[name].manifest.json'),
            // Global name for dll, should align with the name in output.library
            // The value of this is the value of the name attribute in manifest.json
            // e.g: vendors.manifest.json has the key:value stuff like "name": "vendors_dll_lib"
            name: '[name]_dll_lib'
        })
    ]
};
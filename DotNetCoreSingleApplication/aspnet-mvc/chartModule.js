
let generate = require('node-chartist');

module.exports = function(callback,type,options,data){

    generate(type,options,data).then(
        result => callback(null,result),
        error => callback(error)
    )
    // let message = "Hello from Node:" + new Date().toString();
    // callback(null,message);
}
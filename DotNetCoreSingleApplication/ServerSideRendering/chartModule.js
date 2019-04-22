module.exports = function(callback){
    let message = "Hello from node：" + new Date().toString();
    callback(null,message);
}
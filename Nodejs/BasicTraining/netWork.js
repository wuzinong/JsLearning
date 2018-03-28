
//使用NodeJS内置的http模块简单实现一个HTTP服务器。
// var http = require('http');
// http.createServer(function(request,response){
//     response.writeHead(200,{'Content-Type':'text-plain'});
//     response.end('Hello World\n');
// }).listen(8124);

// HTTP请求本质上是一个数据流，由请求头（headers）和请求体（body）组成。例如以下是一个完整的HTTP请求数据内容。

// POST / HTTP/1.1
// User-Agent: curl/7.26.0
// Host: localhost
// Accept: */*
// Content-Length: 11
// Content-Type: application/x-www-form-urlencoded

// Hello World

// 在回调函数中，除了可以使用response对象来写入响应头数据外，还能把response对象当作一个只写数据流来写入响应体数据。
// 例如在以下例子中，服务端原样将客户端请求的请求体数据返回给客户端。
http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text/plain'});
    request.on('data',function(chunk){
        response.write(chunk);
    });
    request.on('end',function(){
        response.end();
    })
}).listen(80);

//HTTPS
//https模块与http模块极为类似，区别在于https模块需要额外处理SSL证书。
var options = {
    key:fs.readFileSync('./ssl/default.key'),
    cert:fs.readFileSync('./ssl/default.cer')
}
var server = https.createServer(options,function(request,response){

})
// 可以看到，与创建HTTP服务器相比，多了一个options对象，通过key和cert字段指定了HTTPS服务器使用的私钥和公钥。
// 另外，NodeJS支持SNI技术，可以根据HTTPS客户端请求使用的域名动态使用不同的证书，
// 因此同一个HTTPS服务器可以使用多个域名提供服务。
// 接着上例，可以使用以下方法为HTTPS服务器添加多组证书。

// server.addContext('foo.com', {
//     key: fs.readFileSync('./ssl/foo.com.key'),
//     cert: fs.readFileSync('./ssl/foo.com.cer')
// });

// server.addContext('bar.com', {
//     key: fs.readFileSync('./ssl/bar.com.key'),
//     cert: fs.readFileSync('./ssl/bar.com.cer')
// });
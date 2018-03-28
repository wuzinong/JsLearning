//处理HTTP请求时url模块使用率超高，因为该模块允许解析URL、生成URL，以及拼接URL。
//首先我们来看看一个完整的URL的各组成部分。

//url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');
/* =>
{ protocol: 'http:',
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' }
*/

//传给.parse方法的不一定要是一个完整的URL，例如在HTTP服务器回调函数中，request.url不包含协议头和域名，
//但同样可以用.parse方法解析。
// http.createServer(function (request, response) {
//     var tmp = request.url; // => "/foo/bar?a=b"
//     url.parse(tmp);
//     /* =>
//     { protocol: null,
//       slashes: null,
//       auth: null,
//       host: null,
//       port: null,
//       hostname: null,
//       hash: null,
//       search: '?a=b',
//       query: 'a=b',
//       pathname: '/foo/bar',
//       path: '/foo/bar?a=b',
//       href: '/foo/bar?a=b' }
//     */
// }).listen(80);

// .parse方法还支持第二个和第三个布尔类型可选参数。第二个参数等于true时，该方法返回的URL对象中，
// query字段不再是一个字符串，而是一个经过querystring模块转换后的参数对象。第三个参数等于true时，
// 该方法可以正确解析不带协议头的URL，例如//www.example.com/foo/bar。
//反过来，format方法允许将一个URL对象转换为URL字符串，示例如下。
// url.format({
//     protocol: 'http:',
//     host: 'www.example.com',
//     pathname: '/p/a/t/h',
//     search: 'query=string'
// });
/* =>
'http://www.example.com/p/a/t/h?query=string'
*/
// 另外，.resolve方法可以用于拼接URL，示例如下。

url.resolve('http://www.example.com/foo/bar', '../baz');
/* =>
http://www.example.com/baz
*/


//Query String
//querystring模块用于实现URL参数字符串与参数对象的互相转换，示例如下。
//querystring.parse('foo=bar&baz=qux&baz=quux&corge');
/* =>
{ foo: 'bar', baz: ['qux', 'quux'], corge: '' }
*/

//querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
/* =>
'foo=bar&baz=qux&baz=quux&corge='
*/

//Zlib
// zlib模块提供了数据压缩和解压的功能。当我们处理HTTP请求和响应时，可能需要用到这个模块。
// 首先我们看一个使用zlib模块压缩HTTP响应体数据的例子。这个例子中，判断了客户端是否支持gzip，
// 并在支持的情况下使用zlib模块返回gzip之后的响应体数据。

// http.createServer(function(request,response){
//     var i = 1024,data='';
//     while(i--){
//         data+='.';
//     }
//     if((request.headers['accept-encoding']||'').indexOf('gzip')!==-1){
//         zlip.gzip(data,function(err,data){
//             response.writeHead(200,{
//                 'Content-Type':'text/plain',
//                 'Content-Encoding':'gzip'
//             });
//             response.end(data);
//         });
//     }else{
//         response.writeHead(200,{
//             'Content-Type':'text/plain'
//         });
//         response.end(data);
//     }
// }).listen(80);

// 接着我们看一个使用zlib模块解压HTTP响应体数据的例子。这个例子中，判断了服务端响应是否使用gzip压缩，
// 并在压缩的情况下使用zlib模块解压响应体数据。

// var options = {
//     hostname: 'www.example.com',
//     port: 80,
//     path: '/',
//     method: 'GET',
//     headers: {
//         'Accept-Encoding': 'gzip, deflate'
//     }
// };

// http.request(options, function (response) {
// var body = [];

// response.on('data', function (chunk) {
//     body.push(chunk);
// });

// response.on('end', function () {
//     body = Buffer.concat(body);

//     if (response.headers['content-encoding'] === 'gzip') {
//         zlib.gunzip(body, function (err, data) {
//             console.log(data.toString());
//         });
//     } else {
//         console.log(data.toString());
//     }
// });
// }).end();